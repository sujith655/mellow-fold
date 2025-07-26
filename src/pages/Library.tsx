import { useState } from 'react';
import { Search, Heart, Calendar, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FilterTabs } from '@/components/FilterTabs';
import { ContentCard } from '@/components/ContentCard';

// Extended mock data for library view
const libraryContent = [
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
    isFavorite: true,
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
  {
    id: '5',
    type: 'note' as const,
    title: 'Meeting Notes',
    content: 'Project timeline discussion. Need to finalize design by next week.',
    tags: ['work', 'meetings'],
    createdAt: '2024-01-11',
    isFavorite: false,
  },
  {
    id: '6',
    type: 'image' as const,
    title: 'Weekend Adventures',
    preview: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
    tags: ['adventure', 'weekend'],
    createdAt: '2024-01-10',
    isFavorite: true,
  },
];

const Library = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'images' | 'videos' | 'notes'>('all');
  const [viewMode, setViewMode] = useState<'all' | 'favorites'>('all');
  const [content, setContent] = useState(libraryContent);

  const filteredContent = content.filter((item) => {
    const matchesFilter = activeFilter === 'all' || 
      (activeFilter === 'images' && item.type === 'image') ||
      (activeFilter === 'videos' && item.type === 'video') ||
      (activeFilter === 'notes' && item.type === 'note');
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesViewMode = viewMode === 'all' || (viewMode === 'favorites' && item.isFavorite);
    return matchesFilter && matchesSearch && matchesViewMode;
  });

  const handleToggleFavorite = (id: string) => {
    setContent(prev => 
      prev.map(item => 
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const favoriteCount = content.filter(item => item.isFavorite).length;

  return (
    <div className="min-h-screen bg-gradient-soft pb-20 pt-6">
      <div className="px-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Library</h1>
          <p className="text-muted-foreground">
            All your memories in one place
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-card p-4 rounded-2xl shadow-card border border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-memory-blue-light/50 rounded-xl">
                <FolderOpen size={20} className="text-memory-blue" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{content.length}</p>
                <p className="text-sm text-muted-foreground">Total Items</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-card p-4 rounded-2xl shadow-card border border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-xl">
                <Heart size={20} className="text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{favoriteCount}</p>
                <p className="text-sm text-muted-foreground">Favorites</p>
              </div>
            </div>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex gap-2 mb-4">
          <Button
            variant={viewMode === 'all' ? 'default' : 'soft'}
            size="sm"
            onClick={() => setViewMode('all')}
            className="flex-1"
          >
            All Items
          </Button>
          <Button
            variant={viewMode === 'favorites' ? 'default' : 'soft'}
            size="sm"
            onClick={() => setViewMode('favorites')}
            className="flex-1"
          >
            <Heart size={16} />
            Favorites
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            placeholder="Search your library..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 bg-card/95 backdrop-blur-sm border-border/50 rounded-2xl h-12 shadow-card"
          />
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </div>

        {/* Content Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              {viewMode === 'favorites' ? 'Favorite Memories' : 'All Memories'}
            </h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar size={16} />
              <span>{filteredContent.length} items</span>
            </div>
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
                {viewMode === 'favorites' ? (
                  <Heart size={32} className="text-muted-foreground" />
                ) : (
                  <Search size={32} className="text-muted-foreground" />
                )}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {viewMode === 'favorites' ? 'No favorites yet' : 'No memories found'}
              </h3>
              <p className="text-muted-foreground">
                {viewMode === 'favorites' 
                  ? 'Start adding memories to your favorites' 
                  : 'Try adjusting your search or filter'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Library;