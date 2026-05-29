using Microsoft.AspNetCore.Mvc;
using MeetRevvedUp_WebAPI.Interfaces;
using MeetRevvedUp_WebAPI.Models;
using System.Security.Claims;

namespace MeetRevvedUp_WebAPI.Controllers
{
    [Route("api/garages")]
    [ApiController]
    public class GaragesController : ControllerBase
    {
        private readonly IGaragesService _garagesService;

        public GaragesController(IGaragesService garagesService)
        {
            _garagesService = garagesService;
        }

        // GET: api/Garages/user/{userId}
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<Garage>> GetGarageByUserId(string userId)
        {
            var garage = await _garagesService.GetGarageByUserIdAsync(userId);
            if (garage == null) return NotFound();
            return Ok(garage);
        }

        // GET: api/Garages/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Garage>> GetGarage(int id)
        {
            var garage = await _garagesService.GetGarageByIdAsync(id);
            if (garage == null) return NotFound();
            return Ok(garage);
        }

        // POST: api/Garages/{clientId}
        [HttpPost("{clientId}")]
        public async Task<ActionResult<Garage>> CreateGarage(int clientId)
        {
            var garage = await _garagesService.CreateGarageAsync(clientId);
            if (garage == null) return BadRequest();
            return Ok(garage);
        }

        // PUT: api/Garages/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<Garage>> UpdateGarage(int id, Garage garage)
        {
            var updated = await _garagesService.UpdateGarageAsync(id, garage);
            if (updated == null) return BadRequest();
            return Ok(updated);
        }

        // DELETE: api/Garages/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGarage(int id)
        {
            var deleted = await _garagesService.DeleteGarageAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}
