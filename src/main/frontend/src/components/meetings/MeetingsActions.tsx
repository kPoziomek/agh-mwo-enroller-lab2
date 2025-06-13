import {useNavigate} from "react-router-dom";
import type {FC} from "react";
import type {Meeting} from "@/types/types.ts";
import {useTranslation} from "react-i18next";
interface MeetingsActionsProps {
    meetings: Meeting[]
}
const MeetingsActions:FC<MeetingsActionsProps> = ({meetings }) => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const addMeeting = () => {
        navigate('/new-meeting');
    };

    return (
        <div className="row">
            <div className="column">
                <h2 className="mb-0">{t('meetingsActions.title')}({meetings.length})</h2>
            </div>
            <div className="column column-33 text-center">
                <button
                    onClick={addMeeting}
                    className="button button-success"
                >
                    {t('meetingsActions.addMeetingButton')}
                </button>
            </div>
        </div>
    );
};

export default MeetingsActions;