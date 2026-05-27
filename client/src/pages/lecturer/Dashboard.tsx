import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

// הגדרת סוג הנתונים של דיווח שעות (בשביל הטיפוסים של TypeScript)
interface TimeReport {
  hours: number;
  subject: string;
}

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // משיכת ה-ID של המוסד שנבחר מהכתובת למעלה
  const institutionId = searchParams.get('institution') || '1';

  // 1. ניהול הסטייט של הדיווחים. המפתח הוא מספר היום, והערך הוא אובייקט הדיווח
  const [reports, setReports] = useState<Record<number, TimeReport>>({
    5: { hours: 4, subject: 'מבוא למחשב' }, // נתונים התחלתיים לדוגמה
    12: { hours: 6, subject: 'סייבר ואבטחה' },
  });

  // סטייט לניהול החלון הקופץ (Modal)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  
  // שדות הטופס בחלון הקופץ
  const [inputHours, setInputHours] = useState('');
  const [inputSubject, setInputSubject] = useState('');

  // קורסים זמניים לבחירה בטופס
  const mockCourses = ['מבוא למחשב', 'סייבר ואבטחה', 'פיתוח אפליקציות Web', 'רשתות תקשורת'];

  // פתיחת החלון הקופץ בלחיצה על יום
  const handleDayClick = (day: number) => {
    setSelectedDay(day);
    // אם כבר יש דיווח ליום הזה, נטען אותו לטופס, אחרת ננקה את השדות
    if (reports[day]) {
      setInputHours(reports[day].hours.toString());
      setInputSubject(reports[day].subject);
    } else {
      setInputHours('');
      setInputSubject('');
    }
    setIsModalOpen(true);
  };

  // שמירת הדיווח
  const handleSaveReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDay === null || !inputHours || !inputSubject) return;

    // עדכון הסטייט של הדיווחים (הוספה או עדכון בזמן אמת)
    setReports({
      ...reports,
      [selectedDay]: {
        hours: Number(inputHours),
        subject: inputSubject
      }
    });

    setIsModalOpen(false);
  };

  // חישוב סך כל השעות המצטברות של המרצה החודש
  const totalMonthlyHours = Object.values(reports).reduce((sum, report) => sum + report.hours, 0);

  // יצירת מערך של 30 ימים בשביל הלוח
  const daysArray = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div style={styles.container}>
      {/* תפריט עליון קטן */}
      <div style={styles.header}>
        <button onClick={() => navigate('/lecturer/select-institution')} style={styles.backButton}>
          → החלפת מוסד
        </button>
        <h3 style={{ margin: 0 }}>מערכת דיווח שעות - אזור המרצה</h3>
      </div>

      <div style={styles.content}>
        {/* כרטיסיית סיכום חודשי קבועה בראש העמוד */}
        <div style={styles.summaryCard}>
          <h3>סיכום חודשי מצטבר</h3>
          <p style={styles.totalHoursText}>
            סך הכל שעות החודש: <span style={{ color: '#28a745', fontWeight: 'bold' }}>{totalMonthlyHours} שעות</span>
          </p>
        </div>

        <h3 style={{ textAlign: 'right', marginBottom: '15px' }}>לוח דיווח שעות חודשי:</h3>
        <p style={{ textAlign: 'right', color: '#6c757d', fontSize: '14px', marginTop: '-10px', marginBottom: '20px' }}>
          * לחצי על יום מסוים כדי להוסיף, לעדכן או לצפות בדיווח השעות.
        </p>

        {/* גריד לוח השנה */}
        <div style={styles.grid}>
          {daysArray.map((day) => {
            const hasReport = reports[day];
            return (
              <div 
                key={day} 
                onClick={() => handleDayClick(day)}
                style={{
                  ...styles.dayBox,
                  backgroundColor: hasReport ? '#e8f4fd' : '#ffffff',
                  borderColor: hasReport ? '#4e73df' : '#ced4da',
                }}
              >
                <span style={styles.dayNumber}>{day}</span>
                {hasReport && (
                  <div style={styles.reportBadge}>
                    <p style={{ margin: '5px 0 0 0', fontWeight: 'bold', fontSize: '13px' }}>{hasReport.hours} שעות</p>
                    <p style={{ margin: 0, fontSize: '11px', color: '#555', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{hasReport.subject}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* החלון הקופץ (Modal) לדיווח השעות */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalCard}>
            <h3 style={{ marginTop: 0 }}>דיווח שעות ליום {selectedDay} בחודש</h3>
            
            <form onSubmit={handleSaveReport} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>בחרי קורס / מקצוע:</label>
                <select 
                  value={inputSubject} 
                  onChange={(e) => setInputSubject(e.target.value)}
                  required
                  style={styles.input}
                >
                  <option value="">-- בחרי קורס --</option>
                  {mockCourses.map((course, idx) => (
                    <option key={idx} value={course}>{course}</option>
                  ))}
                </select>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>כמות שעות עבודה:</label>
                <input 
                  type="number" 
                  min="1" 
                  max="24"
                  value={inputHours}
                  onChange={(e) => setInputHours(e.target.value)}
                  placeholder="הכניסי מספר שעות"
                  required
                  style={styles.input}
                />
              </div>

              <div style={styles.modalActions}>
                <button type="submit" style={styles.saveButton}>סיום ושמירה</button>
                <button type="button" onClick={() => setIsModalOpen(false)} style={styles.cancelButton}>ביטול</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// אובייקט העיצובים
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
    maxWidth: '1000px',
    margin: '0 auto',
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    marginBottom: '30px',
    textAlign: 'right' as const,
  },
  totalHoursText: {
    fontSize: '18px',
    margin: '5px 0 0 0',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: '15px',
  },
  dayBox: {
    height: '100px',
    border: '1px solid',
    borderRadius: '8px',
    padding: '10px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.08)',
    }
  },
  dayNumber: {
    fontWeight: 'bold' as const,
    color: '#4e73df',
    fontSize: '16px',
  },
  reportBadge: {
    width: '100%',
    textAlign: 'right' as const,
  },
  modalOverlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalCard: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '15px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px',
    textAlign: 'right' as const,
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
  },
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ced4da',
    fontSize: '15px',
    outline: 'none',
  },
  modalActions: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
  },
  saveButton: {
    flex: 2,
    padding: '10px',
    backgroundColor: '#4e73df',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold' as const,
  },
  cancelButton: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#ea4335',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};