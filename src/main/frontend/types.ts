// src/types.ts
export interface User {
  login: string;
  password: string;
  // dodaj inne pola użytkownika według potrzeb
}

export interface Participant {
  login: string;
  // password nie jest potrzebne w frontend
}

export interface Meeting {
  id: number;
  title: string;
  date: string;
  description: string;
  createdBy?: string; // kto utworzył spotkanie
  participants?: Participant[]; // opcjonalne - czasem może nie być pobrane
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}
