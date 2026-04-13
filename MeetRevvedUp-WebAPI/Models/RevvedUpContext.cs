using MeetRevvedUp_WebAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;
using System.Runtime.ConstrainedExecution;

namespace MeetRevvedUp_WebAPI.Models
{
    public class RevvedUpContext : IdentityDbContext<IdentityUser>
    {
        public RevvedUpContext(DbContextOptions<RevvedUpContext> options) : base(options)
        {
        }

        public DbSet<Car> Cars { get; set; } = null!;
        public DbSet<Client> Clients { get; set; } = null!;
        public DbSet<Garage> Garages { get; set; } = null!;
        public DbSet<CarMeet> CarMeets { get; set; } = null!;
        public DbSet<ClientMeet> ClientMeets { get; set; } = null!;
        public DbSet<Friend> Friends { get; set; } = null!;
        public DbSet<Comment> Comments { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var relationship in modelBuilder.Model.GetEntityTypes()
                .SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }
        }
    }
}
