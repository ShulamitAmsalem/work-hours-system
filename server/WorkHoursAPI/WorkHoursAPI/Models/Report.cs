using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WorkHoursAPI.Models
{
    public class Report
    {
        [Key]
        public int ReportId { get; set; }

        [ForeignKey("Employee")]
        public int EmployeeId { get; set; }

        public Employee Employee { get; set; }

        [ForeignKey("Course")]
        public int CourseId { get; set; }

        public Course Course { get; set; }

        [Required]
        public int Month { get; set; }

        [Required]
        public int Year { get; set; }

        [Required]
        public int WorkHours { get; set; }

        [Required]
        public decimal HourlyRate { get; set; }

        [Required]
        public int TravelHours { get; set; }

        [Required]
        public decimal TravelRate { get; set; }

        [NotMapped]
        public decimal Total => (WorkHours * HourlyRate) + (TravelHours * TravelRate);
    }
}
