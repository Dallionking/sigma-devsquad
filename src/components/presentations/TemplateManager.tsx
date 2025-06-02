
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Star, 
  Download, 
  Share2, 
  Edit,
  Trash2,
  Crown,
  Users,
  Zap
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  slides: number;
  downloads: number;
  rating: number;
  isPremium: boolean;
  isCustom: boolean;
  thumbnail: string;
  tags: string[];
}

const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Startup Pitch Deck',
    description: 'Perfect for seed and Series A funding presentations',
    category: 'Business',
    slides: 12,
    downloads: 1250,
    rating: 4.8,
    isPremium: false,
    isCustom: false,
    thumbnail: '/api/placeholder/300/200',
    tags: ['startup', 'funding', 'business']
  },
  {
    id: '2',
    name: 'Product Launch',
    description: 'Showcase your new product with style',
    category: 'Marketing',
    slides: 15,
    downloads: 890,
    rating: 4.6,
    isPremium: true,
    isCustom: false,
    thumbnail: '/api/placeholder/300/200',
    tags: ['product', 'launch', 'marketing']
  },
  {
    id: '3',
    name: 'Company Culture',
    description: 'Present your team and company values',
    category: 'HR',
    slides: 10,
    downloads: 654,
    rating: 4.5,
    isPremium: false,
    isCustom: true,
    thumbnail: '/api/placeholder/300/200',
    tags: ['culture', 'team', 'values']
  }
];

export const TemplateManager = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCustomOnly, setShowCustomOnly] = useState(false);

  const categories = ['All', 'Business', 'Marketing', 'HR', 'Education', 'Sales'];

  const filteredTemplates = mockTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    const matchesCustomFilter = !showCustomOnly || template.isCustom;
    
    return matchesSearch && matchesCategory && matchesCustomFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Template Manager</h2>
          <p className="text-muted-foreground">Browse and manage your presentation templates</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Template
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        
        <Button
          variant={showCustomOnly ? 'default' : 'outline'}
          size="sm"
          onClick={() => setShowCustomOnly(!showCustomOnly)}
        >
          <Users className="w-4 h-4 mr-2" />
          My Templates
        </Button>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="group hover:shadow-lg transition-all duration-200">
            <CardHeader className="p-0">
              <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-t-lg overflow-hidden">
                {/* Premium Badge */}
                {template.isPremium && (
                  <Badge className="absolute top-2 left-2 bg-yellow-500 text-yellow-900">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                )}
                
                {/* Custom Badge */}
                {template.isCustom && (
                  <Badge variant="secondary" className="absolute top-2 right-2">
                    <Users className="w-3 h-3 mr-1" />
                    Custom
                  </Badge>
                )}
                
                {/* Preview Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-2">
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4 mr-1" />
                    Use Template
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-4 space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base line-clamp-1">{template.name}</CardTitle>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-muted-foreground">{template.rating}</span>
                  </div>
                </div>
                
                <CardDescription className="text-sm line-clamp-2">
                  {template.description}
                </CardDescription>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {template.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {template.tags.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{template.tags.length - 2}
                  </Badge>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{template.slides} slides</span>
                <div className="flex items-center space-x-1">
                  <Download className="w-3 h-3" />
                  <span>{template.downloads.toLocaleString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-2">
                <Button size="sm" className="flex-1">
                  <Zap className="w-4 h-4 mr-1" />
                  Use Template
                </Button>
                
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4" />
                </Button>
                
                {template.isCustom && (
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            No templates found matching your criteria
          </div>
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Create Custom Template
          </Button>
        </div>
      )}
    </div>
  );
};
