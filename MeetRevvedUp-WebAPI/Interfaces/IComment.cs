using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MeetRevvedUp_WebAPI.Interfaces
{
    public interface IComment
    {
        int CommentId { get; set; }
        string CommentorsName { get; set; }
        string CommentBody { get; set; }
        string Date { get; set; }
        int MeetId { get; set; }
        ICarMeet CarMeet { get; set; }
    }
}
