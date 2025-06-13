import type {FC} from 'react';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../AuthContext.tsx";
import {deleteMeeting, getMeetings, registerForMeeting} from "@/services/meetingService.ts";
import type {Meeting} from "@/types/types.ts";
import toast from "react-hot-toast";
import {useTranslation} from "react-i18next";
interface ActionsProps {
    meeting: Meeting;
    setMeetings: (meetings: Meeting[]) => void;
}
const MeetingsListActions:FC<ActionsProps> = ({meeting, setMeetings}) => {
    const { user } = useAuth();
    const { t } = useTranslation();

    const navigate = useNavigate();
    const handleRegister = async (id: number) => {
        try {
            const success = await registerForMeeting(id);

            if (success) {
                const updatedMeetings = await getMeetings();
                setMeetings(updatedMeetings);
                toast(t('meetingsListActions.toastRegisterSuccess'));
            } else {
                toast(t('meetingsListActions.toastRegisterFailure'));
            }
        } catch (err) {
            toast(t('meetingsListActions.toastRegisterError'));
        }
    };

    const handleRemoveMeeting = async (meetingId: number) => {
        try {
            await deleteMeeting(meetingId);
            const updatedMeetings = await getMeetings();
            setMeetings(updatedMeetings);
            toast(t('meetingsListActions.toastDeleteSuccess'));
        } catch (err: any) {
            if (err.response?.status === 403) {
                toast(t('meetingsListActions.toastDeleteFailure'));
            } else {
                toast(t('meetingsListActions.toastDeleteError'));
            }
        }
    };
    return (
        <div className="card-actions">
            <button
                onClick={() => navigate(`/meetings/${meeting.id}`)}
                className="button button-info button-small"
            >
                {t('meetingsListActions.details')}
            </button>
            <button
                onClick={() => handleRegister(meeting.id)}
                className="button button-success button-small"
            >
                {t('meetingsListActions.register')}
            </button>
            {meeting.createdBy === user?.login && (
                <button
                    onClick={() => handleRemoveMeeting(meeting.id)}
                    className="button button-danger button-small"
                >
                    {t('meetingsListActions.delete')}
                </button>
            )}
        </div>
    );
};

export default MeetingsListActions;