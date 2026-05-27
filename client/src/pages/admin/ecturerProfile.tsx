import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function LecturerProfile() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // משיכת הפרטים שנשלחו בכתובת
  const lecturerName = searchParams.get('name') || 'מרצה';

  // נתוני דיווח פיקטיביים ומפורטים של אותה מרצה
  const courseReports = [
    { course: 'מבוא למחשב', hours: 14, budgetCode: 'BUD-991' },
    { course: 'סייבר ואבטחה', hours: 20, budgetCode: 'BUD-442' },
  ];

  const totalHours = courseReports.reduce((sum, item) => sum + item.hours, 0);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate('/admin/employees')} style={styles.backButton}>
          → חזרה לרשימת המרצים
        </button>
        <h3 style={{ margin: 0 }}>פרופיל מרצה מפורט</h3>
      </div>

      <div style={styles.content}>
        {/* כרטיסיית מידע כללי */}
        <div style={styles.card}>
          <h2 style={{ margin: '0 0 10px 0', color: '#1a1a1a' }}>{lecturerName}</h2>
          <p style={{ margin: 0, color: '#6c757d' }}>סטטוס דיווח חודשי: <span style={{ color: '#28a745', fontWeight: 'bold' }}>מאושר</span></p>
          <hr style={{ margin: '20px 0', border: '0', borderTop: '1px solid #eee' }} />
          
          <h4 style={{ margin: '0 0 15px 0' }}>פירוט שעות לפי קורסים:</h4>
          <table style={styles.table}>
            <thead>
              <tr style={styles.thRow}>
                <th style={styles.th}>שם הקורס / מקצוע</th>
                <th style={styles.th}>קוד תקציב</th>
                <th style={styles.th}>שעות שדווחו</th>
              </tr>
            </thead>
            <tbody>
              {courseReports.map((item, idx) => (
                <tr key={idx} style={styles.tr}>
                  <td style={{ ...styles.td, fontWeight: '500' }}>{item.course}</td>
                  <td style={styles.td}><code>{item.budgetCode}</code></td>
                  <td style={{ ...styles.td, color: '#4e73df', fontWeight: 'bold' }}>{item.hours} שעות</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={styles.summaryBox}>
            <strong>סה"כ שעות מצטבר לחודש זה: {totalHours} שעות</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8f9fc',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    direction: 'rtl' as const,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  backButton: {
    padding: '6px 12px',
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  content: {
    padding: '30px',
    maxWidth: '700px',
    margin: '0 auto',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    textAlign: 'right' as const,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
  },
  thRow: {
    backgroundColor: '#f8f9fc',
    borderBottom: '2px solid #e3e6f0',
  },
  th: { padding: '12px', color: '#495057', fontWeight: '600' },
  tr: { borderBottom: '1px solid #e3e6f0' },
  td: { padding: '12px', color: '#4a5568' },
  summaryBox: {
    marginTop: '25px',
    padding: '15px',
    backgroundColor: '#e8f4fd',
    borderRadius: '6px',
    color: '#2e59d9',
    fontSize: '16px',
    textAlign: 'left' as const,
  }
};