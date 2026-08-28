import React, { createContext, useContext, useState, useEffect } from 'react';

type Role = 'ADMIN' | 'VOLUNTEER' | 'SENIOR' | 'JUNIOR';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Initialisation à partir du localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('coab_token');
    const storedUser = localStorage.getItem('coab_user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('coab_token', newToken);
    localStorage.setItem('coab_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('coab_token');
    localStorage.removeItem('coab_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
