import  {type FC} from 'react';
import {useNavigate} from "react-router-dom";
import {deleteMeeting} from "@/services/meetingService.ts";
interface MeetingDetailsNavigationProps {
    isOwner: boolean;
    meetingId: number | null;
}

const MeetingDetailsNavigation:FC<MeetingDetailsNavigationProps> = ({isOwner, meetingId}) => {
    const navigate = useNavigate();

    const handleDeleteMeeting = async () => {
        if (!meetingId) return;

        const confirmDelete = window.confirm(
            'Czy na pewno chcesz usunąć to spotkanie? Ta akcja jest nieodwracalna.'
        );

        if (!confirmDelete) return;

        try {
            await deleteMeeting(meetingId);
            alert('Spotkanie zostało usunięte');
            navigate('/meetings');
        } catch (err: any) {
            if (err.response?.status === 403) {
                alert('Tylko twórca spotkania może je usunąć');
            } else {
                alert('Wystąpił błąd podczas usuwania spotkania');
            }
        }
    };


    return (
        <div className="row mb-2">
            <div className="column">
                <button
                    onClick={() => navigate('/meetings')}
                    className="button button-outline"
                >
                    ← Powrót
                </button>
            </div>
            <div className="column column-33">
                {isOwner && (
                    <div className="text-center">
                        <button
                            onClick={handleDeleteMeeting}
                            className="button button-danger"
                        >
                            🗑️ Usuń spotkanie
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MeetingDetailsNavigation;