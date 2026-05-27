import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Employees() {
  const navigate = useNavigate();

  // נתונים פיקטיביים של מרצים במערכת
  const [lecturers] = useState([
    { id: '101', name: 'ד"ר רותם כהן', email: 'rotem@email.com', reportedHours: 34 },
    { id: '102', name: 'פרופסור אורי לוי', email: 'ori.l@email.com', reportedHours: 50 },
    { id: '103', name: 'אפרת שחר', email: 'efrat.s@email.com', reportedHours: 12 },
  ]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate('/admin/institutions')} style={styles.backButton}>
          → חזרה למוסדות
        </button>
        <h3 style={{ margin: 0 }}>ניהול מרצים ועובדים</h3>
      </div>

      <div style={styles.content}>
        <div style={styles.card}>
          <h3 style={{ marginTop: 0, color: '#4e73df' }}>סגל המרצים במוסד שנבחר</h3>
          <p style={{ color: '#6c757d', fontSize: '14px' }}>לפנייך רשימת המרצים הפעילים. לחצי על "צפייה בפרופיל" כדי לראות את פירוט השעות והקורסים שלהם.</p>

          <table style={styles.table}>
            <thead>
              <tr style={styles.thRow}>
                <th style={styles.th}>שם המרצה</th>
                <th style={styles.th}>כתובת אימייל</th>
                <th style={styles.th}>שעות שדווחו החודש</th>
                <th style={styles.th}>פעולות</th>
              </tr>
            </thead>
            <tbody>
              {lecturers.map((lecturer, index) => (
                <tr key={lecturer.id} style={index % 2 === 0 ? styles.trEven : styles.trOdd}>
                  <td style={{ ...styles.td, fontWeight: 'bold' }}>{lecturer.name}</td>
                  <td style={styles.td}>{lecturer.email}</td>
                  <td style={styles.td}>{lecturer.reportedHours} שעות</td>
                  <td style={styles.td}>
                    <button 
                      onClick={() => navigate(`/admin/lecturer-profile?id=${lecturer.id}&name=${lecturer.name}`)} 
                      style={styles.profileButton}
                    >
                      צפייה בפרופיל ושעות ←
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
    maxWidth: '900px',
    margin: '0 auto',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    textAlign: 'right' as const,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    marginTop: '20px',
  },
  thRow: {
    backgroundColor: '#f1f3f9',
    borderBottom: '2px solid #ced4da',
  },
  th: {
    padding: '12px',
    textAlign: 'right' as const,
    color: '#495057',
    fontWeight: '600',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #e3e6f0',
    color: '#4a5568',
  },
  trEven: { backgroundColor: '#ffffff' },
  trOdd: { backgroundColor: '#f8f9fc' },
  profileButton: {
    padding: '5px 12px',
    backgroundColor: '#4e73df',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '13px',
  }
};