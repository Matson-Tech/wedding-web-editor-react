
import React, { useState } from 'react';
import { useWedding } from '../contexts/WeddingContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';

export const LoginModal: React.FC = () => {
  const { setIsAuthenticated } = useWedding();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
        setIsOpen(false);
        toast.success('Successfully logged in!');
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm hover:bg-white"
        >
          Login to Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login to Edit Content</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleLogin} className="space-y-4 py-4">
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
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </div>
        </form>
        <p className="text-sm text-gray-600 mt-4">
          Demo credentials: duke@wedding.com / forever2030
        </p>
      </DialogContent>
    </Dialog>
  );
};
