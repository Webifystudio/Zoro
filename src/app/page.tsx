
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

export default function Splash() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // Wait until loading is false
    
    const timer = setTimeout(() => {
        if (user) {
            router.push('/dashboard');
        } else {
            router.push('/login');
        }
    }, 1500); // Shorter delay now

    return () => clearTimeout(timer);
  }, [user, loading, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-6xl md:text-8xl font-bold text-primary animate-pulse">
        Zoro
      </h1>
    </div>
  );
}
