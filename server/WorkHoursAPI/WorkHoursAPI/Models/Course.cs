using System.ComponentModel.DataAnnotations;

namespace WorkHoursAPI.Models
{
    public class Course
    {
        [Key]
        public int CourseId { get; set; } // קוד קורס

        [Required]
        public string Name { get; set; } // שם קורס

        [Required]
        public string Type { get; set; } // שנתי / חצי שנתי
    }
}
