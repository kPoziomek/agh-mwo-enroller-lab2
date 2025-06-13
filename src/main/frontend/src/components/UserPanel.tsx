import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import {deleteMeeting, getMeetings, registerForMeeting} from '../services/meetingService';
import type {Meeting} from "@/types/types.ts";
import toast from "react-hot-toast";
import {useTranslation} from "react-i18next";



const UserPanel = () => {
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const {t} = useTranslation()

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
                toast(t("userPanel.toastRegisterSuccess"));
            } else {
                toast(t("userPanel.toastRegisterFailure"));
            }
        } catch (err) {
            toast(t("userPanel.toastRegisterError"));
        }
    };
    const handleRemoveMeeting = async (meetingId: number) => {
        try {
            const success = await deleteMeeting(meetingId);
            if (success) {
                const updatedMeetings = await getMeetings();
                setMeetings(updatedMeetings);
                toast(t("userPanel.toastDeleteSuccess"));
            } else {
                toast(t("userPanel.toastDeleteFailure"));
            }
        }
        catch (err) {
            toast(t("userPanel.toastDeleteError"));
        }
    }

    if (isLoading) {
        return <div>{t("userPanel.loading")}</div>;
    }

    return (
        <div className="user-panel">
            <div className="header">
                <h2>{t("userPanel.title")}</h2>
                <div className="user-info">
                    <span>{t("userPanel.loginAs")} {user?.login}</span>
                    <button onClick={handleLogout}>{t("userPanel.logout")}</button>
                    <button onClick={addMeeting}>{t("userPanel.addMeeting")}</button>
                </div>
            </div>

            {error && <p className="error">{error}</p>}

            <div className="meetings-list">
                <h3>{t('userPanel.availableMeetings')}</h3>

                {meetings.length === 0 ? (
                    <p>{t("userPanel.noMeetings")}</p>
                ) : (
                    <ul>
                        {meetings.map((meeting) => (
                            <li key={meeting.id} className="meeting-item">
                                <h4>{meeting.title}</h4>
                                <p><strong>Data:</strong> {meeting.date}</p>
                                <p>{meeting.description}</p>
                                <button onClick={() => handleRegister(meeting.id)}>
                                    {t("userPanel.register")}
                                </button>
                                <button onClick={()=>handleRemoveMeeting(meeting.id)}>{t("userPanel.deleteMeeting")}</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default UserPanel;
