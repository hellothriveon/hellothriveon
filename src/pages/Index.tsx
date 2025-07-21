import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HeroVideoPlayer } from '@/components/HeroVideoPlayer';
import { EmailSignupForm } from '@/components/EmailSignupForm';
import { ProgressBar } from '@/components/ProgressBar';
import { useNavigate } from 'react-router-dom';
import { Play, Shield, Heart, Archive } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <header className="text-center py-8 sm:py-12">
          <h1 className="embossed-text text-3xl sm:text-4xl md:text-5xl font-bold text-primary">ThriveOn</h1>
        </header>

        <main>
          <section id="hook" className="text-center mb-16 sm:mb-24">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold max-w-3xl mx-auto leading-tight mb-4 px-4" style={{ color: 'hsl(var(--dark-blue))' }}>
              You're caring for everyone. But who's checking on you?
            </h2>
            <p className="text-base sm:text-lg max-w-3xl mx-auto mb-4 px-4" style={{ color: 'hsl(var(--dark-blue))' }}>
              ThriveOn is your private AI support system—built for caregivers who feel invisible, exhausted, and alone. You're not broken. You're just burnt out. Let's reconnect you to yourself.
            </p>
            <p className="text-base sm:text-lg max-w-2xl mx-auto text-primary font-medium mb-8 px-4" style={{ fontFamily: '"Caveat", cursive' }}>
              Think of it like a team of tiny AI helpers — each tuned to your caregiving needs.
            </p>

            <div className="flex justify-center mb-8">
              <Button
                variant="hero"
                onClick={() => scrollToSection('signup-form-container')}
              >
                Get Early Access
              </Button>
            </div>

            {/* Video Player */}
            <div className="w-full mb-10">
              <HeroVideoPlayer />
            </div>

            {/* Signup Form */}
            <EmailSignupForm />
          </section>

          {/* Social Proof Section */}
          <section id="social-proof" className="py-12 sm:py-16 lg:py-24">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 sm:mb-12 px-4" style={{ color: 'hsl(var(--dark-blue))' }}>
              You're managing schedules, medications, and a thousand tiny details.
              <br className="hidden sm:inline" />
              But who is managing the relationship?
            </h3>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              <Card className="embossed border-l-4 border-l-primary shadow-lg">
                <CardContent className="p-6">
                  <p className="italic text-lg mb-4" style={{ color: 'hsl(var(--dark-blue))' }}>
                    "Caregiving became all about logistics. I feel like I'm more of a project manager than a spouse.
                    We've forgotten how to just talk."
                  </p>
                  <p className="font-bold text-right" style={{ color: 'hsl(var(--dark-blue))' }}>- Steve, Caregiver</p>
                </CardContent>
              </Card>
              <Card className="embossed border-l-4 border-l-primary shadow-lg">
                <CardContent className="p-6">
                  <p className="italic text-lg mb-4" style={{ color: 'hsl(var(--dark-blue))' }}>
                    "I wish I had a 'pause' button—a way to handle the chaos so I could have just one clear-headed moment with my mom each day."
                  </p>
                  <p className="font-bold text-right" style={{ color: 'hsl(var(--dark-blue))' }}>- Maria, Caregiver</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Solution Section */}
          <section id="solution" className="py-12 sm:py-16 lg:py-24">
            <Card className="embossed shadow-xl">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold px-4" style={{ color: 'hsl(var(--dark-blue))' }}>
                    How ThriveOn Gives You Back Your Time and Your Relationship
                  </h3>
                </div>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
                  <div className="text-center">
                    <div className="embossed w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="text-xl font-bold mb-2" style={{ color: 'hsl(var(--dark-blue))' }}>AI-Powered Stress Relief</h4>
                    <p style={{ color: 'hsl(var(--dark-blue))' }}>
                      Our Logistics Agent acts as your personal assistant, automating schedules and managing the overwhelming tasks of care so you can breathe again.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="embossed w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="text-xl font-bold mb-2" style={{ color: 'hsl(var(--dark-blue))' }}>Intelligent Connection Tools</h4>
                    <p style={{ color: 'hsl(var(--dark-blue))' }}>
                      Our Connection Agent uses your shared history to find the perfect, natural moments to spark the meaningful conversations you've been missing.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="embossed w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Archive className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="text-xl font-bold mb-2" style={{ color: 'hsl(var(--dark-blue))' }}>A Secure Memory Vault</h4>
                    <p style={{ color: 'hsl(var(--dark-blue))' }}>
                      Safely store and share your most precious memories. ThriveOn uses them to create new opportunities for connection, turning your past into your present.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Urgency Section */}
          <section id="urgency" className="py-12 sm:py-16 lg:py-24 text-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 px-4" style={{ color: 'hsl(var(--dark-blue))' }}>Join the Founding Members Circle</h3>
            <p className="text-base sm:text-lg max-w-2xl mx-auto mb-6 sm:mb-10 px-4" style={{ color: 'hsl(var(--dark-blue))' }}>
              Our mission is to help 1 million families thrive. We're starting with the first 5,000.
              Sign up by <strong>August 15th</strong> for free early access and a lifetime 30% discount when we launch.
            </p>

            <div className="mb-10">
              <ProgressBar />
            </div>

            <Button
              variant="cta"
              onClick={() => scrollToSection('signup-form-container')}
            >
              Claim My Spot
            </Button>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="py-12 sm:py-16 lg:py-24 border-t border-border">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 px-4" style={{ color: 'hsl(var(--dark-blue))' }}>Your Questions, Answered</h3>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1" className="border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-xl font-semibold hover:no-underline" style={{ color: 'hsl(var(--dark-blue))' }}>
                    Is this just another complicated app to manage?
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4" style={{ color: 'hsl(var(--dark-blue))' }}>
                    Quite the opposite. ThriveOn is designed to <strong>reduce</strong> your cognitive load. Our Logistics Agent automates the tedious tasks to free you from spreadsheets and reminders. The goal is to give you more time away from screens, so you can have more real-world moments with the person you love.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-xl font-semibold hover:no-underline" style={{ color: 'hsl(var(--dark-blue))' }}>
                    How do you protect our family's private data and memories?
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4" style={{ color: 'hsl(var(--dark-blue))' }}>
                    <p className="mb-3">
                      Your family's privacy is the foundation of our platform. We provide a private, secure space for your relationship to thrive, built on these principles:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>You Own Your Data:</strong> Your memories and personal information are yours, always. You can export or delete your data at any time.</li>
                      <li><strong>Bank-Level Encryption:</strong> All data is encrypted both when it's being transmitted and when it's stored on our servers.</li>
                      <li><strong>Privacy by Design:</strong> Our AI is built to work without "reading" your memories. It identifies themes and context in a privacy-preserving way to make suggestions.</li>
                      <li><strong>A Clear Business Model:</strong> We are a subscription service, not a data company. We will never sell or share your personal data with third parties.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-xl font-semibold hover:no-underline" style={{ color: 'hsl(var(--dark-blue))' }}>
                    How does this work for the person I'm caring for?
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4" style={{ color: 'hsl(var(--dark-blue))' }}>
                    The experience for your loved one is designed to be effortless. They don't need to be tech-savvy. The magic happens through the conversations *you* initiate, guided by ThriveOn's gentle prompts. The platform is a tool for you, the caregiver, to create moments of connection *with* them, not another screen for them to manage.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-xl font-semibold hover:no-underline" style={{ color: 'hsl(var(--dark-blue))' }}>
                    What kind of caregiving situations is this for?
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4" style={{ color: 'hsl(var(--dark-blue))' }}>
                    ThriveOn is for anyone supporting a loved one through a long-term health challenge—whether it's dementia, cancer, post-stroke recovery, or other chronic illnesses. If you feel the focus has shifted from the heart of your relationship to the tasks of care, ThriveOn is designed for you.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="text-center py-10 border-t border-border">
          <p style={{ color: 'hsl(var(--dark-blue))' }}>&copy; Built by Caregivers and Survivors @ThriveOn. All rights reserved.</p>
        </footer>

      </div>
    </div>
  );
};

export default Index;
