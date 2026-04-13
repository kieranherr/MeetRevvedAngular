using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MeetRevvedUp_WebAPI.Interfaces
{
    public interface IGarage
    {
        int GarageId { get; set; }
        int ClientId { get; set; }
        IClient Client { get; set; }
        int CarId { get; set; }
        ICar Car { get; set; }
        string IdentityUserId { get; set; }
        IdentityUser IdentityUser { get; set; }

    }
}
