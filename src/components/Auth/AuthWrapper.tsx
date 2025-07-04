import React, { useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import LoginForm from './LoginForm';
import SignupForm from './SignUpForm';
import LoadingSpinner from '../LoadingSpinner';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { user, loading } = useAuthContext();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return isLoginMode ? (
      <LoginForm onToggleMode={() => setIsLoginMode(false)} />
    ) : (
      <SignupForm onToggleMode={() => setIsLoginMode(true)} />
    );
  }

  return <>{children}</>;
};

export default AuthWrapper;