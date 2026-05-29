using Microsoft.AspNetCore.Mvc;
using MeetRevvedUp_WebAPI.Interfaces;
using MeetRevvedUp_WebAPI.Models;

namespace MeetRevvedUp_WebAPI.Controllers
{
    [Route("api/cars")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly ICarService _carService;

        public CarsController(ICarService carService)
        {
            _carService = carService;
        }

        // GET: api/cars/user/{userId}
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<ClientCarListRecord>>> GetUserCars(string userId)
        {
            var results = await _carService.GetUserCarsAsync(userId);
            return Ok(results);
        }

        // GET: api/cars/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Car>> GetCar(int id)
        {
            var car = await _carService.GetCarByIdAsync(id);

            if (car == null)
            {
                return NotFound();
            }

            return car;
        }

        // PUT: api/cars/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCar(int id, Car car)
        {
            if (id != car.CarId)
            {
                return BadRequest();
            }

            var updated = await _carService.UpdateCarAsync(id, car);

            if (updated == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        // POST: api/cars/create
        [HttpPost("create")]
        public async Task<IActionResult> Post([FromBody] Car car)
        {
            await _carService.CreateCarAsync(car);
            return Ok();
        }

        // DELETE: api/cars/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCar(int id)
        {
            var deleted = await _carService.DeleteCarAsync(id);

            if (!deleted)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
