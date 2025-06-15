
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWedding } from '../contexts/WeddingContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';

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
      // Simple authentication - in production, this would be proper authentication
      if (email === 'duke@wedding.com' && password === 'forever2030') {
        // Simulate JWT token
        const mockToken = 'mock-jwt-token-' + Date.now();
        localStorage.setItem('jwt_token', mockToken);
        setIsAuthenticated(true);
        toast.success('Successfully logged in!');
        navigate('/');
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-rust-500 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-serif text-rust-800">
            Login to Edit Wedding Site
          </CardTitle>
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
                placeholder="duke@wedding.com"
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
                placeholder="forever2030"
                required
              />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          <p className="text-sm text-gray-600 mt-4 text-center">
            Demo credentials: duke@wedding.com / forever2030
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
