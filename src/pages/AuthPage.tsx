
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Logo } from '@/components/branding/Logo';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Eye, EyeOff, CheckCircle, Mail } from 'lucide-react';

const AuthPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signIn, signUp, user, loading } = useAuth();
  
  // Separate form states for each tab
  const [signInForm, setSignInForm] = useState({
    email: '',
    password: '',
    showPassword: false,
    error: '',
    success: '',
    isLoading: false
  });

  const [signUpForm, setSignUpForm] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: '',
    showPassword: false,
    error: '',
    success: '',
    isLoading: false
  });

  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'login');

  // Redirect authenticated users to dashboard, but only if they just signed in
  useEffect(() => {
    if (!loading && user && (signInForm.error === '' || signInForm.success.includes('Successfully signed in'))) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate, signInForm.error, signInForm.success]);

  // Handle tab changes with proper state management
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    
    // Clear any existing errors/success messages when switching tabs
    if (newTab === 'login') {
      setSignInForm(prev => ({ ...prev, error: '', success: '' }));
    } else {
      setSignUpForm(prev => ({ ...prev, error: '', success: '' }));
    }
  };

  const updateSignInForm = (updates: Partial<typeof signInForm>) => {
    setSignInForm(prev => ({ ...prev, ...updates }));
  };

  const updateSignUpForm = (updates: Partial<typeof signUpForm>) => {
    setSignUpForm(prev => ({ ...prev, ...updates }));
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    updateSignInForm({ isLoading: true, error: '', success: '' });

    if (!signInForm.email || !signInForm.password) {
      updateSignInForm({ error: 'Please fill in all fields', isLoading: false });
      return;
    }

    const { error } = await signIn(signInForm.email, signInForm.password);
    
    if (error) {
      console.log('Sign in error details:', error);
      if (error.message.includes('Email not confirmed')) {
        updateSignInForm({ 
          error: 'Please check your email and click the confirmation link before signing in.',
          isLoading: false 
        });
      } else if (error.message.includes('Invalid login credentials')) {
        updateSignInForm({ 
          error: 'Invalid email or password. Please check your credentials.',
          isLoading: false 
        });
      } else {
        updateSignInForm({ error: error.message, isLoading: false });
      }
    } else {
      updateSignInForm({ success: 'Successfully signed in!', isLoading: false });
      // Navigation will happen automatically via useEffect
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    updateSignUpForm({ isLoading: true, error: '', success: '' });

    if (!signUpForm.email || !signUpForm.password || !signUpForm.fullName || !signUpForm.confirmPassword) {
      updateSignUpForm({ error: 'Please fill in all fields', isLoading: false });
      return;
    }

    if (signUpForm.password !== signUpForm.confirmPassword) {
      updateSignUpForm({ error: 'Passwords do not match', isLoading: false });
      return;
    }

    if (signUpForm.password.length < 6) {
      updateSignUpForm({ error: 'Password must be at least 6 characters long', isLoading: false });
      return;
    }

    const { error } = await signUp(signUpForm.email, signUpForm.password, signUpForm.fullName);
    
    if (error) {
      console.log('Sign up error details:', error);
      if (error.message.includes('User already registered')) {
        updateSignUpForm({ error: 'An account with this email already exists. Please sign in instead.', isLoading: false });
      } else {
        updateSignUpForm({ error: error.message, isLoading: false });
      }
    } else {
      updateSignUpForm({ 
        error: '', 
        success: 'Account created successfully! Please check your email for a confirmation link.',
        isLoading: false 
      });
      
      // Clear form and switch to login tab after successful signup
      setTimeout(() => {
        setSignUpForm({
          email: '',
          password: '',
          fullName: '',
          confirmPassword: '',
          showPassword: false,
          error: '',
          success: '',
          isLoading: false
        });
        setActiveTab('login');
      }, 3000);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-vibe-primary/5 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-vibe-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-vibe-primary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToHome}
              className="p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <Logo size="sm" variant="full" />
            <div className="w-10" /> {/* Spacer for centering */}
          </div>
          
          <div className="text-center">
            <CardTitle className="text-2xl font-bold">Welcome to Vibe DevSquad</CardTitle>
            <CardDescription>
              Sign in to access your AI-powered development workspace
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" className="transition-all duration-200">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="transition-all duration-200">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-6 space-y-1">
              <div className="transition-all duration-300 ease-in-out">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signInForm.email}
                      onChange={(e) => updateSignInForm({ email: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="signin-password"
                        type={signInForm.showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={signInForm.password}
                        onChange={(e) => updateSignInForm({ password: e.target.value })}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => updateSignInForm({ showPassword: !signInForm.showPassword })}
                      >
                        {signInForm.showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  {signInForm.error && (
                    <Alert variant="destructive" className="transition-all duration-200">
                      <AlertDescription>{signInForm.error}</AlertDescription>
                    </Alert>
                  )}

                  {signInForm.success && (
                    <Alert className="transition-all duration-200">
                      <CheckCircle className="w-4 h-4" />
                      <AlertDescription>{signInForm.success}</AlertDescription>
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-vibe-primary hover:bg-vibe-primary/90 transition-all duration-200"
                    disabled={signInForm.isLoading}
                  >
                    {signInForm.isLoading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </form>
              </div>
            </TabsContent>

            <TabsContent value="signup" className="mt-6 space-y-1">
              <div className="transition-all duration-300 ease-in-out">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-fullName">Full Name</Label>
                    <Input
                      id="signup-fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={signUpForm.fullName}
                      onChange={(e) => updateSignUpForm({ fullName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signUpForm.email}
                      onChange={(e) => updateSignUpForm({ email: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={signUpForm.showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={signUpForm.password}
                        onChange={(e) => updateSignUpForm({ password: e.target.value })}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => updateSignUpForm({ showPassword: !signUpForm.showPassword })}
                      >
                        {signUpForm.showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirmPassword">Confirm Password</Label>
                    <Input
                      id="signup-confirmPassword"
                      type={signUpForm.showPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={signUpForm.confirmPassword}
                      onChange={(e) => updateSignUpForm({ confirmPassword: e.target.value })}
                      required
                    />
                  </div>

                  {signUpForm.error && (
                    <Alert variant="destructive" className="transition-all duration-200">
                      <AlertDescription>{signUpForm.error}</AlertDescription>
                    </Alert>
                  )}

                  {signUpForm.success && (
                    <Alert className="transition-all duration-200">
                      <Mail className="w-4 h-4" />
                      <AlertDescription>{signUpForm.success}</AlertDescription>
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-vibe-primary hover:bg-vibe-primary/90 transition-all duration-200"
                    disabled={signUpForm.isLoading}
                  >
                    {signUpForm.isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
