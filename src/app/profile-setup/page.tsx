
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

const IMGBB_API_KEY = '2bb2346a6a907388d8a3b0beac2bca86';

export default function ProfileSetupPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [username, setUsername] = useState('');
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
      previewSetter(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    if (!file) return null;

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
      } else {
        toast({
          variant: 'destructive',
          title: 'Image Upload Failed',
          description: result.error.message,
        });
        return null;
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        variant: 'destructive',
        title: 'Image Upload Error',
        description: 'An unexpected error occurred during upload.',
      });
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !profilePicture || !backgroundBanner) {
      toast({
        variant: 'destructive',
        title: 'Missing Fields',
        description: 'Please fill out all fields.',
      });
      return;
    }

    setIsUploading(true);

    const profilePictureUrl = await uploadImage(profilePicture);
    const backgroundBannerUrl = await uploadImage(backgroundBanner);

    if (profilePictureUrl && backgroundBannerUrl) {
      // Here you would typically save the username and URLs to your database
      // associated with the user.uid.
      console.log('Profile setup complete:', {
        username,
        profilePictureUrl,
        backgroundBannerUrl,
      });

      toast({
        title: 'Profile Almost Done!',
        description: 'Your profile details are saved. One last step!',
      });
      router.push('/privacy-policy');
    } else {
      toast({
        variant: 'destructive',
        title: 'Setup Failed',
        description: 'Could not complete profile setup. Please try again.',
      });
    }

    setIsUploading(false);
  };

  if (authLoading || !user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Set Up Your Profile</CardTitle>
          <CardDescription>Let's get your profile ready.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g., zoro_master"
                required
                disabled={isUploading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profilePicture">Profile Picture</Label>
              <Input
                id="profilePicture"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setProfilePicture, setProfilePicturePreview)}
                required
                disabled={isUploading}
                className="file:text-foreground"
              />
              {profilePicturePreview && (
                <div className="mt-4">
                  <Image src={profilePicturePreview} alt="Profile preview" width={100} height={100} className="rounded-full aspect-square object-cover" />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="backgroundBanner">Background Banner</Label>
              <Input
                id="backgroundBanner"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setBackgroundBanner, setBackgroundBannerPreview)}
                required
                disabled={isUploading}
                className="file:text-foreground"
              />
              {backgroundBannerPreview && (
                <div className="mt-4">
                  <Image src={backgroundBannerPreview} alt="Banner preview" width={400} height={150} className="rounded-md aspect-video object-cover w-full" />
                </div>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isUploading}>
              {isUploading ? 'Saving...' : 'Next'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
