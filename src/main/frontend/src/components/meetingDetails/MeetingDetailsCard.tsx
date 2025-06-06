import {useAuth} from "../../AuthContext.tsx";
import type {FC} from "react";
import type {Meeting} from "@/types/types.ts";

interface MeetingDetailsCardProps {
    meeting: Meeting;
}

const MeetingDetailsCard: FC<MeetingDetailsCardProps> = ({meeting}) => {
    const { user } = useAuth();
    return (
        <div className="card mb-2">
            <h2 className="mb-1">{meeting.title}</h2>
            <h6 className="text-muted mb-1">
                📅 <strong>Data:</strong> {meeting.date ? new Intl.DateTimeFormat("pl-PL",{  dateStyle: "full",  timeStyle: "short",}).format(new Date(meeting?.date)) : 'Nie podano daty'}
            </h6>
            {meeting.createdBy && (
                <h6 className="text-muted mb-1">
                    👤 <strong>Organizator:</strong> {meeting.createdBy}
                    {meeting.createdBy === user?.login && ' (To Ty)'}
                </h6>
            )}
            <p className="mb-0">{meeting.description}</p>
        </div>
    );
};

export default MeetingDetailsCard;