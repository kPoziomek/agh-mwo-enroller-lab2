import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const MeetingsEmptyList = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const addMeeting = () => {
        navigate('/new-meeting');
    };
    return (
        <div className="card text-center">
            <h5>{t('meetingsEmptyList.title')}</h5>
            <p className="text-muted">{
                t('meetingsEmptyList.description')
            }</p>
            <button
                onClick={addMeeting}
                className="button button-primary"
            >
                {t('meetingsEmptyList.addMeetingButton')}
            </button>
        </div>
    );
};

export default MeetingsEmptyList;