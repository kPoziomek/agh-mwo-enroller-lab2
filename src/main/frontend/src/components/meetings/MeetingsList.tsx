import MeetingsEmptyList from "./MeetingsEmptyList.tsx";
import MeetingListCard from "./MeetingListCard.tsx";
import type {Meeting} from "@/types/types.ts";

interface MeetingsListProps {
    meetings: Meeting[];
    setMeetings: (meetings: Meeting[]) => void;

}

export const  MeetingsList=({meetings,setMeetings}:MeetingsListProps)=> {


    if(meetings.length === 0){
        return <MeetingsEmptyList/>
    }

    return (
              <div className="row">
                  {meetings.map((meeting) => (
                    <MeetingListCard meeting={meeting} setMeetings={setMeetings} key={meeting.id} />
                  ))}
              </div>
  );
}
