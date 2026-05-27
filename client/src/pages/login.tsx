import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [userCode, setUserCode] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        // ברגע שמגיעים לדף הלוגין - מרוקנים את השדות לחלוטין
        setUserCode('');
        setPassword('');

        // מונע מהדפדפן להשתמש בבופר של החץ קדימה/אחורה עבור הדף המאובטח
        window.history.pushState(null, '', window.location.href);
    }, []);
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (userCode === 'admin' && password === '1234') {
            alert('שלום למנהל!');
            navigate('/admin/institutions',{replace: true });
        } else if (userCode === 'lecturer' && password === '1234') {
            alert('שלום למרצה!');
            navigate('/lecturer/select-institution');
        } else {
            alert('קוד או סיסמה שגויים. נסי שוב.');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                {/* כותרת מעוצבת */}
                <h2 style={styles.title}>מערכת דיווח שעות</h2>
                <p style={styles.subtitle}>ברוכים הבאים! אנא הזדהו כדי להמשיך</p>

                <form onSubmit={handleLogin} style={styles.form}>
                    {/* שדה קוד משתמש */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>קוד משתמש</label>
                        <input
                            type="text"
                            value={userCode}
                            onChange={(e) => setUserCode(e.target.value)}
                            placeholder="הכניסי קוד משתמש"
                            required
                            style={styles.input}
                        />
                    </div>

                    {/* שדה סיסמה */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>סיסמה</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="הכניסי סיסמה"
                            required
                            style={styles.input}
                        />
                    </div>

                    {/* כפתור התחברות */}
                    <button type="submit" style={styles.button}>
                        התחברות למערכת
                    </button>
                </form>
            </div>
        </div>
    );
}

// אובייקט העיצובים - ככה הקוד נשאר נקי ומסודר
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f6f9', // רקע אפרפר בהיר ונעים לעיניים
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        direction: 'rtl' as const,
    },
    card: {
        backgroundColor: '#ffffff',
        padding: '40px 30px',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)', // צל רך שנותן אפקט מרחף
        width: '100%',
        maxWidth: '400px',
        boxSizing: 'border-box' as const,
    },
    title: {
        margin: '0 0 10px 0',
        fontSize: '26px',
        color: '#1a1a1a',
        fontWeight: '600',
        textAlign: 'center' as const,
    },
    subtitle: {
        margin: '0 0 30px 0',
        fontSize: '14px',
        color: '#6c757d', // צבע אפור עדין לתת-כותרת
        textAlign: 'center' as const,
    },
    form: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '20px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '8px',
    },
    label: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#495057',
        textAlign: 'right' as const,
    },
    input: {
        width: '100%',
        padding: '12px 16px',
        fontSize: '15px',
        borderRadius: '8px',
        border: '1px solid #ced4da',
        backgroundColor: '#fff',
        boxSizing: 'border-box' as const,
        outline: 'none',
        transition: 'border-color 0.2s',
    },
    button: {
        width: '100%',
        padding: '12px',
        fontSize: '16px',
        fontWeight: '600',
        color: '#ffffff',
        backgroundColor: '#4e73df', // כחול הייטק מודרני
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        marginTop: '10px',
        transition: 'background-color 0.2s',
    },
};