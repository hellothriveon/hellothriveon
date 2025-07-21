import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Mail, CheckCircle } from 'lucide-react';

// Declare global trackRedditConversion function
declare global {
  interface Window {
    trackRedditConversion?: (email: string, customData?: Record<string, any>) => void;
  }
}

export const EmailSignupForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !name) {
      toast({
        title: "Please fill in all fields",
        description: "Both name and email are required to join our waiting list.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Store lead in Supabase
      const { data, error } = await supabase
        .from('leads')
        .insert([
          {
            email,
            name,
            source: 'early_access_signup'
          }
        ])
        .select();

      if (error) {
        throw error;
      }

      // Track Reddit conversion with email for advanced matching
      if (typeof window !== 'undefined' && window.trackRedditConversion) {
        window.trackRedditConversion(email, {
          source: 'early_access_signup',
          name: name
        });
      }

      // Send data to Zapier webhook for Google Sheets
      try {
        await fetch('https://hooks.zapier.com/hooks/catch/23865732/u2ps0dw/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            email: email,
            source: 'early_access_signup',
            timestamp: new Date().toISOString(),
            user_agent: navigator.userAgent
          }),
        });
      } catch (webhookError) {
        console.error('Webhook error (non-critical):', webhookError);
        // Don't fail the signup if webhook fails
      }

      setIsSubmitted(true);
      toast({
        title: "Welcome to ThriveOn!",
        description: "You're now on our early access list. We'll be in touch soon!",
      });
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-md mx-auto shadow-lg border-primary/20">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">You're In!</h3>
          <p className="text-muted-foreground">
            Welcome to the ThriveOn community. We'll send you exclusive updates as we build something amazing together.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div id="signup-form-container" className="max-w-md mx-auto">
      <Card className="shadow-xl border-primary/20">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Join the Early Access List</h3>
            <p className="text-muted-foreground">
              Be among the first 5,000 families to experience ThriveOn's AI-powered support system.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="text-lg py-3"
              />
            </div>
            
            <div>
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-lg py-3"
              />
            </div>
            
            <Button
              type="submit"
              variant="hero"
              className="w-full text-lg py-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Joining...' : 'Get Early Access'}
            </Button>
          </form>
          
          <p className="text-xs text-muted-foreground text-center mt-4">
            Free early access • Lifetime 30% discount • No spam, ever
          </p>
        </CardContent>
      </Card>
    </div>
  );
};