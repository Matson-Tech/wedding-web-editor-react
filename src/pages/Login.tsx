import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWedding } from '../contexts/WeddingContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';
import { supabase } from '../lib/supabase';

const Login = () => {
  const { setIsAuthenticated, isAuthenticated } = useWedding();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.session) {
        setIsAuthenticated(true);
        toast.success('Successfully logged in!');
        navigate('/');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  // const handleSignUp = async () => {
  //   setIsLoading(true);

  //   try {
  //     const { data, error } = await supabase.auth.signUp({
  //       email,
  //       password,
  //       options: {
  //         emailRedirectTo: `${window.location.origin}/auth/callback`,
  //       },
  //     });

  //     if (error) throw error;

  //     toast.success('Check your email for the confirmation link!');
  //   } catch (error: any) {
  //     console.error('Sign up error:', error);
  //     toast.error(error.message || 'Failed to sign up');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleResetPassword = async () => {
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback`,
      });

      if (error) throw error;

      toast.success('Check your email for the password reset link!');
    } catch (error: any) {
      console.error('Reset password error:', error);
      toast.error(error.message || 'Failed to send reset password email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={handleResetPassword}
                disabled={isLoading}
              >
                Forgot Password?
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
