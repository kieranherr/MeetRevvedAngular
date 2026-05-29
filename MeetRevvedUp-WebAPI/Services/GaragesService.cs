using MeetRevvedUp_WebAPI.Interfaces;
using MeetRevvedUp_WebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace MeetRevvedUp_WebAPI.Services
{
    public class GaragesService : IGaragesService
    {
        private readonly RevvedUpContext _context;

        public GaragesService(RevvedUpContext context)
        {
            _context = context;
        }

        public async Task<Garage?> GetGarageByUserIdAsync(string userId)
        {
            var client = await _context.Clients.Where(c => c.IdentityUserId == userId).FirstOrDefaultAsync();
            if (client == null) return null;
            var result = await _context.Garages.Include(x => x.Car).Where(g => g.ClientId == client.ClientId).FirstOrDefaultAsync();
            return result;
        }

        public async Task<Garage?> GetGarageByIdAsync(int id)
        {
            return await _context.Garages.FindAsync(id);
        }

        public async Task<Garage?> CreateGarageAsync(int clientId)
        {
            var client = _context.Clients.Where(c => c.ClientId == clientId).FirstOrDefault();
            if (client == null) return null;

            var car = _context.Cars.Where(c => c.IdentityUserId == client.IdentityUserId).FirstOrDefault();
            if (car == null) return null;

            var garage = new Garage
            {
                ClientId = client.ClientId,
                IdentityUserId = client.IdentityUserId,
                CarId = car.CarId
            };

            _context.Add(garage);
            await _context.SaveChangesAsync();
            return garage;
        }

        public async Task<Garage?> UpdateGarageAsync(int id, Garage garage)
        {
            if (id != garage.GarageId) return null;

            _context.Update(garage);
            await _context.SaveChangesAsync();
            return garage;
        }

        public async Task<bool> DeleteGarageAsync(int id)
        {
            var garage = await _context.Garages.FindAsync(id);
            if (garage == null) return false;

            _context.Garages.Remove(garage);
            await _context.SaveChangesAsync();
            return true;
        }

        public bool GarageExists(int id)
        {
            return _context.Garages.Any(e => e.GarageId == id);
        }
    }
}
