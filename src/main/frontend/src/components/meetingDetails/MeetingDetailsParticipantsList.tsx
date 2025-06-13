import {useAuth} from "../../AuthContext.tsx";
import {type FC, } from "react";
import {getMeetingParticipants, removeParticipantFromMeeting} from "@/services/meetingService.ts";
import toast from "react-hot-toast";
import {useTranslation} from "react-i18next";

interface MeetingDetailsParticipantsListProps {
    participants: { login: string }[];
    meetingId: number | null;
    setParticipants: (participants: { login: string }[]) => void;
}
const MeetingDetailsParticipantsList:FC<MeetingDetailsParticipantsListProps> = ({participants,meetingId, setParticipants}) => {
   const {t} =useTranslation()
    const handleRemoveParticipant = async (participantLogin: string) => {
        if (!meetingId) return;

        const confirmRemove = window.confirm(
            t('meetingDetails.meetingActions.toastConfirmUnregister', {participant: participantLogin})
        );

        if (!confirmRemove) return;

        try {
            const success = await removeParticipantFromMeeting(meetingId, participantLogin);
            if (success) {
                const updatedParticipants = await getMeetingParticipants(meetingId);
                setParticipants(updatedParticipants);
                toast(t('meetingDetails.meetingActions.toastRemoveSuccess'));
            } else {
                toast(t('meetingDetails.meetingActions.toastRemoveFailure'));
            }
        } catch (err) {
            toast(t('meetingDetails.meetingActions.toastRemoveError'));

        }
    };


    const { user } = useAuth();

    return (
        <div className="card">
            <h4 className="mb-2">{t('meetingDetails.participantsCount',{
            count: participants.length}
            )}</h4>

            {participants.length === 0 ? (
                <div className="text-center">
                    <p className="text-muted">{
                        t('meetingDetails.noParticipants')
                    }</p>
                </div>
            ) : (
                <div className="participants-list">
                    {participants.map((participant) => (
                        <div
                            key={participant.login}
                            className={`participant-item ${participant.login === user?.login ? 'participant-current' : ''}`}
                        >
                <span className="participant-name">
                  {participant.login === user?.login && t('meetingDetails.participantUser')}
                    {participant.login}
                    {participant.login === user?.login && t('meetingDetails.participantYou')}
                </span>

                            {participant.login !== user?.login && (
                                <button
                                    onClick={() => handleRemoveParticipant(participant.login)}
                                    className="button button-danger button-small"
                                >
                                    {t("meetingDetails.deleteParticipant")}
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