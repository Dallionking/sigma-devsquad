
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HelpCircle, Book, Video, ExternalLink, Search, Lightbulb, Play } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { VideoTutorialsSection } from './VideoTutorialsSection';

interface HelpArticle {
  id: string;
  title: string;
  description: string;
  category: 'getting-started' | 'agents' | 'teams' | 'planning' | 'advanced';
  type: 'article' | 'video' | 'tutorial';
  readTime?: string;
  url?: string;
}

const helpArticles: HelpArticle[] = [
  {
    id: 'first-steps',
    title: 'Getting Started with Vibe DevSquad',
    description: 'Learn the basics of setting up your first AI development team.',
    category: 'getting-started',
    type: 'tutorial',
    readTime: '5 min'
  },
  {
    id: 'creating-agents',
    title: 'Creating Your First AI Agent',
    description: 'Step-by-step guide to configuring specialized AI agents.',
    category: 'agents',
    type: 'article',
    readTime: '8 min'
  },
  {
    id: 'team-management',
    title: 'Managing Development Teams',
    description: 'Best practices for organizing agents into effective teams.',
    category: 'teams',
    type: 'article',
    readTime: '6 min'
  },
  {
    id: 'planning-agent-guide',
    title: 'Using the Planning Agent',
    description: 'How to leverage AI for project planning and task breakdown.',
    category: 'planning',
    type: 'video',
    readTime: '12 min'
  },
  {
    id: 'advanced-workflows',
    title: 'Advanced Workflow Automation',
    description: 'Creating complex automated workflows with multiple agents.',
    category: 'advanced',
    type: 'tutorial',
    readTime: '15 min'
  }
];

interface ContextualHelpProps {
  context?: string;
  className?: string;
}

export const ContextualHelp = ({ context, className }: ContextualHelpProps) => {
  const [showHelp, setShowHelp] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('articles');

  const filteredArticles = helpArticles.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (context && article.category === context)
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'tutorial': return Lightbulb;
      default: return Book;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'getting-started': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'agents': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'teams': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'planning': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowHelp(true)}
        className={className}
        title="Get help and documentation"
      >
        <HelpCircle className="w-4 h-4" />
      </Button>

      <Dialog open={showHelp} onOpenChange={setShowHelp}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <HelpCircle className="w-5 h-5" />
              <span>Help & Documentation</span>
            </DialogTitle>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="videos">Video Tutorials</TabsTrigger>
              <TabsTrigger value="quick-start">Quick Start</TabsTrigger>
            </TabsList>

            <TabsContent value="articles" className="space-y-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search help articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Articles */}
              <div className="space-y-4">
                <h3 className="font-semibold">
                  {searchQuery ? `Search Results (${filteredArticles.length})` : 'Popular Articles'}
                </h3>
                
                <div className="grid gap-4">
                  {filteredArticles.map((article) => {
                    const TypeIcon = getTypeIcon(article.type);
                    return (
                      <Card key={article.id} className="cursor-pointer hover:bg-accent/50 transition-colors">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mt-1">
                                <TypeIcon className="w-4 h-4 text-primary" />
                              </div>
                              <div className="flex-1">
                                <CardTitle className="text-base">{article.title}</CardTitle>
                                <CardDescription className="mt-1">{article.description}</CardDescription>
                              </div>
                            </div>
                            <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className={getCategoryColor(article.category)}>
                              {article.category.replace('-', ' ')}
                            </Badge>
                            {article.readTime && (
                              <span className="text-sm text-muted-foreground">{article.readTime} read</span>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="videos" className="space-y-6">
              <VideoTutorialsSection />
            </TabsContent>

            <TabsContent value="quick-start" className="space-y-6">
              {/* Quick Links */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                  <CardContent className="p-4 text-center">
                    <Lightbulb className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold text-sm">Quick Start</h3>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                  <CardContent className="p-4 text-center">
                    <Video className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold text-sm">Video Tutorials</h3>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                  <CardContent className="p-4 text-center">
                    <Book className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold text-sm">Documentation</h3>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                  <CardContent className="p-4 text-center">
                    <ExternalLink className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold text-sm">Community</h3>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Contact Support */}
          <Card className="bg-accent/30">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Need more help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Contact Support
                </Button>
                <Button variant="outline" size="sm">
                  Join Community
                </Button>
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
};
