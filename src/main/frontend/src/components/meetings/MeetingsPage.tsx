import { useEffect, useState } from 'react';
import {  getMeetings } from '@/services/meetingService.ts';
import {MeetingsList} from "./MeetingsList.tsx";
import MeetingsActions from "./MeetingsActions.tsx";
import type {Meeting} from "@/types/types.ts";
import {useTranslation} from "react-i18next";

export const MeetingsPage = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const  { t } = useTranslation();

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const data = await getMeetings();
        setMeetings(data);
      } catch (err) {
        setError(t('error.fetchMeetings'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center">
        <h5>{
            t('meetingsPage.loading')
        }</h5>
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
