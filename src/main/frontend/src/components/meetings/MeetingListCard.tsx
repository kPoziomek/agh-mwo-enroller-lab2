import type {FC} from 'react';
import MeetingsListActions from "./MeetingsListActions.tsx";
import {useAuth} from "../../AuthContext.tsx";
import type {Meeting} from "@/types/types.ts";
import {useTranslation} from "react-i18next";

interface MeetingListCardProps {
    meeting: Meeting
    setMeetings: (meetings: Meeting[]) => void;
}
const MeetingListCard:FC<MeetingListCardProps> = ({meeting,setMeetings}) => {
    const { user } = useAuth();
    const { t } = useTranslation();
    return (
        <div key={meeting.id} className="column column-50">
            <div className="card">
                <div className="card-header">
                    <h4 className="mb-0">{meeting.title}</h4>
                    <p className="text-muted mb-0">
                        <strong>{t('meetingsCard.date')}:</strong> {meeting.date}
                    </p>
                </div>

                <p className="mb-1">{meeting.description}</p>

                {meeting.createdBy && (
                    <p className="text-muted mb-1">
                        👤 <strong>{t("meetingsCard.organizer")}:</strong> {meeting.createdBy}
                        {meeting.createdBy === user?.login && (t('meetingsCard.you'))}
                    </p>
                )}
                <MeetingsListActions meeting={meeting} setMeetings={setMeetings}/>
            </div>
        </div>
    );
};

export default MeetingListCard;