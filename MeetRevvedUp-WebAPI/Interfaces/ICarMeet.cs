using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MeetRevvedUp_WebAPI.Interfaces                               
{
    public interface ICarMeet
    {
        int MeetId { get; set; }
        string MeetName { get; set; }
        double Lat { get; set; }
        double Long { get; set; }
        string Street { get; set; }
        string City { get; set; }
        string State { get; set; }
        long Zip { get; set; }
        string MeetTime { get; set; }
        string MeetDate { get; set; }   
        string IdentityUserId { get; set; }
        IdentityUser IdentityUser { get; set; }
    }
}
