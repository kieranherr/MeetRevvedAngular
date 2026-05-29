using MeetRevvedUp_WebAPI.Models;

namespace MeetRevvedUp_WebAPI.Interfaces
{
    public interface IGaragesService
    {
        Task<Garage?> GetGarageByUserIdAsync(string userId);
        Task<Garage?> GetGarageByIdAsync(int id);
        Task<Garage?> CreateGarageAsync(int clientId);
        Task<Garage?> UpdateGarageAsync(int id, Garage garage);
        Task<bool> DeleteGarageAsync(int id);
        bool GarageExists(int id);
    }
}
