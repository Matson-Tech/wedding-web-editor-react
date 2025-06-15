import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Sign out from Supabase
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        
        // Clear any local storage items
        localStorage.removeItem('jwt_token');
        
        // Show success message
        toast.success('Logged out successfully');
        
        // Force navigation to login page
        window.location.href = '/login';
      } catch (error) {
        console.error('Error logging out:', error);
        toast.error('Failed to log out');
        // Even if there's an error, try to redirect to login
        window.location.href = '/login';
      }
    };

    handleLogout();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Logging out...</h2>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    </div>
  );
};

export default Logout; 