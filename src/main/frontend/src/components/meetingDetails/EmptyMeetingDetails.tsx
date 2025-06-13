import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const EmptyMeetingDetails = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    return (
        <div className="card text-center">
            <h5> {t('meetingDetails.emptyMeetingDetails.title')}</h5>
            <button
                onClick={() => navigate('/meetings')}
                className="button button-outline"
            >
                {t('meetingDetails.emptyMeetingDetails.backToMeetings')}
            </button>
        </div>
    );
};

export default EmptyMeetingDetails;