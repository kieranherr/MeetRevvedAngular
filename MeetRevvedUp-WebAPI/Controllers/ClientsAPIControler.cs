using Microsoft.AspNetCore.Mvc;
using MeetRevvedUp_WebAPI.Interfaces;
using MeetRevvedUp_WebAPI.Models;
using System.Security.Claims;

namespace MeetRevvedUp_WebAPI.Controllers
{
    [Route("api/clients")]
    [ApiController]
    public class ClientsAPIControler : Controller
    {
        private readonly IClientService _clientService;

        public ClientsAPIControler(IClientService clientService)
        {
            _clientService = clientService;
        }

        // GET: Clients/api/ClientsAPI
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return _clientService.GetDefaultValues();
        }

        // GET Clients/api/ClientsAPI/{id}
        [HttpGet("{id}")]
        public async Task<Client?> GetByIdentity(string id)
        {
            return await _clientService.GetByIdentityAsync(id);
        }

        // GET Clients/api/ClientsAPI/getcarmeets
        [HttpGet("getcarmeets")]
        public async Task<IEnumerable<CarMeetListRecord>> GetCarMeets()
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier) ?? string.Empty;
            return await _clientService.GetCarMeetsAsync(userId);
        }

        // POST Clients/api/ClientsAPI/create
        [HttpPost("create")]
        public async Task<IActionResult> Post([FromBody] Client user)
        {
            await _clientService.CreateClientAsync(user);
            return Ok();
        }

        // PUT Clients/api/ClientsAPI/{id}
        [HttpPut("update")]
        public async Task<IActionResult> Put([FromBody] Client user)
        {
            await _clientService.UpdateClientAsync(user);
            return Ok();
        }

        // DELETE Clients/api/ClientsAPI/{id}
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
