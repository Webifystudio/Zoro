
'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { User as UserIcon } from 'lucide-react';

const IMGBB_API_KEY = '2bb2346a6a907388d8a3b0beac2bca86';

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [username, setUsername] = useState('zoro_master');
  const [profilePictureUrl, setProfilePictureUrl] = useState('https://placehold.co/100x100.png');
  const [backgroundBannerUrl, setBackgroundBannerUrl] = useState('https://placehold.co/400x150.png');

  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null);
  const [backgroundBanner, setBackgroundBanner] = useState<File | null>(null);
  const [backgroundBannerPreview, setBackgroundBannerPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, setter: (file: File | null) => void, previewSetter: (url: string | null) => void) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setter(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        previewSetter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        return result.data.url;
      }
      toast({ variant: 'destructive', title: 'Upload Failed', description: result.error.message });
      return null;
    } catch (error) {
      toast({ variant: 'destructive', title: 'Upload Error', description: 'An error occurred.' });
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    let newProfilePictureUrl = profilePictureUrl;
    if (profilePicture) {
        newProfilePictureUrl = await uploadImage(profilePicture) ?? profilePictureUrl;
    }

    let newBackgroundBannerUrl = backgroundBannerUrl;
    if (backgroundBanner) {
        newBackgroundBannerUrl = await uploadImage(backgroundBanner) ?? backgroundBannerUrl;
    }

    console.log('Profile updated:', {
        username,
        profilePictureUrl: newProfilePictureUrl,
        backgroundBannerUrl: newBackgroundBannerUrl,
    });

    toast({ title: 'Profile Updated!', description: 'Your profile has been saved.' });
    setProfilePictureUrl(newProfilePictureUrl);
    setBackgroundBannerUrl(newBackgroundBannerUrl);
    setProfilePicturePreview(null);
    setBackgroundBannerPreview(null);
    setProfilePicture(null);
    setBackgroundBanner(null);
    setIsUploading(false);
  };

  if (authLoading || !user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-muted-foreground">Manage your account settings and profile details.</p>
        </div>
        <Card>
            <CardHeader>
            <CardTitle>Edit Your Profile</CardTitle>
            <CardDescription>Update your public profile information.</CardDescription>
            </CardHeader>
            <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={user.email ?? ''} disabled />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required disabled={isUploading} />
                </div>
                <div className="space-y-2">
                    <Label>Profile Picture</Label>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={profilePicturePreview ?? profilePictureUrl} alt="Profile" data-ai-hint="profile avatar" />
                            <AvatarFallback><UserIcon /></AvatarFallback>
                        </Avatar>
                        <Input id="profilePicture" type="file" accept="image/*" onChange={(e) => handleFileChange(e, setProfilePicture, setProfilePicturePreview)} disabled={isUploading} className="file:text-foreground max-w-xs" />
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label>Background Banner</Label>
                    <div className="aspect-[16/6] w-full max-w-md rounded-md overflow-hidden border relative mb-2 bg-muted">
                        <Image src={backgroundBannerPreview ?? backgroundBannerUrl} alt="Banner" layout="fill" className="object-cover" data-ai-hint="background banner" />
                    </div>
                    <Input id="backgroundBanner" type="file" accept="image/*" onChange={(e) => handleFileChange(e, setBackgroundBanner, setBackgroundBannerPreview)} disabled={isUploading} className="file:text-foreground max-w-xs" />
                </div>
                <Button type="submit" className="w-full md:w-auto" disabled={isUploading}>
                    {isUploading ? 'Saving...' : 'Save Changes'}
                </Button>
            </form>
            </CardContent>
        </Card>
    </div>
  );
}
