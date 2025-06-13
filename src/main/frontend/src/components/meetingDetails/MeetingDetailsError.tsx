import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const MeetingDetailsError = ({error}:{error: string}) => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    return (
        <div className="card text-center">
            <div className="alert alert-error">
                {error}
            </div>
            <button
                onClick={() => navigate('/meetings')}
                className="button button-outline"
            >
                {t('meetingDetails.error.backToMeetings')}
            </button>
        </div>
    );
};

export default MeetingDetailsError;