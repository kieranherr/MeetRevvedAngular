using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MeetRevvedUp_WebAPI.Interfaces
{
    public interface IClient 
    {
        int ClientId { get; set; }
        string FirstName { get; set; }
        string LastName { get; set; }
        long PhoneNumber { get; set; }
        int Age { get; set; }
        string City { get; set; }
        string State {  get; set; }
        
        string IdentityUserId { get; set; }
        IdentityUser IdentityUser { get; set; }
    }
}
