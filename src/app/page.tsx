
"use client";

import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-6xl md:text-8xl font-bold text-primary mb-8">
        Zoro
      </h1>
      <h2 className="text-2xl mb-12">Welcome to your new favorite app.</h2>
      <div className="flex gap-4">
        {user ? (
          <Button onClick={() => router.push('/dashboard')}>Go to Dashboard</Button>
        ) : (
          <>
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/register">Sign Up</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
