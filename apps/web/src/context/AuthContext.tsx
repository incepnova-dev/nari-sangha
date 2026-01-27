import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  signIn as signInService,
  signOut as signOutService,
  getCurrentUser,
  signUp as signUpService,
  getStoredTokens,
} from '../services';

type AuthUser = any; // Use shared types when available

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (params: { email: string; password: string }) => Promise<boolean>;
  signUp: (params: { email: string; password: string; fullName?: string; confirmPassword?: string }) => Promise<boolean>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const bootstrapSession = async () => {
    const tokens = getStoredTokens();
    if (!tokens.token) {
      setIsLoading(false);
      setUser(null);
      return;
    }
    const result = await getCurrentUser();
    if (result.success && result.data) {
      setUser(result.data.user || result.data);
    } else {
      setUser(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    bootstrapSession();
  }, []);

  const signIn = async (params: { email: string; password: string }) => {
    const result = await signInService(params);
    if (result.success && result.data) {
      setUser(result.data.user || result.data);
      return true;
    }
    return false;
  };

  const signUp = async (params: { email: string; password: string; fullName?: string; confirmPassword?: string }) => {
    const result = await signUpService(params);
    if (result.success && result.data) {
      setUser(result.data.user || result.data);
      return true;
    }
    return false;
  };

  const signOut = async () => {
    await signOutService();
    setUser(null);
  };

  const refreshSession = async () => {
    await bootstrapSession();
  };

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user,
      signIn,
      signUp,
      signOut,
      refreshSession,
    }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};
