'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Home, Save } from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();
  const [apiEndpoint, setApiEndpoint] = useState('');

  useEffect(() => {
    const savedEndpoint = localStorage.getItem('articlesApiEndpoint');
    if (savedEndpoint) {
      setApiEndpoint(savedEndpoint);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('articlesApiEndpoint', apiEndpoint);
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-primary hover:text-primary/80"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
        
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Settings</h1>
          
          <div className="space-y-4">
            <div>
              <label 
                htmlFor="apiEndpoint" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Articles API Endpoint
              </label>
              <Input
                id="apiEndpoint"
                type="text"
                value={apiEndpoint}
                onChange={(e) => setApiEndpoint(e.target.value)}
                placeholder="/api/articles"
                className="w-full"
              />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Leave empty to use the default endpoint
              </p>
            </div>
            
            <Button 
              onClick={handleSave}
              className="w-full"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}