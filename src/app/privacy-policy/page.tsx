
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function PrivacyPolicyPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const handleAgree = () => {
    // Here you would typically mark the user's profile as having accepted the policy.
    console.log('User accepted privacy policy.');
    router.push('/');
  };
  
  if (authLoading || !user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Privacy Policy</CardTitle>
          <CardDescription>Please read and agree to our terms.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScrollArea className="h-72 w-full rounded-md border p-4">
            <h3 className="font-semibold mb-2">1. Introduction</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Welcome to Zoro. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.
            </p>
            <h3 className="font-semibold mb-2">2. Information We Collect</h3>
            <p className="text-sm text-muted-foreground mb-4">
              We collect personal information that you voluntarily provide to us when you register on the app, express an interest in obtaining information about us or our products and services, when you participate in activities on the app or otherwise when you contact us. The personal information that we collect depends on the context of your interactions with us and the app, the choices you make and the products and features you use. The personal information we collect may include the following: username, email address, profile picture and background banner.
            </p>
            <h3 className="font-semibold mb-2">3. How We Use Your Information</h3>
            <p className="text-sm text-muted-foreground mb-4">
              We use personal information collected via our app for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
            </p>
            <h3 className="font-semibold mb-2">4. Will Your Information Be Shared?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
            </p>
             <h3 className="font-semibold mb-2">5. Data Retention</h3>
            <p className="text-sm text-muted-foreground mb-4">
              We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements).
            </p>
          </ScrollArea>
          <Button onClick={handleAgree} className="w-full">
            I Agree and Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
