import  {type FC} from 'react';
import {useNavigate} from "react-router-dom";
import {deleteMeeting} from "@/services/meetingService.ts";
import toast from "react-hot-toast";
import {useTranslation} from "react-i18next";
interface MeetingDetailsNavigationProps {
    isOwner: boolean;
    meetingId: number | null;
}

const MeetingDetailsNavigation:FC<MeetingDetailsNavigationProps> = ({isOwner, meetingId}) => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const handleDeleteMeeting = async () => {
        if (!meetingId) return;

        const confirmDelete = window.confirm(
            t('meetingDetails.meetingNavigation.confirmDelete')
        );

        if (!confirmDelete) return;

        try {
            await deleteMeeting(meetingId);
            toast(t('meetingDetails.meetingNavigation.toastDeleteSuccess'));
            navigate('/meetings');
        } catch (err: any) {
            if (err.response?.status === 403) {
                toast(t('meetingDetails.meetingNavigation.toastDeleteFailure'));
            } else {
                toast(t('meetingDetails.meetingNavigation.toastDeleteError'));
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
                    {t('meetingDetails.meetingNavigation.goBack')}
                </button>
            </div>
            <div className="column column-33">
                {isOwner && (
                    <div className="text-center">
                        <button
                            onClick={handleDeleteMeeting}
                            className="button button-danger"
                        >
                            {t('meetingDetails.meetingNavigation.deleteMeeting')}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MeetingDetailsNavigation;