using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MeetRevvedUp_WebAPI.Interfaces
{
    public interface ICar
    {
        int CarId { get; set; }
        string Vin { get; set; }
        string Make { get; set; }
        string Model { get; set; }
        int Year { get; set; }
        int Mileage { get; set; }
        string Mods { get; set; }
        string ImageLocation { get; set; }
        int AvgRating { get; set; } 
        string IdentityUserId { get; set; }
        IdentityUser IdentityUser { get; set; }
    }
}
