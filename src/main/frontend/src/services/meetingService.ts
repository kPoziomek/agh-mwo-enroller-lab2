import api from './api';
import type {Meeting} from "@/types/types.ts";

export const getMeetings = async (): Promise<Meeting[]> => {
  try {
    const response = await api.get('/api/meetings');
    return response.data;
  } catch (error) {
    console.error('Błąd podczas pobierania spotkań:', error);
    throw error;
  }
};

export const getMeetingById = async (id: number): Promise<Meeting> => {
  try {
    const response = await api.get(`/api/meetings/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Błąd podczas pobierania spotkania o ID ${id}:`, error);
    throw error;
  }
};

export const registerForMeeting = async (id: number): Promise<boolean> => {
  try {
    await api.post(`/api/meetings/${id}/participants`, {
      login: localStorage.getItem('login'),
    });
    return true;
  } catch (error) {
    console.error(`Błąd podczas zapisywania na spotkanie o ID ${id}:`, error);
    return false;
  }
};

export const deleteMeeting = async (meetingId: number): Promise<boolean> => {
  try {
    await api.delete('/api/meetings/' + meetingId);
    return true;
  } catch (error: any) {
    console.error(`Błąd podczas usuwania spotkania o ID ${meetingId}:`, error);
    throw error;
  }
}

export const createMeeting = async (meeting: Omit<Meeting, 'id'>): Promise<Meeting | null> => {
  try {
    const response = await api.post('/api/meetings', meeting);
    return response.data;
  } catch (error) {
    console.error('Błąd podczas tworzenia spotkania:', error);
    return null;
  }
};

export const getMeetingParticipants = async (meetingId: number) => {
  try {
    const response = await api.get(`/api/meetings/${meetingId}/participants`);
    return response.data;
  } catch (error) {
    console.error(`Błąd podczas pobierania uczestników spotkania ${meetingId}:`, error);
    throw error;
  }
};

export const removeParticipantFromMeeting = async (meetingId: number, login: string): Promise<boolean> => {
  try {
    await api.delete(`/api/meetings/${meetingId}/participants/${login}`);
    return true;
  } catch (error) {
    console.error(`Błąd podczas usuwania uczestnika ${login} ze spotkania ${meetingId}:`, error);
    return false;
  }
};
