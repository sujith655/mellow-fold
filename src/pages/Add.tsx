import { useState } from 'react';
import { Camera, Video, FileText, Upload, Tag, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

type ContentType = 'image' | 'video' | 'note' | null;

const Add = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState<ContentType>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const contentTypes = [
    {
      type: 'image' as ContentType,
      title: 'Image',
      description: 'Add photos and screenshots',
      icon: Camera,
      color: 'from-green-100 to-green-200',
      iconColor: 'text-green-600',
    },
    {
      type: 'video' as ContentType,
      title: 'Video',
      description: 'Save video memories',
      icon: Video,
      color: 'from-purple-100 to-purple-200',
      iconColor: 'text-purple-600',
    },
    {
      type: 'note' as ContentType,
      title: 'Note',
      description: 'Write thoughts and ideas',
      icon: FileText,
      color: 'from-blue-100 to-blue-200',
      iconColor: 'text-blue-600',
    },
  ];

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (!title) {
        setTitle(selectedFile.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const handleSave = () => {
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please add a title for your memory",
        variant: "destructive",
      });
      return;
    }

    if (selectedType !== 'note' && !file) {
      toast({
        title: "File required",
        description: `Please select a ${selectedType} file`,
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would upload the file and save to database
    toast({
      title: "Memory saved!",
      description: "Your memory has been added to MemoryNest",
    });

    navigate('/');
  };

  const resetForm = () => {
    setSelectedType(null);
    setTitle('');
    setContent('');
    setTags([]);
    setNewTag('');
    setFile(null);
  };

  return (
    <div className="min-h-screen bg-gradient-soft pb-20 pt-6">
      <div className="px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Add Memory</h1>
            <p className="text-muted-foreground">Preserve your special moments</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="rounded-full"
          >
            <X size={20} />
          </Button>
        </div>

        {!selectedType ? (
          /* Content Type Selection */
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              What would you like to add?
            </h2>
            {contentTypes.map(({ type, title, description, icon: Icon, color, iconColor }) => (
              <Card
                key={type}
                className="p-6 cursor-pointer hover:shadow-float transition-all duration-300 hover:scale-105 border-border/50 bg-gradient-card"
                onClick={() => setSelectedType(type)}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${color}`}>
                    <Icon size={24} className={iconColor} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          /* Content Form */
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground capitalize">
                Add {selectedType}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetForm}
                className="text-muted-foreground"
              >
                Change Type
              </Button>
            </div>

            {/* File Upload for Images/Videos */}
            {selectedType !== 'note' && (
              <Card className="p-6 border-dashed border-2 border-border/50 bg-gradient-card">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Upload {selectedType}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Click to select or drag and drop
                  </p>
                  <input
                    type="file"
                    accept={selectedType === 'image' ? 'image/*' : 'video/*'}
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <Button asChild variant="soft">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      Choose File
                    </label>
                  </Button>
                  {file && (
                    <p className="text-sm text-memory-blue mt-2">
                      Selected: {file.name}
                    </p>
                  )}
                </div>
              </Card>
            )}

            {/* Title Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Title *</label>
              <Input
                placeholder="Give your memory a title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-12 rounded-2xl bg-card border-border/50"
              />
            </div>

            {/* Content Input for Notes */}
            {selectedType === 'note' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Content</label>
                <Textarea
                  placeholder="Write your thoughts, ideas, or notes..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-32 rounded-2xl bg-card border-border/50 resize-none"
                />
              </div>
            )}

            {/* Tags Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Tags</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  className="flex-1 h-12 rounded-2xl bg-card border-border/50"
                />
                <Button onClick={handleAddTag} variant="soft" size="icon">
                  <Tag size={20} />
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-memory-blue-light/50 text-memory-blue text-sm rounded-full"
                    >
                      #{tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-destructive"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={resetForm}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="flex-1"
              >
                Save Memory
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Add;