import { useState } from 'react';
import { Heart, Share2, MoreVertical, Image, Video, FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ContentItem {
  id: string;
  type: 'image' | 'video' | 'note';
  title: string;
  preview?: string;
  content?: string;
  tags: string[];
  createdAt: string;
  isFavorite?: boolean;
}

interface ContentCardProps {
  item: ContentItem;
  onToggleFavorite?: (id: string) => void;
}

const typeIcons = {
  image: Image,
  video: Video,
  note: FileText,
};

const typeColors = {
  image: 'text-green-500',
  video: 'text-purple-500', 
  note: 'text-blue-500',
};

export const ContentCard = ({ item, onToggleFavorite }: ContentCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const TypeIcon = typeIcons[item.type];

  return (
    <Card className="group bg-gradient-card border-border/50 shadow-card hover:shadow-float transition-all duration-300 hover:scale-105 rounded-3xl overflow-hidden">
      {/* Content Preview */}
      <div className="aspect-square bg-memory-warm-gray relative overflow-hidden">
        {item.type === 'image' && item.preview && (
          <img
            src={item.preview}
            alt={item.title}
            className={`w-full h-full object-cover transition-all duration-500 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        )}
        
        {item.type === 'video' && (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-purple-100 to-purple-200">
            <Video size={32} className="text-purple-500" />
          </div>
        )}
        
        {item.type === 'note' && (
          <div className="p-4 h-full flex flex-col bg-gradient-to-br from-blue-50 to-blue-100">
            <FileText size={24} className="text-blue-500 mb-2" />
            <p className="text-sm text-muted-foreground line-clamp-4">
              {item.content || 'No content available'}
            </p>
          </div>
        )}

        {/* Type indicator */}
        <div className="absolute top-3 left-3">
          <div className={`p-2 rounded-full bg-white/90 backdrop-blur-sm ${typeColors[item.type]}`}>
            <TypeIcon size={14} />
          </div>
        </div>

        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/90 backdrop-blur-sm hover:bg-white rounded-full h-8 w-8"
            onClick={() => onToggleFavorite?.(item.id)}
          >
            <Heart 
              size={14} 
              className={item.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'} 
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/90 backdrop-blur-sm hover:bg-white rounded-full h-8 w-8"
          >
            <MoreVertical size={14} className="text-gray-600" />
          </Button>
        </div>
      </div>

      {/* Content Info */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-2 line-clamp-1">
          {item.title}
        </h3>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {item.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-memory-blue-light/50 text-memory-blue text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
          {item.tags.length > 2 && (
            <span className="text-xs text-muted-foreground">
              +{item.tags.length - 2} more
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{new Date(item.createdAt).toLocaleDateString()}</span>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Share2 size={12} />
          </Button>
        </div>
      </div>
    </Card>
  );
};