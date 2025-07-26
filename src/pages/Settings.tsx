import { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Download, 
  Trash2, 
  ChevronRight,
  Moon,
  Sun,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);

  const settingsGroups = [
    {
      title: 'Account',
      items: [
        {
          icon: User,
          title: 'Profile',
          description: 'Manage your account information',
          action: 'navigate',
        },
        {
          icon: Shield,
          title: 'Privacy & Security',
          description: 'Control your privacy settings',
          action: 'navigate',
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          icon: Bell,
          title: 'Notifications',
          description: 'Get notified about new memories',
          action: 'toggle',
          value: notifications,
          onChange: setNotifications,
        },
        {
          icon: darkMode ? Moon : Sun,
          title: 'Dark Mode',
          description: 'Switch between light and dark theme',
          action: 'toggle',
          value: darkMode,
          onChange: setDarkMode,
        },
        {
          icon: Download,
          title: 'Auto Backup',
          description: 'Automatically backup your memories',
          action: 'toggle',
          value: autoBackup,
          onChange: setAutoBackup,
        },
      ],
    },
    {
      title: 'Data',
      items: [
        {
          icon: Download,
          title: 'Export Data',
          description: 'Download all your memories',
          action: 'navigate',
        },
        {
          icon: Trash2,
          title: 'Clear Cache',
          description: 'Free up storage space',
          action: 'navigate',
          destructive: true,
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: HelpCircle,
          title: 'Help & FAQ',
          description: 'Get help and find answers',
          action: 'navigate',
        },
        {
          icon: ExternalLink,
          title: 'Contact Support',
          description: 'Reach out to our team',
          action: 'navigate',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-soft pb-20 pt-6">
      <div className="px-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Customize your MemoryNest experience
          </p>
        </div>

        {/* Profile Card */}
        <Card className="p-6 mb-6 bg-gradient-card border-border/50 shadow-card">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
              <User size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Welcome back!</h3>
              <p className="text-sm text-muted-foreground">
                You have {Math.floor(Math.random() * 50) + 10} memories saved
              </p>
            </div>
            <Button variant="soft" size="sm">
              Edit Profile
            </Button>
          </div>
        </Card>

        {/* Settings Groups */}
        <div className="space-y-6">
          {settingsGroups.map((group, groupIndex) => (
            <div key={group.title}>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                {group.title}
              </h2>
              <Card className="bg-gradient-card border-border/50 shadow-card overflow-hidden">
                {group.items.map((item, itemIndex) => (
                  <div key={item.title}>
                    <div className="flex items-center gap-4 p-4">
                      <div className={`p-2 rounded-xl ${
                        item.destructive 
                          ? 'bg-red-100 text-red-600' 
                          : 'bg-memory-blue-light/50 text-memory-blue'
                      }`}>
                        <item.icon size={20} />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-medium ${
                          item.destructive ? 'text-red-600' : 'text-foreground'
                        }`}>
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex items-center">
                        {item.action === 'toggle' && item.onChange && (
                          <Switch
                            checked={item.value}
                            onCheckedChange={item.onChange}
                          />
                        )}
                        {item.action === 'navigate' && (
                          <ChevronRight size={20} className="text-muted-foreground" />
                        )}
                      </div>
                    </div>
                    {itemIndex < group.items.length - 1 && (
                      <Separator className="mx-4" />
                    )}
                  </div>
                ))}
              </Card>
            </div>
          ))}
        </div>

        {/* App Info */}
        <Card className="mt-6 p-4 bg-gradient-card border-border/50 shadow-card">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">MemoryNest</p>
            <p className="text-xs text-muted-foreground">Version 1.0.0</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;