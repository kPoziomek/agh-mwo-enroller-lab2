import { useEffect, useState } from 'react';
import {  getMeetings } from '@/services/meetingService.ts';
import {MeetingsList} from "./MeetingsList.tsx";
import MeetingsActions from "./MeetingsActions.tsx";
import type {Meeting} from "@/types/types.ts";

export const MeetingsPage = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const data = await getMeetings();
        setMeetings(data);
      } catch (err) {
        setError('Nie udało się pobrać listy spotkań');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center">
        <h5>Ładowanie spotkań...</h5>
      </div>
    );
  }

  return (
    <div>
      <MeetingsActions meetings={meetings}/>
      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}
      {meetings && <MeetingsList setMeetings={setMeetings} meetings={meetings}/>}
    </div>
  );
};
