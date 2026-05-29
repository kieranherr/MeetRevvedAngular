using Microsoft.EntityFrameworkCore;
using MeetRevvedUp_WebAPI.Interfaces;
using MeetRevvedUp_WebAPI.Models;
using System.Text.Json;

namespace MeetRevvedUp_WebAPI.Services
{
    public class ClientService : IClientService
    {
        private readonly RevvedUpContext _context;
        private readonly HttpClient _httpClient;

        public ClientService(RevvedUpContext context, IHttpClientFactory httpClientFactory)
        {
            _context = context;
            _httpClient = httpClientFactory.CreateClient();
        }

        public IEnumerable<string> GetDefaultValues()
        {
            return new string[] { "value1", "value2" };
        }

        public async Task<Client?> GetByIdentityAsync(string identityUserId)
        {
            return await _context.Clients
                .Where(x => x.IdentityUserId == identityUserId)
                .FirstOrDefaultAsync();
        }

        public async Task<Client?> GetByIdAsync(int clientId)
        {
            return await _context.Clients.FindAsync(clientId);
        }

        public async Task<IEnumerable<CarMeetListRecord>> GetCarMeetsAsync(string identityUserId)
        {
            var client = await _context.Clients
                .Where(c => c.IdentityUserId == identityUserId)
                .FirstOrDefaultAsync();

            if (client == null)
            {
                return Enumerable.Empty<CarMeetListRecord>();
            }

            var address = client.City + "%20" + client.State;
            using HttpResponseMessage response = await _httpClient.GetAsync(
                $"https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={ApiKeys.GoogleApiKey}");
            response.EnsureSuccessStatusCode();

            string responseBody = await response.Content.ReadAsStringAsync();
            var geocode = JsonSerializer.Deserialize<IGeocodeJson>(responseBody,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true })?.Results;

            var result = await _context.CarMeets
                .Where(x => x.State == client.State)
                .Select(x => new CarMeetListRecord
                {
                    MeetDate = x.MeetDate,
                    MeetId = x.MeetId,
                    MeetName = x.MeetName,
                    MeetTime = x.MeetTime,
                    Lat = x.Lat,
                    Long = x.Long,
                    City = x.City,
                    Zip = x.Zip,
                    State = x.State,
                    Street = x.Street,
                    UserLat = geocode![0].geometry.location.lat,
                    UserLong = geocode![0].geometry.location.lng,
                })
                .ToListAsync();

            return result;
        }

        public async Task<IEnumerable<Client>> GetFriendsAsync(string identityUserId)
        {
            var client = await _context.Clients.Where(c => c.IdentityUserId == identityUserId).FirstOrDefaultAsync();
            if (client == null) return Enumerable.Empty<Client>();

            var friends = _context.Friends.Where(f => f.FriendOneId == client.ClientId);
            var clients = new List<Client>();
            foreach (var item in friends)
            {
                var tempClient = _context.Clients.Where(c => c.ClientId == item.FriendTwoId).FirstOrDefault();
                if (tempClient != null) clients.Add(tempClient);
            }
            return clients;
        }

        public async Task CreateClientAsync(Client client)
        {
            _context.Clients.Add(client);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateClientAsync(Client client)
        {
            _context.Clients.Update(client);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteClientAsync(int clientId)
        {
            var client = await _context.Clients.FindAsync(clientId);
            if (client != null)
            {
                _context.Clients.Remove(client);
                await _context.SaveChangesAsync();
            }
        }

        public async Task AddFriendAsync(Friend friend, string identityUserId)
        {
            var client = _context.Clients.Where(c => c.IdentityUserId == identityUserId).FirstOrDefault();
            if (client == null) return;
            friend.FriendOneId = client.ClientId;
            _context.Friends.Add(friend);
            await _context.SaveChangesAsync();
        }

        public string GetUserNameById(string userName)
        {
            var identityUser = _context.Users.Where(x => x.UserName == userName).FirstOrDefault();
            var client = _context.Clients.Where(x => x.IdentityUserId == identityUser!.Id).FirstOrDefault();
            return client!.FirstName + " " + client.LastName;
        }

        public bool ClientExists(int clientId)
        {
            return _context.Clients.Any(e => e.ClientId == clientId);
        }
    }
}
