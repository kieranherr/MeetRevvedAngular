using Microsoft.AspNetCore.Mvc;
using MeetRevvedUp_WebAPI.Interfaces;
using MeetRevvedUp_WebAPI.Models;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

namespace MeetRevvedUp_WebAPI.Controllers
{
    //[Authorize(Roles = "CarGuy")]
    [Route("api/carmeets")]
    [ApiController]
    public class CarMeetsController : ControllerBase
    {
        private readonly ICarMeetService _carMeetService;

        public CarMeetsController(ICarMeetService carMeetService)
        {
            _carMeetService = carMeetService;
        }

        // GET: api/carmeets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> Index()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var result = await _carMeetService.GetCarMeetsForUserAsync(userId);
            return Ok(result);
        }

        // POST: api/carmeets/{id}/sos
        [HttpPost("{id}/sos")]
        public IActionResult SOS(int id)
        {
            _carMeetService.SendSOSMessages(id);
            return NoContent();
        }

        // GET: api/carmeets/{id}/rsvps
        [HttpGet("{id}/rsvps")]
        public async Task<IActionResult> RSVPIndex(int id)
        {
            var clients = await _carMeetService.GetRSVPClientsAsync(id);
            return Ok(clients);
        }

        // GET: api/carmeets/{id}/comments
        [HttpGet("{id}/comments")]
        public async Task<IActionResult> CommentIndex(int id)
        {
            var comments = await _carMeetService.GetCommentsAsync(id);
            return Ok(comments);
        }

        // POST: api/carmeets/{id}/comments
        [HttpPost("{id}/comments")]
        public async Task<IActionResult> CommentCreate(int id, [FromBody] Comment comment)
        {
            comment.MeetId = id;
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            await _carMeetService.AddCommentAsync(comment, userId);
            return NoContent();
        }

        // GET: api/carmeets/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> Details(int id)
        {
            var identityId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var carMeet = await _carMeetService.GetCarMeetDetailsAsync(id, identityId);

            if (carMeet == null)
            {
                return NotFound();
            }
            return Ok(carMeet);
        }

        // POST: api/carmeets
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CarMeet carMeet)
        {
            await _carMeetService.CreateCarMeetAsync(carMeet);
            return Ok(carMeet);
        }

        // PUT: api/carmeets/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody] CarMeet carMeet)
        {
            try
            {
                await _carMeetService.UpdateCarMeetAsync(id, carMeet);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_carMeetService.CarMeetExists(carMeet.MeetId))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        // DELETE: api/carmeets/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (!_carMeetService.CarMeetExists(id))
            {
                return NotFound();
            }

            await _carMeetService.DeleteCarMeetAsync(id);
            return NoContent();
        }

        // POST: api/carmeets/{id}/rsvp
        [HttpPost("{id}/rsvp")]
        public async Task<IActionResult> SetRSVP(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            await _carMeetService.SetRSVPAsync(id, userId);
            return NoContent();
        }

        // DELETE: api/carmeets/{id}/rsvp
        [HttpDelete("{id}/rsvp")]
        public async Task<IActionResult> DeleteRSVP(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            await _carMeetService.DeleteRSVPAsync(id, userId);
            return NoContent();
        }
    }
}
