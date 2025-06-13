import type {FC} from "react";
import {
    getMeetingParticipants,
    registerForMeeting,
    removeParticipantFromMeeting
} from "@/services/meetingService.ts";
import {useAuth} from "../../AuthContext.tsx";
import toast from "react-hot-toast";
import {useTranslation} from "react-i18next";
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

    const {t} = useTranslation();
    const handleJoinMeeting = async () => {
        if (!meetingId) return;

        try {
            const success = await registerForMeeting(meetingId);
            if (success) {
                const updatedParticipants = await getMeetingParticipants(meetingId);
                setParticipants(updatedParticipants);
                toast(t('meetingDetails.meetingActions.toastJoinSuccess'));
            } else {
                toast(t('meetingDetails.meetingActions.toastJoinFailure'));
            }
        } catch (err) {
            toast(t('meetingDetails.meetingActions.toastJoinError'));
        }
    };


    const handleRemoveParticipant = async (participantLogin: string) => {
        if (!meetingId) return;

        const confirmRemove = window.confirm(
            t('meetingDetails.meetingActions.confirmRemove', { participant: participantLogin })
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


    return (
        <div className="text-center mb-2">
            {isUserParticipant ? (
                <button
                    onClick={() => handleRemoveParticipant(user?.login || '')}
                    className="button button-outline"
                >
                    {t("meetingDetails.meetingActions.unregister")}
                </button>
            ) : (
                <button
                    onClick={handleJoinMeeting}
                    className="button button-success"
                >
                    {t("meetingDetails.meetingActions.register")}
                </button>
            )}
        </div>
    );
};

export default MeetingDetailsActions;