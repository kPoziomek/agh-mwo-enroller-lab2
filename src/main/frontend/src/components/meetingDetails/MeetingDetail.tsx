import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../AuthContext.tsx';

import {
  getMeetingById,
} from '@/services/meetingService.ts';
import MeetingDetailsCard from "./MeetingDetailsCard.tsx";
import MeetingDetailsParticipantsList from "./MeetingDetailsParticipantsList.tsx";
import MeetingDetailsNavigation from "./MeetingDetailsNavigation.tsx";
import MeetingDetailsActions from "./MeetingDetailsActions.tsx";
import EmptyMeetingDetails from "./EmptyMeetingDetails.tsx";
import MeetingDetailsError from "./MeetingDetailsError.tsx";
import type {Meeting, Participant} from "@/types/types.ts";

export const MeetingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const meetingId = id ? parseInt(id) : null;

  useEffect(() => {
    if (!meetingId) {
      setError('Nieprawidłowe ID spotkania');
      setIsLoading(false);
      return;
    }

    const fetchMeetingData = async () => {
      try {
        const [meetingData] = await Promise.all([
          getMeetingById(meetingId),
        ]);
        
        setMeeting(meetingData);
      } catch (err) {
        setError('Nie udało się pobrać danych spotkania');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeetingData();
  }, [meetingId]);

  const isUserParticipant = participants.some(p => p.login === user?.login);
  const isOwner = meeting?.createdBy === user?.login;

  if (isLoading) {
    return (
      <div className="text-center">
        <h5>⏳ Ładowanie szczegółów spotkania...</h5>
      </div>
    );
  }

  if (error) {
    return (
    <MeetingDetailsError error={error}/>
    );
  }

  if (!meeting) {
    return (
        <EmptyMeetingDetails/>
    );
  }

  return (
    <div>
      <MeetingDetailsNavigation meetingId={meetingId} isOwner={isOwner}/>
      <MeetingDetailsCard meeting={meeting}  />
      <MeetingDetailsActions  setParticipants={setParticipants} meetingId={meetingId} isUserParticipant={isUserParticipant}/>
      <MeetingDetailsParticipantsList participants={participants} setParticipants={setParticipants} meetingId={meetingId} />
    </div>
  );
};