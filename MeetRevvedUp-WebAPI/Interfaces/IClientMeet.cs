using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MeetRevvedUp_WebAPI.Interfaces
{
    public interface IClientMeet
    {
        int ClientMeetId { get; set; }
        int MeetId { get; set; }
        ICarMeet CarMeet { get; set; }
        int ClientId { get; set; }
        IClient Client { get; set; }
    }
}
