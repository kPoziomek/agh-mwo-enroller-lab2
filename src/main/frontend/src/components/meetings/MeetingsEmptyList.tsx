import {useNavigate} from "react-router-dom";

const MeetingsEmptyList = () => {
    const navigate = useNavigate();
    const addMeeting = () => {
        navigate('/new-meeting');
    };
    return (
        <div className="card text-center">
            <h5>📭 Brak dostępnych spotkań</h5>
            <p className="text-muted">Rozpocznij organizację wydarzeń w swojej społeczności</p>
            <button
                onClick={addMeeting}
                className="button button-primary"
            >
                ✨ Dodaj pierwsze spotkanie
            </button>
        </div>
    );
};

export default MeetingsEmptyList;