import type {FC} from 'react';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../AuthContext.tsx";
import {deleteMeeting, getMeetings, registerForMeeting} from "@/services/meetingService.ts";
import type {Meeting} from "@/types/types.ts";
interface ActionsProps {
    meeting: Meeting;
    setMeetings: (meetings: Meeting[]) => void;
}
const MeetingsListActions:FC<ActionsProps> = ({meeting, setMeetings}) => {
    const { user } = useAuth();

    const navigate = useNavigate();
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
            await deleteMeeting(meetingId);
            const updatedMeetings = await getMeetings();
            setMeetings(updatedMeetings);
            alert('Usunięto spotkanie');
        } catch (err: any) {
            if (err.response?.status === 403) {
                alert('Tylko twórca spotkania może je usunąć');
            } else {
                alert('Wystąpił błąd podczas usuwania spotkania');
            }
        }
    };
    return (
        <div className="card-actions">
            <button
                onClick={() => navigate(`/meetings/${meeting.id}`)}
                className="button button-info button-small"
            >
                👥 Szczegóły
            </button>
            <button
                onClick={() => handleRegister(meeting.id)}
                className="button button-success button-small"
            >
                ✅ Zapisz się
            </button>
            {meeting.createdBy === user?.login && (
                <button
                    onClick={() => handleRemoveMeeting(meeting.id)}
                    className="button button-danger button-small"
                >
                    🗑️ Usuń
                </button>
            )}
        </div>
    );
};

export default MeetingsListActions;