
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function CallbackContent() {
    const searchParams = useSearchParams();
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    if (error) {
        return (
            <Card className="w-full max-w-xl mx-auto shadow-lg border-destructive">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="h-6 w-6 text-destructive" />
                        <CardTitle className="text-destructive">Authentication Failed</CardTitle>
                    </div>
                    <CardDescription>An error occurred during the Instagram connection process.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="font-semibold">Error: <span className="font-normal">{error}</span></p>
                    <p className="font-semibold">Details: <span className="font-normal">{errorDescription}</span></p>
                    <Button asChild>
                        <Link href="/dashboard">Return to Dashboard</Link>
                    </Button>
                </CardContent>
            </Card>
        );
    }

    if (code) {
        return (
             <Card className="w-full max-w-2xl mx-auto shadow-lg">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <CheckCircle className="h-6 w-6 text-green-500" />
                        <CardTitle>Authorization Successful!</CardTitle>
                    </div>
                    <CardDescription>You've successfully authorized the application.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h3 className="font-semibold mb-2">Next Steps: Server-Side Token Exchange</h3>
                        <p className="text-muted-foreground mb-4">
                            This is the temporary authorization code returned by Instagram. It is valid for a short period. The next step is for your application's backend server to securely exchange this code for a user access token.
                        </p>
                        <div className="p-4 bg-muted rounded-md text-sm break-all">
                           <p className="font-semibold">Authorization Code:</p>
                           <code>{code}</code>
                        </div>
                    </div>
                    <div className="border-t pt-4">
                        <p className="text-sm text-muted-foreground">
                            The server would make a POST request to <code>https://api.instagram.com/oauth/access_token</code> with this code, your App ID, and your App Secret to receive the final access token. This token must be stored securely.
                        </p>
                    </div>
                    <Button asChild className="mt-4">
                        <Link href="/dashboard">Return to Dashboard</Link>
                    </Button>
                </CardContent>
            </Card>
        );
    }
    
    return (
        <Card className="w-full max-w-xl mx-auto shadow-lg">
             <CardHeader>
                <CardTitle>Waiting for Instagram...</CardTitle>
             </CardHeader>
             <CardContent>
                <p>No authorization code received. Please try connecting your app again.</p>
                 <Button asChild className="mt-4">
                    <Link href="/dashboard/add-app">Back to Add App</Link>
                </Button>
             </CardContent>
        </Card>
    );
}


export default function InstagramCallbackPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background p-4">
            <Suspense fallback={<div>Loading...</div>}>
                <CallbackContent />
            </Suspense>
        </div>
    );
}
