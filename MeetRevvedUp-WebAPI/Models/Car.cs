using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using MeetRevvedUp_WebAPI.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.EntityFrameworkCore;

namespace MeetRevvedUp_WebAPI.Models
{
    public class Car
    {
        [Key]
        public int CarId { get; set; }
        public string Vin { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public int Year { get; set; }
        public int Mileage { get; set; }
        public string Mods { get; set; }
        [Display(Name ="Image Location")]
        public string ImageLocation { get; set; }
        [Display(Name = "Rating")]
        public int AvgRating { get; set; } 
        [ForeignKey("IdentityUser")]
        public string IdentityUserId { get; set; }
        public IdentityUser? IdentityUser { get; set; }
    }


//public static class CarEndpoints
//{
//	public static void MapCarEndpoints (this IEndpointRouteBuilder routes)
//    {
//        var group = routes.MapGroup("/api/Car").WithTags(nameof(Car));

//        group.MapGet("/", async (RevvedUpContext db) =>
//        {
//            return await db.Cars.ToListAsync();
//        })
//        .WithName("GetAllCars");

//        group.MapGet("/{carid}", async Task<Results<Ok<Car>, NotFound>> (int carid, RevvedUpContext db) =>
//        {
//            return await db.Cars.AsNoTracking()
//                .FirstOrDefaultAsync(model => model.CarId == carid)
//                is Car model
//                    ? TypedResults.Ok(model)
//                    : TypedResults.NotFound();
//        })
//        .WithName("GetCarById");

//        group.MapPut("/{carid}", async Task<Results<Ok, NotFound>> (int carid, Car car, RevvedUpContext db) =>
//        {
//            var affected = await db.Cars
//                .Where(model => model.CarId == carid)
//                .ExecuteUpdateAsync(setters => setters
//                  .SetProperty(m => m.CarId, car.CarId)
//                  .SetProperty(m => m.Vin, car.Vin)
//                  .SetProperty(m => m.Make, car.Make)
//                  .SetProperty(m => m.Model, car.Model)
//                  .SetProperty(m => m.Year, car.Year)
//                  .SetProperty(m => m.Mileage, car.Mileage)
//                  .SetProperty(m => m.Mods, car.Mods)
//                  .SetProperty(m => m.ImageLocation, car.ImageLocation)
//                  .SetProperty(m => m.AvgRating, car.AvgRating)
//                  .SetProperty(m => m.IdentityUserId, car.IdentityUserId)
//                  );
//            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
//        })
//        .WithName("UpdateCar");

//        group.MapPost("/", async (Car car, RevvedUpContext db) =>
//        {
//            db.Cars.Add(car);
//            await db.SaveChangesAsync();
//            return TypedResults.Created($"/api/Car/{car.CarId}",car);
//        })
//        .WithName("CreateCar");

//        group.MapDelete("/{carid}", async Task<Results<Ok, NotFound>> (int carid, RevvedUpContext db) =>
//        {
//            var affected = await db.Cars
//                .Where(model => model.CarId == carid)
//                .ExecuteDeleteAsync();
//            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
//        })
//        .WithName("DeleteCar");
//    }
//}
}
