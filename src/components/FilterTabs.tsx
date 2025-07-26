import { Button } from '@/components/ui/button';
import { Image, Video, FileText, Grid3X3 } from 'lucide-react';

interface FilterTabsProps {
  activeFilter: 'all' | 'images' | 'videos' | 'notes';
  onFilterChange: (filter: 'all' | 'images' | 'videos' | 'notes') => void;
}

const filters = [
  { key: 'all', label: 'All', icon: Grid3X3 },
  { key: 'images', label: 'Images', icon: Image },
  { key: 'videos', label: 'Videos', icon: Video },
  { key: 'notes', label: 'Notes', icon: FileText },
] as const;

export const FilterTabs = ({ activeFilter, onFilterChange }: FilterTabsProps) => {
  return (
    <div className="flex gap-2 p-1 bg-memory-warm-gray rounded-2xl">
      {filters.map(({ key, label, icon: Icon }) => (
        <Button
          key={key}
          variant={activeFilter === key ? "default" : "ghost"}
          size="sm"
          onClick={() => onFilterChange(key)}
          className={`flex-1 gap-2 ${
            activeFilter === key 
              ? "bg-gradient-primary text-primary-foreground shadow-soft" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Icon size={16} />
          <span className="hidden sm:inline">{label}</span>
        </Button>
      ))}
    </div>
  );
};