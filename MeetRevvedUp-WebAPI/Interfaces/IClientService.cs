using MeetRevvedUp_WebAPI.Models;

namespace MeetRevvedUp_WebAPI.Interfaces
{
    public interface IClientService
    {
        IEnumerable<string> GetDefaultValues();
        Task<Client?> GetByIdentityAsync(string identityUserId);
        Task<Client?> GetByIdAsync(int clientId);
        Task<IEnumerable<CarMeetListRecord>> GetCarMeetsAsync(string identityUserId);
        Task<IEnumerable<Client>> GetFriendsAsync(string identityUserId);
        Task CreateClientAsync(Client client);
        Task UpdateClientAsync(Client client);
        Task DeleteClientAsync(int clientId);
        Task AddFriendAsync(Friend friend, string identityUserId);
        string GetUserNameById(string userName);
        bool ClientExists(int clientId);
    }
}
