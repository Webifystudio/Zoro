
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { Suspense, useEffect } from 'react';

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
    </svg>
  );
}

function ConnectContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const appName = searchParams.get('appName');

    useEffect(() => {
        if (!appName) {
            router.push('/dashboard/add-app');
        }
    }, [appName, router]);


    if (!appName) {
        return null;
    }

    const handleConnect = () => {
        alert("This would start the Instagram OAuth flow. See the explanation below for how this works.");
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Connect to Instagram</CardTitle>
                    <CardDescription>Link an Instagram account to your app: <span className="font-semibold text-foreground">{appName}</span></CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={handleConnect} className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white hover:opacity-90 transition-opacity">
                        <InstagramIcon className="mr-2 h-5 w-5" />
                        Connect Instagram Account
                    </Button>
                </CardContent>
            </Card>

            <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>How does Instagram connection work?</AlertTitle>
                <AlertDescription className="space-y-2">
                    <p>
                        To connect your Instagram account for automation, websites like this use a protocol called <strong>OAuth 2.0</strong>. This is a secure standard that allows you to grant an application limited access to your account without sharing your password.
                    </p>
                    <ol className="list-decimal list-inside space-y-1 text-sm">
                        <li><strong>Initiate Connection:</strong> When you click "Connect", we would redirect you to Instagram's official login page.</li>
                        <li><strong>Grant Permissions:</strong> Instagram will ask you to approve the specific permissions our app needs (e.g., read posts, send messages). You are in full control of what is shared.</li>
                        <li><strong>Secure Token:</strong> After you approve, Instagram sends you back to our site with a secure, temporary access token.</li>
                        <li><strong>Automation Ready:</strong> Our app uses this token to perform actions on your behalf. Your password is never shared with us.</li>
                    </ol>
                    <p>
                        Implementing this requires registering our application with Meta (Facebook/Instagram), getting API credentials, and handling the server-side token exchange.
                    </p>
                </AlertDescription>
            </Alert>
        </div>
    );
}


export default function ConnectPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center">Loading...</div>}>
            <ConnectContent />
        </Suspense>
    );
}
