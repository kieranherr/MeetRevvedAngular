using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MeetRevvedUp_WebAPI.Models
{
    public class Friend
    {
        [Key]
        public int FriendId { get; set; }
        public int FriendOneId { get; set; }
        public int FriendTwoId { get; set; }
    }
}
