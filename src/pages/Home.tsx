import { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FilterTabs } from '@/components/FilterTabs';
import { ContentCard } from '@/components/ContentCard';
import { useNavigate } from 'react-router-dom';
import heroImage from '@/assets/hero-memory.jpg';

// Mock data for demonstration
const mockContent = [
  {
    id: '1',
    type: 'image' as const,
    title: 'Beautiful Sunset',
    preview: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    tags: ['nature', 'sunset'],
    createdAt: '2024-01-15',
    isFavorite: true,
  },
  {
    id: '2',
    type: 'note' as const,
    title: 'Travel Ideas',
    content: 'Places to visit this summer: Bali, Japan, Iceland. Research best times to visit and local experiences.',
    tags: ['travel', 'planning'],
    createdAt: '2024-01-14',
    isFavorite: false,
  },
  {
    id: '3',
    type: 'video' as const,
    title: 'Family Dinner',
    preview: '/placeholder-video.jpg',
    tags: ['family', 'memories'],
    createdAt: '2024-01-13',
    isFavorite: false,
  },
  {
    id: '4',
    type: 'image' as const,
    title: 'Recipe Screenshot',
    preview: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
    tags: ['cooking', 'recipes'],
    createdAt: '2024-01-12',
    isFavorite: false,
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'images' | 'videos' | 'notes'>('all');
  const [content, setContent] = useState(mockContent);

  const filteredContent = content.filter((item) => {
    const matchesFilter = activeFilter === 'all' || 
      (activeFilter === 'images' && item.type === 'image') ||
      (activeFilter === 'videos' && item.type === 'video') ||
      (activeFilter === 'notes' && item.type === 'note');
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const handleToggleFavorite = (id: string) => {
    setContent(prev => 
      prev.map(item => 
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-soft pb-20">
      {/* Header */}
      <div className="relative overflow-hidden">
        <img 
          src={heroImage} 
          alt="Memory Nest Hero" 
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20" />
        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
            MemoryNest
          </h1>
          <p className="text-white/90 drop-shadow-md">
            Your digital memories, beautifully organized
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-6 -mt-6 relative z-10">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            placeholder="Search your memories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 bg-card/95 backdrop-blur-sm border-border/50 rounded-2xl h-12 shadow-card"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-6 mb-6">
        <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </div>

      {/* Content Grid */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">
            Recent Memories
          </h2>
          <span className="text-sm text-muted-foreground">
            {filteredContent.length} items
          </span>
        </div>

        {filteredContent.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 animate-fade-in">
            {filteredContent.map((item) => (
              <ContentCard
                key={item.id}
                item={item}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-memory-warm-gray rounded-full flex items-center justify-center">
              <Search size={32} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No memories found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filter
            </p>
            <Button onClick={() => navigate('/add')} className="animate-scale-in">
              <Plus size={20} />
              Add Your First Memory
            </Button>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <Button
        variant="float"
        size="fab"
        className="fixed bottom-24 right-6 z-40"
        onClick={() => navigate('/add')}
      >
        <Plus size={24} />
      </Button>
    </div>
  );
};

export default Home;