using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MeetRevvedUp_WebAPI.Interfaces
{
    public interface IFriend
    {
        int FriendId { get; set; }
        int FriendOneId { get; set; }
        int FriendTwoId { get; set; }
    }
}
