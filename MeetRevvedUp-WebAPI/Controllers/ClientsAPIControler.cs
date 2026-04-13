using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MeetRevvedUp_WebAPI.Models;
using System.Net.Http;
using System.Security.Claims;
using System.Text.Json;

namespace MeetRevvedUp_WebAPI.Controllers
{
    [Route("Clients/api/[controller]")]
    [ApiController]
    public class ClientsAPIControler : Controller
    {


        private readonly RevvedUpContext _context;

        public ClientsAPIControler(RevvedUpContext context)
        {
            _context = context;
        }
        // GET: api/<ValuesController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<Client> GetByIdentity(string id)
        {
            var test = await _context.Clients.Where(x => x.IdentityUserId == id).FirstOrDefaultAsync();
            return test;
        }
        [HttpGet("getcarmeets")]
        public async Task<IEnumerable<CarMeetListRecord>> GetCarMeets()
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var client = _context.Clients.Where(c => c.IdentityUserId == userId).FirstOrDefault();

            var address = client.City.ToString() + "%20" + client.State.ToString();
            var httpClient = new HttpClient();

            using HttpResponseMessage response = await httpClient.GetAsync("https://maps.googleapis.com/maps/api/geocode/json?address=" + address + $"&key={ApiKeys.GoogleApiKey}");
            response.EnsureSuccessStatusCode();
            string responseBody = await response.Content.ReadAsStringAsync();
            var geocode = JsonSerializer.Deserialize<IGeocodeJson>(responseBody, new JsonSerializerOptions { PropertyNameCaseInsensitive = true })?.Results;

            var carMeets = _context.CarMeets;
            var applicationDbContext = _context.CarMeets.Where(x => x.State == client.State).Select(x => new CarMeetListRecord
            {
                MeetDate = x.MeetDate,
                MeetId = x.MeetId,
                MeetName = x.MeetName,
                MeetTime = x.MeetTime,
                Lat = x.Lat,
                Long = x.Long,
                City = x.City,
                Zip = x.Zip,
                State = x.State,
                Street = x.Street,
                UserLat = geocode[0].geometry.location.lat,
                UserLong = geocode[0].geometry.location.lng,
            });
            var result = await applicationDbContext.ToListAsync();

            return result;
        }

        // POST api/<ValuesController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
