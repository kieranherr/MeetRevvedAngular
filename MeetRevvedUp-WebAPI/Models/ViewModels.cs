using Microsoft.AspNetCore.Identity;

namespace MeetRevvedUp_WebAPI.Models
{
    public class CarMeetListRecord
    {
        public int MeetId { get; set; }
        public string MeetName { get; set; }
        public string MeetDate { get; set; }
        public string MeetTime { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public long Zip { get; set; }
        public double Lat { get; set; }
        public double Long { get; set; }
        public double UserLat { get; set; }
        public double UserLong { get; set; }
    }

    public class CarMeetDetails
    {
        public int MeetId { get; set; }
        public string MeetName { get; set; }
        public string MeetDate { get; set; }
        public string MeetTime { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public long Zip { get; set; }
        public double Lat { get; set; }
        public double Long { get; set; }
        public string CreatedBy { get; set; }
        public bool IsOwner { get; set; }
        public bool IsRSVP { get; set; }
        public int CurrentUserId { get; set; }
    }

    public class RSVPClient
    {
        public int ClientId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public long PhoneNumber { get; set; }
        public int Age { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string IdentityUserId { get; set; }
        public IdentityUser IdentityUser { get; set; }
        public int MeetId { get; set; }
        public bool HasCar { get; set; }
    }

    public class ClientCarListRecord
    {
        public int CarId { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public int Year { get; set; }
        public int AvgRating { get; set; }
        public int GarageId { get; set; }
    }

    public class CarMeetCar
    {
        public int CarId { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public int Year { get; set; }
        public int Mileage { get; set; }
        public string Mods { get; set; }
        public int AvgRating { get; set; }
        public int MeetId { get; set; }
    }
}
