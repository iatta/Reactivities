using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions opt) : base(opt){
        }
        public DbSet<Value> Values { get; set; }

        protected override void OnModelCreating(ModelBuilder builder){
            builder.Entity<Value>().HasData(
                new Value{Id = 1 , Name = "v1"},
                new Value{Id = 2 , Name = "v2"},
                new Value{Id = 3 , Name = "v3"},
                new Value{Id = 4 , Name = "v4"},
                new Value{Id = 5 , Name = "v5"}

            );
        }
    }
}
