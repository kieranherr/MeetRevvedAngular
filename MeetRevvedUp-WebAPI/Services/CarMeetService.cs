using MeetRevvedUp_WebAPI.Interfaces;
using MeetRevvedUp_WebAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.Text.Json.Nodes;
using Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace MeetRevvedUp_WebAPI.Services
{
    public class CarMeetService : ICarMeetService
    {
        private readonly RevvedUpContext _context;
        private readonly HttpClient _httpClient;

        public CarMeetService(RevvedUpContext context, IHttpClientFactory httpClientFactory)
        {
            _context = context;
            _httpClient = httpClientFactory.CreateClient();
        }

        public async Task<IEnumerable<CarMeetListRecord>> GetCarMeetsForUserAsync(string identityUserId)
        {
            var client = await _context.Clients
                .Where(c => c.IdentityUserId == identityUserId)
                .FirstOrDefaultAsync();

            if (client == null)
                return Enumerable.Empty<CarMeetListRecord>();

            double userLat = 0, userLng = 0;
            var address = client.City.ToString() + "%20" + client.State.ToString();
            using HttpResponseMessage response = await _httpClient.GetAsync(
                $"https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={ApiKeys.GoogleApiKey}");
            if (response.IsSuccessStatusCode)
            {
                string responseBody = await response.Content.ReadAsStringAsync();
                var geocodeResults = JsonSerializer.Deserialize<IGeocodeJson>(responseBody,
                    new JsonSerializerOptions { PropertyNameCaseInsensitive = true })?.Results;
                if (geocodeResults?.Count > 0)
                {
                    userLat = geocodeResults[0].geometry.location.lat;
                    userLng = geocodeResults[0].geometry.location.lng;
                }
            }

            return await _context.CarMeets
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
                    UserLat = userLat,
                    UserLong = userLng,
                })
                .ToListAsync();
        }

        public async Task<CarMeetDetails?> GetCarMeetDetailsAsync(int meetId, string identityUserId)
        {
            var currentUser = await _context.Clients
                .Where(x => x.IdentityUserId == identityUserId)
                .FirstOrDefaultAsync();

            if (currentUser == null)
                return null;

            var carMeet = await _context.CarMeets
                .Where(x => x.MeetId == meetId)
                .Select(x => new CarMeetDetails
                {
                    MeetDate = x.MeetDate,
                    MeetId = x.MeetId,
                    MeetName = x.MeetName,
                    MeetTime = x.MeetTime,
                    City = x.City,
                    CurrentUserId = currentUser.ClientId,
                    State = x.State,
                    Street = x.Street,
                    Zip = x.Zip,
                    IsRSVP = false,
                    Lat = x.Lat,
                    Long = x.Long,
                    CreatedBy = x.IdentityUserId,
                    IsOwner = false,
                })
                .FirstOrDefaultAsync();

            if (carMeet == null)
                return null;

            if (carMeet.CreatedBy == identityUserId)
                carMeet.IsOwner = true;

            var clientMeet = await _context.ClientMeets
                .Where(x => x.MeetId == carMeet.MeetId && x.ClientId == currentUser.ClientId)
                .FirstOrDefaultAsync();

            if (clientMeet != null)
                carMeet.IsRSVP = true;

            return carMeet;
        }

        public async Task<CarMeet?> GetCarMeetAsync(int meetId)
        {
            return await _context.CarMeets.FindAsync(meetId);
        }

        public async Task<List<RSVPClient>> GetRSVPClientsAsync(int meetId)
        {
            var rsvps = await _context.ClientMeets.Where(c => c.MeetId == meetId).ToListAsync();
            var clients = new List<RSVPClient>();

            foreach (var item in rsvps)
            {
                var client = await _context.Clients
                    .Where(c => c.ClientId == item.ClientId)
                    .Select(x => new RSVPClient
                    {
                        Age = x.Age,
                        City = x.City,
                        ClientId = x.ClientId,
                        IdentityUserId = x.IdentityUserId,
                        FirstName = x.FirstName,
                        LastName = x.LastName,
                        PhoneNumber = x.PhoneNumber,
                        MeetId = item.MeetId,
                    })
                    .FirstOrDefaultAsync();

                if (client == null) continue;

                var car = await _context.Cars
                    .Where(c => c.IdentityUserId == client.IdentityUserId)
                    .FirstOrDefaultAsync();

                client.HasCar = car != null;
                clients.Add(client);
            }

            if (clients.Count == 0)
                clients.Add(new RSVPClient { MeetId = meetId });

            return clients;
        }

        public async Task<List<Comment>> GetCommentsAsync(int meetId)
        {
            var comments = await _context.Comments.Where(c => c.MeetId == meetId).ToListAsync();
            if (comments.Count == 0)
                comments.Add(new Comment { MeetId = meetId });
            return comments;
        }

        public async Task CreateCarMeetAsync(CarMeet carMeet)
        {
            string url = $"https://maps.googleapis.com/maps/api/geocode/json?address={carMeet.Street},+{carMeet.City},+{carMeet.State}&key={ApiKeys.GoogleApiKey}";
            HttpResponseMessage response = await _httpClient.GetAsync(url);
            string jsonResult = await response.Content.ReadAsStringAsync();
            if (response.IsSuccessStatusCode)
            {
                var geoCode = JsonNode.Parse(jsonResult);
                carMeet.Lat = geoCode!["results"]![0]!["geometry"]!["location"]!["lat"]!.GetValue<double>();
                carMeet.Long = geoCode!["results"]![0]!["geometry"]!["location"]!["lng"]!.GetValue<double>();
            }

            
            carMeet.State = carMeet.State.ToUpper();
            _context.Add(carMeet);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateCarMeetAsync(int meetId, CarMeet carMeet)
        {
            string url = $"https://maps.googleapis.com/maps/api/geocode/json?address={carMeet.Street},+{carMeet.City},+{carMeet.State}&key={ApiKeys.GoogleApiKey}";
            HttpResponseMessage response = await _httpClient.GetAsync(url);
            string jsonResult = await response.Content.ReadAsStringAsync();
            if (response.IsSuccessStatusCode)
            {
                var geoCode = JsonNode.Parse(jsonResult);
                carMeet.Lat = geoCode!["results"]![0]!["geometry"]!["location"]!["lat"]!.GetValue<double>();
                carMeet.Long = geoCode!["results"]![0]!["geometry"]!["location"]!["lng"]!.GetValue<double>();
            }

            var existingCarMeet = await _context.CarMeets.Where(c => c.MeetId == meetId).FirstOrDefaultAsync();
            if (existingCarMeet == null) return;

            carMeet.IdentityUserId = existingCarMeet.IdentityUserId;
            carMeet.IdentityUser = existingCarMeet.IdentityUser;
            carMeet.MeetId = existingCarMeet.MeetId;
            _context.Entry(existingCarMeet).CurrentValues.SetValues(carMeet);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCarMeetAsync(int meetId)
        {
            var carMeet = await _context.CarMeets.FindAsync(meetId);
            if (carMeet != null)
            {
                _context.CarMeets.Remove(carMeet);
                await _context.SaveChangesAsync();
            }
        }

        public async Task SetRSVPAsync(int meetId, string identityUserId)
        {
            var client = await _context.Clients.Where(c => c.IdentityUserId == identityUserId).FirstOrDefaultAsync();
            if (client == null) return;

            var existingRSVP = await _context.ClientMeets
                .Where(x => x.ClientId == client.ClientId && x.MeetId == meetId)
                .FirstOrDefaultAsync();

            if (existingRSVP == null)
            {
                _context.ClientMeets.Add(new ClientMeet { ClientId = client.ClientId, MeetId = meetId });
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteRSVPAsync(int meetId, string identityUserId)
        {
            var client = await _context.Clients.Where(c => c.IdentityUserId == identityUserId).FirstOrDefaultAsync();
            if (client == null) return;

            var existingRSVP = await _context.ClientMeets
                .Where(x => x.ClientId == client.ClientId && x.MeetId == meetId)
                .FirstOrDefaultAsync();

            if (existingRSVP != null)
            {
                _context.ClientMeets.Remove(existingRSVP);
                await _context.SaveChangesAsync();
            }
        }

        public async Task AddCommentAsync(Comment comment, string identityUserId)
        {
            var client = await _context.Clients.Where(c => c.IdentityUserId == identityUserId).FirstOrDefaultAsync();
            if (client != null)
                comment.CommentorsName = $"{client.FirstName} {client.LastName}";

            comment.Date = DateTime.Now.ToString("M/d/yyyy");
            _context.Add(comment);
            await _context.SaveChangesAsync();
        }

        public void SendSOSMessages(int meetId)
        {
            var meet = _context.CarMeets.Where(c => c.MeetId == meetId).FirstOrDefault();
            if (meet == null) return;

            TwilioClient.Init(ApiKeys.TwilioAccountSid, ApiKeys.TwilioAuthToken);
            var clientMeet = _context.ClientMeets.Where(c => c.MeetId == meetId);

            foreach (var item in clientMeet)
            {
                var tempClient = _context.Clients.Where(c => c.ClientId == item.ClientId).FirstOrDefault();
                if (tempClient == null) continue;

                MessageResource.Create(
                    body: $"There are police at {meet.MeetName} in {meet.City}, {meet.State.ToUpper()}.",
                    from: new Twilio.Types.PhoneNumber(ApiKeys.TwilioPhoneNumber),
                    to: new Twilio.Types.PhoneNumber($"+1{tempClient.PhoneNumber}")
                );
            }
        }

        public bool CarMeetExists(int meetId)
        {
            return _context.CarMeets.Any(e => e.MeetId == meetId);
        }
    }
}
