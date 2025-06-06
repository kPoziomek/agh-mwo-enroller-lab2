import type {FC} from "react";
import {
    getMeetingParticipants,
    registerForMeeting,
    removeParticipantFromMeeting
} from "@/services/meetingService.ts";
import {useAuth} from "../../AuthContext.tsx";
interface MeetingDetailsActionsProps {
    isUserParticipant: boolean;
    meetingId: number | null;
    setParticipants: (participants: { login: string }[]) => void;
}

const MeetingDetailsActions:FC<MeetingDetailsActionsProps> = ({

                                                                  isUserParticipant,
                                                                  meetingId,
                                                                  setParticipants
                                                              }) => {
    const { user } = useAuth();


    const handleJoinMeeting = async () => {
        if (!meetingId) return;

        try {
            const success = await registerForMeeting(meetingId);
            if (success) {
                const updatedParticipants = await getMeetingParticipants(meetingId);
                setParticipants(updatedParticipants);
                alert('Zapisano na spotkanie');
            } else {
                alert('Nie udało się zapisać na spotkanie');
            }
        } catch (err) {
            alert('Wystąpił błąd podczas zapisywania na spotkanie');
        }
    };


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


    return (
        <div className="text-center mb-2">
            {isUserParticipant ? (
                <button
                    onClick={() => handleRemoveParticipant(user?.login || '')}
                    className="button button-outline"
                >
                    ⚠️ Wypisz się ze spotkania
                </button>
            ) : (
                <button
                    onClick={handleJoinMeeting}
                    className="button button-success"
                >
                    ✅ Zapisz się na spotkanie
                </button>
            )}
        </div>
    );
};

export default MeetingDetailsActions;