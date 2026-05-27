import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SelectInstitution() {
  // נתונים זמניים לבדיקה (Mock Data) של מוסדות
  const mockInstitutions = [
    { id: '1', name: 'מכללת הייטק וטכנולוגיה' },
    { id: '2', name: 'בית ספר למדעים וסייבר' },
    { id: '3', name: 'מרכז קהילתי אופקים' }
  ];

  const [selectedId, setSelectedId] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!selectedId) {
      alert('אנא בחרי מוסד מתוך הרשימה כדי להמשיך');
      return;
    }
    
    // מעביר לדף הלוח החודשי ושולח את ה-ID של המוסד שנבחר בכתובת (URL Parameter)
    navigate(`/lecturer/dashboard?institution=${selectedId}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>שלום מרצה, ברוכה הבאה!</h2>
        <p style={styles.subtitle}>אנא בחרי את המוסד עבורו את רוצה לדווח שעות היום:</p>
        
        <div style={styles.inputGroup}>
          <label style={styles.label}>בחירת מוסד לימודים</label>
          <select 
            value={selectedId} 
            onChange={(e) => setSelectedId(e.target.value)}
            style={styles.select}
          >
            <option value="">-- לחצי לבחירה מהרשימה --</option>
            {mockInstitutions.map((inst) => (
              <option key={inst.id} value={inst.id}>
                {inst.name}
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleContinue} style={styles.button}>
          המשך ללוח דיווח השעות ←
        </button>
      </div>
    </div>
  );
}

// אובייקט העיצובים התואם לקו של ה-Login
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f6f9',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    direction: 'rtl' as const,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '40px 30px',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
    width: '100%',
    maxWidth: '450px',
    boxSizing: 'border-box' as const,
  },
  title: {
    margin: '0 0 10px 0',
    fontSize: '24px',
    color: '#1a1a1a',
    fontWeight: '600',
    textAlign: 'center' as const,
  },
  subtitle: {
    margin: '0 0 30px 0',
    fontSize: '14px',
    color: '#6c757d',
    textAlign: 'center' as const,
    lineHeight: '1.5',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
    marginBottom: '25px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#495057',
    textAlign: 'right' as const,
  },
  select: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '15px',
    borderRadius: '8px',
    border: '1px solid #ced4da',
    backgroundColor: '#fff',
    boxSizing: 'border-box' as const,
    outline: 'none',
    cursor: 'pointer',
  },
  button: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#ffffff',
    backgroundColor: '#28a745', // ירוק מרענן שמתאים להתקדמות/אישור פעולה
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};