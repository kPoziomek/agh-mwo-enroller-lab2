
export interface User {
    id: string;
    login: string;
    email: string;
    roles: string[];
}
export interface User {
    login: string;
    password: string;

}

export interface Participant {
    login: string;

}

export interface Meeting {
    id: number;
    title: string;
    date: string;
    description: string;
    createdBy?: string;
    participants?: Participant[];
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
