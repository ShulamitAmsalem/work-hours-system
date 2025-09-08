using Microsoft.EntityFrameworkCore;
using WorkHoursAPI.Models; // כאן יהיו המודלים שלך

namespace WorkHoursAPI.Data
{
    public class WorkHoursContext : DbContext
    {
        public WorkHoursContext(DbContextOptions<WorkHoursContext> options) : base(options)
        {
        }

        // טבלאות
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Report> Reports { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // אפשר להוסיף הגדרות מיוחדות כאן (Relationships, Keys וכו')
        }
    }
}

