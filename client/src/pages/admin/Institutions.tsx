import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// הגדרת סוג הנתונים של מוסד בשביל TypeScript
interface Institution {
    id: string;
    name: string;
    allocatedHours: number;
}

export default function Institutions() {
    const navigate = useNavigate();

    // 1. רשימת מוסדות התחלתית בדינמית (State)
    const [institutions, setInstitutions] = useState<Institution[]>([
        { id: '1', name: 'מכללת הייטק וטכנולוגיה', allocatedHours: 120 },
        { id: '2', name: 'בית ספר למדעים וסייבר', allocatedHours: 90 },
        { id: '3', name: 'מרכז קהילתי אופקים', allocatedHours: 45 }
    ]);

    // סטייט לניהול השדות של מוסד חדש
    const [newName, setNewName] = useState('');
    const [newHours, setNewHours] = useState('');

    // פונקציה להוספת מוסד חדש
    const handleAddInstitution = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newName || !newHours) return;

        const newInst: Institution = {
            id: Date.now().toString(), // מייצר מזהה ייחודי זמני
            name: newName,
            allocatedHours: Number(newHours)
        };

        setInstitutions([...institutions, newInst]);

        // ניקוי השדות בטופס
        setNewName('');
        setNewHours('');
    };

    // פונקציה למחיקת מוסד מהרשימה
    const handleDelete = (id: string) => {
        if (window.confirm('האם את בטוחה שברצונך למחוק מוסד זה?')) {
            setInstitutions(institutions.filter(inst => inst.id !== id));
        }
    };

    return (
        <div style={styles.container}>
            {/* תפריט עליון למנהל */}
            <div style={styles.header}>
                <button onClick={() => navigate('/')} style={styles.logoutButton}>
                    התנתקות מהמערכת
                </button>
                <h3 style={{ margin: 0 }}>פאנל ניהול מערכת - מוסדות</h3>
            </div>

            <div style={styles.content}>

                {/* טופס הוספת מוסד חדש */}
                <div style={styles.card}>
                    <h4 style={{ margin: '0 0 15px 0', color: '#4e73df' }}>+ הוספת מוסד לימודים חדש</h4>
                    <form onSubmit={handleAddInstitution} style={styles.formRow}>
                        <input
                            type="text"
                            placeholder="שם המוסד (למשל: מכללת...)"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            required
                            style={styles.input}
                        />
                        <input
                            type="number"
                            placeholder="שעות תקן מוקצות"
                            value={newHours}
                            onChange={(e) => setNewHours(e.target.value)}
                            required
                            min="1"
                            style={styles.input}
                        />
                        <button type="submit" style={styles.addButton}>הוסף מוסד</button>
                    </form>
                </div>

                {/* טבלת רשימת המוסדות הקיימים */}
                <div style={styles.card}>
                    <h4 style={{ margin: '0 0 20px 0' }}>רשימת מוסדות קיימים במערכת</h4>

                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.thRow}>
                                <th style={styles.th}>מזהה</th>
                                <th style={styles.th}>שם המוסד</th>
                                <th style={styles.th}>שעות תקן מוקצות</th>
                                <th style={styles.th}>פעולות</th>
                            </tr>
                        </thead>

                        <tbody>
                            {institutions.map((inst, index) => (
                                <tr key={inst.id} style={index % 2 === 0 ? styles.trEven : styles.trOdd}>
                                    <td style={styles.td}>{index + 1}</td>
                                    <td style={{ ...styles.td, fontWeight: 'bold' }}>{inst.name}</td>
                                    <td style={styles.td}>{inst.allocatedHours} שעות</td>
                                    <td style={styles.td}>
                                        {/* כפתור חדש לניהול עובדים שמוביל לדף ה-Employees */}
                                        <button
                                            onClick={() => navigate('/admin/employees')}
                                            style={{ ...styles.deleteButton, color: '#4e73df', borderColor: '#4e73df', marginLeft: '8px' }}
                                        >
                                            ניהול עובדים
                                        </button>

                                        <button
                                            onClick={() => handleDelete(inst.id)}
                                            style={styles.deleteButton}
                                        >
                                            מחק
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {institutions.length === 0 && (
                        <p style={{ textAlign: 'center', color: '#6c757d', margin: '20px 0' }}>אין מוסדות רשומים במערכת.</p>
                    )}
                </div>

            </div>
        </div>
    );
}

// אובייקט העיצובים לפאנל המנהל
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
    logoutButton: {
        padding: '6px 12px',
        backgroundColor: '#ea4335',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: '600',
    },
    content: {
        padding: '30px',
        maxWidth: '900px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '25px',
    },
    card: {
        backgroundColor: '#ffffff',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        textAlign: 'right' as const,
    },
    formRow: {
        display: 'flex',
        gap: '15px',
        flexWrap: 'wrap' as const,
    },
    input: {
        flex: 1,
        minWidth: '200px',
        padding: '10px 14px',
        fontSize: '15px',
        borderRadius: '8px',
        border: '1px solid #ced4da',
        outline: 'none',
    },
    addButton: {
        padding: '10px 20px',
        backgroundColor: '#4e73df',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '15px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse' as const,
        marginTop: '10px',
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
    trEven: {
        backgroundColor: '#ffffff',
    },
    trOdd: {
        backgroundColor: '#f8f9fc',
    },
    deleteButton: {
        padding: '5px 10px',
        backgroundColor: '#fff',
        color: '#ea4335',
        border: '1px solid #ea4335',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        ':hover': {
            backgroundColor: '#ea4335',
            color: '#fff',
        }
    }
};