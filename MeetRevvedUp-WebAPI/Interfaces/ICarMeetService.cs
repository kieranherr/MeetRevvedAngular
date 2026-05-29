using MeetRevvedUp_WebAPI.Models;

namespace MeetRevvedUp_WebAPI.Interfaces
{
    public interface ICarMeetService
    {
        Task<IEnumerable<CarMeetListRecord>> GetCarMeetsForUserAsync(string identityUserId);
        Task<CarMeetDetails?> GetCarMeetDetailsAsync(int meetId, string identityUserId);
        Task<CarMeet?> GetCarMeetAsync(int meetId);
        Task<List<RSVPClient>> GetRSVPClientsAsync(int meetId);
        Task<List<Comment>> GetCommentsAsync(int meetId);
        Task CreateCarMeetAsync(CarMeet carMeet);
        Task UpdateCarMeetAsync(int meetId, CarMeet carMeet);
        Task DeleteCarMeetAsync(int meetId);
        Task SetRSVPAsync(int meetId, string identityUserId);
        Task DeleteRSVPAsync(int meetId, string identityUserId);
        Task AddCommentAsync(Comment comment, string identityUserId);
        void SendSOSMessages(int meetId);
        bool CarMeetExists(int meetId);
    }
}
