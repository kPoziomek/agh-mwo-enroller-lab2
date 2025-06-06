import {useAuth} from "../../AuthContext.tsx";
import type {FC} from "react";
import {getMeetingParticipants, removeParticipantFromMeeting} from "@/services/meetingService.ts";

interface MeetingDetailsParticipantsListProps {
    participants: { login: string }[];
    meetingId: number | null;
    setParticipants: (participants: { login: string }[]) => void;
}
const MeetingDetailsParticipantsList:FC<MeetingDetailsParticipantsListProps> = ({participants,meetingId, setParticipants}) => {
    const handleRemoveParticipant = async (participantLogin: string) => {
        if (!meetingId) return;

        const confirmRemove = window.confirm(
            `Czy na pewno chcesz usunąć ${participantLogin} z tego spotkania?`
        );

        if (!confirmRemove) return;

        try {
            const success = await removeParticipantFromMeeting(meetingId, participantLogin);
            if (success) {
                const updatedParticipants = await getMeetingParticipants(meetingId);
                setParticipants(updatedParticipants);
                alert('Usunięto uczestnika ze spotkania');
            } else {
                alert('Nie udało się usunąć uczestnika');
            }
        } catch (err) {
            alert('Wystąpił błąd podczas usuwania uczestnika');
        }
    };


    const { user } = useAuth();

    return (
        <div className="card">
            <h4 className="mb-2">👥 Uczestnicy ({participants.length})</h4>

            {participants.length === 0 ? (
                <div className="text-center">
                    <p className="text-muted">Brak uczestników. Bądź pierwszy!</p>
                </div>
            ) : (
                <div className="participants-list">
                    {participants.map((participant) => (
                        <div
                            key={participant.login}
                            className={`participant-item ${participant.login === user?.login ? 'participant-current' : ''}`}
                        >
                <span className="participant-name">
                  {participant.login === user?.login && '👤 '}
                    {participant.login}
                    {participant.login === user?.login && ' (To Ty)'}
                </span>

                            {participant.login !== user?.login && (
                                <button
                                    onClick={() => handleRemoveParticipant(participant.login)}
                                    className="button button-danger button-small"
                                >
                                    ✖ Usuń
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MeetingDetailsParticipantsList;