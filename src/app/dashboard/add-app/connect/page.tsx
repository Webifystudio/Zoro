
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Info, CheckCircle, List, Send, KeyRound } from 'lucide-react';
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
        <div className="max-w-3xl mx-auto space-y-8">
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
                <AlertTitle>How to set up Instagram Integration</AlertTitle>
                <AlertDescription>
                    Integrating with the Instagram Graph API is a multi-step process that enables powerful automations. Here’s a detailed breakdown of the required steps.
                </AlertDescription>
            </Alert>
            
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        <div className="flex items-center gap-2">
                           <CheckCircle className="h-5 w-5 text-primary" />
                           Step 1: Create a Meta Developer App
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground space-y-2">
                       <p>First, you must register as a Meta Developer. Go to the <a href="https://developers.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">Meta for Developers</a> website, create an account, and set up a new application. This will give you an <strong>App ID</strong> and an <strong>App Secret</strong>, which are essential credentials for your application.</p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>
                        <div className="flex items-center gap-2">
                            <List className="h-5 w-5 text-primary" />
                            Step 2: Configure Permissions (Scopes)
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground space-y-2">
                        <p>In your Meta App Dashboard, add the "Instagram Graph API" product. You must then configure the specific permissions, or "scopes," your app needs. For automation, you might request scopes like `instagram_manage_comments`, `instagram_content_publish`, and `pages_show_list`. Each permission you request must be justified during the App Review process.</p>
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-3">
                    <AccordionTrigger>
                         <div className="flex items-center gap-2">
                            <Send className="h-5 w-5 text-primary" />
                            Step 3: Implement the OAuth 2.0 Flow
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground space-y-2">
                       <p>OAuth 2.0 is the secure protocol for user authorization. Here’s how it works:</p>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                            <li><strong>Initiate Connection:</strong> When a user clicks "Connect," you redirect them to an Instagram authorization URL, including your App ID and the scopes you need.</li>
                            <li><strong>User Approval:</strong> The user logs in and grants your app the requested permissions.</li>
                            <li><strong>Receive Code:</strong> Instagram redirects the user back to your app with a temporary authorization `code`.</li>
                            <li><strong>Exchange for Token:</strong> Your server-side code securely exchanges this `code` (along with your App ID and App Secret) for a short-lived access token.</li>
                        </ol>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>
                        <div className="flex items-center gap-2">
                            <KeyRound className="h-5 w-5 text-primary" />
                            Step 4: Get a Long-Lived Token & Make API Calls
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground space-y-2">
                        <p>The short-lived token from the previous step expires quickly. Your backend must exchange it for a long-lived token, which is valid for about 60 days. This long-lived token is what you need to store securely in your database.</p>
                        <p>With this token, your server can finally make authenticated requests to the Instagram Graph API to perform actions on behalf of the user, like posting content or replying to comments. Before your app can be used by the public, it must pass Meta's official <strong>App Review</strong>.</p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
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
