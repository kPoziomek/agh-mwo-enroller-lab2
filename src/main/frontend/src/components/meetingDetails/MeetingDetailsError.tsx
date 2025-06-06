import {useNavigate} from "react-router-dom";

const MeetingDetailsError = ({error}:{error: string}) => {
    const navigate = useNavigate();

    return (
        <div className="card text-center">
            <div className="alert alert-error">
                {error}
            </div>
            <button
                onClick={() => navigate('/meetings')}
                className="button button-outline"
            >
                ← Powrót do listy spotkań
            </button>
        </div>
    );
};

export default MeetingDetailsError;