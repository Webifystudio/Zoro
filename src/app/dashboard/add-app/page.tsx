
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function AddAppPage() {
  const [appName, setAppName] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appName.trim()) {
      toast({
        variant: 'destructive',
        title: 'App Name Required',
        description: 'Please enter a name for your app.',
      });
      return;
    }
    setLoading(true);
    router.push(`/dashboard/add-app/connect?appName=${encodeURIComponent(appName)}`);
  };

  return (
    <div className="max-w-xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create a New App</CardTitle>
          <CardDescription>Give your new application a name to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="appName">App Name</Label>
              <Input
                id="appName"
                placeholder="e.g., My Instagram Bot"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Processing...' : 'Next'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
