
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusIcon, Search } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">An overview of your connected applications.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Connected Apps</CardTitle>
            <CardDescription>Number of apps you have linked.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">0</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Your Apps</h2>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search apps..." className="pl-10" />
          </div>
          <Link href="/dashboard/add-app" passHref>
            <Button size="icon" aria-label="Add new app">
              <PlusIcon />
            </Button>
          </Link>
        </div>
        <div className="border rounded-lg p-8 text-center text-muted-foreground">
          You haven't added any apps yet. Click the '+' button to get started.
        </div>
      </div>
    </div>
  );
}
