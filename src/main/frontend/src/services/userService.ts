import api from './api';

export const createUser = async (userData: { login: string; password: string }): Promise<boolean> => {
  try {
    console.log('Creating user:', userData.login);
    
    const response = await api.post('/api/participants', userData, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    console.log('User created successfully:', response.data);
    return true;
  } catch (error: any) {
    console.error('Error creating user:', error);
    
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    
    throw error;
  }
};

