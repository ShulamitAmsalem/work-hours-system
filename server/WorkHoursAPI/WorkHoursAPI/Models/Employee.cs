using System.ComponentModel.DataAnnotations;

namespace WorkHoursAPI.Models
{
    public class Employee
    {
        [Key]
        public int EmployeeId { get; set; } // קוד עובד

        [Required]
        public string Tz { get; set; } // ת.ז

        [Required]
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; } // מאוחסן בהצפנה

        public string Phone { get; set; }

        public bool IsAdmin { get; set; } // הרשאת ניהול
    }
}
}
