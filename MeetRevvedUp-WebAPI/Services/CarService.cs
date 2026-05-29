using MeetRevvedUp_WebAPI.Interfaces;
using MeetRevvedUp_WebAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Immutable;
using Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace MeetRevvedUp_WebAPI.Services
{
    public class CarService : ICarService
    {
        private readonly RevvedUpContext _context;
        private readonly IGaragesService _garagesService;

        public CarService(RevvedUpContext context, IGaragesService garagesService)
        {
            _context = context;
            _garagesService = garagesService;
        }

        public async Task<IEnumerable<ClientCarListRecord>> GetUserCarsAsync(string userId)
        {
            var cars = await _context.Cars.Where(c => c.IdentityUserId == userId).ToListAsync();
            
            if (cars == null || !cars.Any())
            {
                return new List<ClientCarListRecord>();
            }

            var garageId = await _context.Garages
                .Where(x => x.IdentityUserId == userId)
                .Select(x => x.GarageId)
                .FirstOrDefaultAsync();

            var results = cars.Select(x => new ClientCarListRecord
            {
                CarId = x.CarId,
                Make = x.Make,
                Model = x.Model,
                Year = x.Year,
                AvgRating = x.AvgRating,
                GarageId = garageId,
            }).ToList();

            return results;
        }

        public async Task<List<CarMeetCar>> GetTopThreeCarsAsync(int meetId)
        {
            var clientMeets = _context.ClientMeets.Where(c => c.MeetId == meetId).ToList();
            List<CarMeetCar> cars = new List<CarMeetCar>();

            foreach (var item in clientMeets)
            {
                var garage = await _context.Garages.FindAsync(item.ClientId);
                if (garage != null)
                {
                    var car = await _context.Cars.Where(x => x.CarId == garage.CarId).Select(x => new CarMeetCar
                    {
                        Make = x.Make,
                        Model = x.Model,
                        Year = x.Year,
                        CarId = x.CarId,
                        Mileage = x.Mileage,
                        AvgRating = x.AvgRating,
                        Mods = x.Mods,
                        MeetId = meetId,
                    }).FirstOrDefaultAsync();
                    
                    if (car != null)
                    {
                        cars.Add(car);
                    }
                }
            }

            //List<CarMeetCar> topThree = new List<CarMeetCar>();
            //var carOne = new CarMeetCar();
            //var carTwo = new CarMeetCar();
            //var carThree = new CarMeetCar();
            //carOne.AvgRating = 0;
            //carTwo.AvgRating = 0;
            //carThree.AvgRating = 0;

            //foreach (var item in cars)
            //{
            //    if (item.AvgRating < carOne.AvgRating && item.AvgRating != carOne.AvgRating)
            //    {
            //        if (item.AvgRating < carTwo.AvgRating && item.AvgRating != carTwo.AvgRating)
            //        {
            //            if (item.AvgRating < carThree.AvgRating && item.AvgRating != carThree.AvgRating)
            //            {
            //                continue;
            //            }
            //            else
            //            {
            //                carThree = item;
            //            }
            //        }
            //        else
            //        {
            //            carThree = carTwo;
            //            carTwo = item;
            //        }
            //    }
            //    else
            //    {
            //        carThree = carTwo;
            //        carTwo = carOne;
            //        carOne = item;
            //    }
            //}

            //if (carOne.CarId != 0) { topThree.Add(carOne); }
            //if (carTwo.CarId != 0) { topThree.Add(carTwo); }
            //if (carThree.CarId != 0) { topThree.Add(carThree); }

            //if (carOne.CarId == 0 && carOne.MeetId == 0) { carOne.MeetId = meetId; topThree.Add(carOne); }

            var topThree = cars.OrderByDescending(x => x.AvgRating).Take(3).ToList();

            return topThree;
        }

        public async Task<Car?> GetCarByClientIdAsync(int clientId)
        {
            var garage = _context.Garages.Where(g => g.ClientId == clientId).FirstOrDefault();
            
            if (garage == null)
            {
                return null;
            }

            var car = await _context.Cars.FirstOrDefaultAsync(m => m.CarId == garage.CarId);
            return car;
        }

        public async Task<Car?> GetCarByIdAsync(int carId)
        {
            return await _context.Cars.FirstOrDefaultAsync(m => m.CarId == carId);
        }

        public async Task<Car?> RateCarAsync(int carId, int newRate, string twilioAccountSid, string twilioAuthToken, string twilioPhoneNumber)
        {
            var car = await _context.Cars.FindAsync(carId);
            
            if (car == null)
            {
                return null;
            }

            var user = await _context.Clients.Where(x => x.IdentityUserId == car.IdentityUserId).FirstOrDefaultAsync();
            var meetId = await _context.ClientMeets.Where(y => y.ClientId == user.ClientId).FirstOrDefaultAsync();
            var meet = await _context.CarMeets.Where(x => x.MeetId == meetId.MeetId).FirstOrDefaultAsync();

            car.AvgRating = Convert.ToInt32((newRate + car.AvgRating) / 2);
            _context.Update(car);
            await _context.SaveChangesAsync();

            TwilioClient.Init(twilioAccountSid, twilioAuthToken);
            var garage = _context.Garages.Where(c => c.CarId == carId).FirstOrDefault();
            var client = _context.Clients.Where(c => c.ClientId == garage.ClientId).FirstOrDefault();

            var message = MessageResource.Create(
                body: $"Hi {user.FirstName}! " +
                $"Your {car.Year} {car.Make} {car.Model} was just rated at {meet.MeetName} in {meet.City}! Check it out!",
                from: new Twilio.Types.PhoneNumber(twilioPhoneNumber),
                to: new Twilio.Types.PhoneNumber("+1" + client.PhoneNumber.ToString())
            );

            return car;
        }

        public async Task<Car> CreateCarAsync(Car car)
        {
            await _context.AddAsync(car);
            await _context.SaveChangesAsync();
            return car;
        }

        public async Task<Car?> UpdateCarAsync(int carId, Car car)
        {
            var existingCar = await _context.Cars.FindAsync(carId);
            
            if (existingCar == null)
            {
                return null;
            }

            existingCar.Vin = car.Vin;
            existingCar.Make = car.Make;
            existingCar.Model = car.Model;
            existingCar.Year = car.Year;
            existingCar.Mileage = car.Mileage;
            existingCar.Mods = car.Mods;
            existingCar.ImageLocation = car.ImageLocation;
            existingCar.AvgRating = car.AvgRating;
            existingCar.IdentityUserId = car.IdentityUserId;

            _context.Update(existingCar);
            await _context.SaveChangesAsync();

            return existingCar;
        }

        public async Task<bool> DeleteCarAsync(int carId)
        {
            var car = await _context.Cars.FindAsync(carId);
            
            if (car == null)
            {
                return false;
            }

            _context.Cars.Remove(car);
            await _context.SaveChangesAsync();
            return true;
        }

        public bool CarExists(int id)
        {
            return _context.Cars.Any(e => e.CarId == id);
        }
    }
}
