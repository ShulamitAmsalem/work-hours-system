using WorkHoursAPI.Models;

namespace WorkHoursAPI.Repositories
{
    public interface IReportRepository
    {
        Task<IEnumerable<Report>> GetAllAsync();
        Task<Report?> GetByIdAsync(int id);
        Task AddAsync(Report report);
        Task UpdateAsync(Report report);
        Task DeleteAsync(int id);
        Task<IEnumerable<Report>> GetByEmployeeIdAsync(int employeeId);
        Task<IEnumerable<Report>> GetByCourseIdAsync(int courseId);
        Task<IEnumerable<Report>> GetByMonthYearAsync(int month, int year);
    }
}
