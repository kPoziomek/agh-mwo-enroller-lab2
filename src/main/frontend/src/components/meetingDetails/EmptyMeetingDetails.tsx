import {useNavigate} from "react-router-dom";

const EmptyMeetingDetails = () => {
    const navigate = useNavigate();

    return (
        <div className="card text-center">
            <h5>📭 Spotkanie nie zostało znalezione</h5>
            <button
                onClick={() => navigate('/meetings')}
                className="button button-outline"
            >
                ← Powrót do listy spotkań
            </button>
        </div>
    );
};

export default EmptyMeetingDetails;