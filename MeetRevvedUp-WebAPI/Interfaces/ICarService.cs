using MeetRevvedUp_WebAPI.Models;

namespace MeetRevvedUp_WebAPI.Interfaces
{
    public interface ICarService
    {
        Task<IEnumerable<ClientCarListRecord>> GetUserCarsAsync(string userId);
        Task<List<CarMeetCar>> GetTopThreeCarsAsync(int meetId);
        Task<Car?> GetCarByClientIdAsync(int clientId);
        Task<Car?> GetCarByIdAsync(int carId);
        Task<Car?> RateCarAsync(int carId, int newRate, string twilioAccountSid, string twilioAuthToken, string twilioPhoneNumber);
        Task<Car> CreateCarAsync(Car car);
        Task<Car?> UpdateCarAsync(int carId, Car car);
        Task<bool> DeleteCarAsync(int carId);
        bool CarExists(int id);
    }
}
