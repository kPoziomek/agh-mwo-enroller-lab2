import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { MeetingsPage } from '../components/meetings/MeetingsPage';
import { MeetingDetail } from '../components/meetingDetails/MeetingDetail.tsx';
import { NewMeetingForm } from '../components/meetings/NewMeetingForm';
import { CreateUserForm } from '../components/CreateUserForm';
import { HomeRoute } from './HomeRoute';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeRoute />} />
      <Route path="/register" element={<CreateUserForm />} />
      
      <Route path="/meetings" element={
        <ProtectedRoute>
          <MeetingsPage />
        </ProtectedRoute>
      } />
      
      <Route path="/meetings/:id" element={
        <ProtectedRoute>
          <MeetingDetail />
        </ProtectedRoute>
      } />
      
      <Route path="/new-meeting" element={
        <ProtectedRoute>
          <NewMeetingForm />
        </ProtectedRoute>
      } />
      
      <Route path="/login" element={<Navigate to="/" replace />} />
      <Route path="/welcome" element={<Navigate to="/meetings" replace />} />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};