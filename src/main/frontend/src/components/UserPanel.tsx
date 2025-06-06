import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import {deleteMeeting, getMeetings, registerForMeeting} from '../services/meetingService';
import type {Meeting} from "@/types/types.ts";



const UserPanel = () => {
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const { user, logout } = useAuth();
    const navigate = useNavigate();
    function addMeeting() {
        navigate('/new-meeting');
    }
    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const data = await getMeetings();
                setMeetings(data);
            } catch (err) {
                setError('Nie udało się pobrać listy spotkań');
            } finally {
                setIsLoading(false);
            }
        };

        fetchMeetings();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleRegister = async (id: number) => {
        try {
            const success = await registerForMeeting(id);

            if (success) {
                const updatedMeetings = await getMeetings();
                setMeetings(updatedMeetings);
                alert('Zapisano na spotkanie');
            } else {
                alert('Nie udało się zapisać na spotkanie');
            }
        } catch (err) {
            alert('Wystąpił błąd podczas zapisywania na spotkanie');
        }
    };
    const handleRemoveMeeting = async (meetingId: number) => {
        try {
            const success = await deleteMeeting(meetingId);
            if (success) {
                const updatedMeetings = await getMeetings();
                setMeetings(updatedMeetings);
                alert('Usunięto spotkanie');
            } else {
                alert('Nie udało się usunąć spotkania');
            }
        }
        catch (err) {
            alert('Wystąpił błąd podczas usuwania spotkania');
        }
    }

    if (isLoading) {
        return <div>Ładowanie...</div>;
    }

    return (
        <div className="user-panel">
            <div className="header">
                <h2>Panel użytkownika</h2>
                <div className="user-info">
                    <span>Zalogowano jako: {user?.login}</span>
                    <button onClick={handleLogout}>Wyloguj</button>
                    <button onClick={addMeeting}>Dodaj spotkanie</button>
                </div>
            </div>

            {error && <p className="error">{error}</p>}

            <div className="meetings-list">
                <h3>Dostępne spotkania</h3>

                {meetings.length === 0 ? (
                    <p>Brak dostępnych spotkań</p>
                ) : (
                    <ul>
                        {meetings.map((meeting) => (
                            <li key={meeting.id} className="meeting-item">
                                <h4>{meeting.title}</h4>
                                <p><strong>Data:</strong> {meeting.date}</p>
                                <p>{meeting.description}</p>
                                <button onClick={() => handleRegister(meeting.id)}>
                                    Zapisz się
                                </button>
                                <button onClick={()=>handleRemoveMeeting(meeting.id)}>usuń spotkanie</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default UserPanel;
