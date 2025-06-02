
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProvidersTab } from '@/components/llm-integration/ProvidersTab';
import { ModelsTab } from '@/components/llm-integration/ModelsTab';
import { UsageTab } from '@/components/llm-integration/UsageTab';
import { TestingTab } from '@/components/llm-integration/TestingTab';

export const LLMIntegrationPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">LLM Integration</h1>
      <Tabs defaultValue="providers" className="space-y-6">
        <TabsList>
          <TabsTrigger value="providers">Providers</TabsTrigger>
          <TabsTrigger value="models">Models</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="providers">
          <ProvidersTab />
        </TabsContent>
        
        <TabsContent value="models">
          <ModelsTab />
        </TabsContent>
        
        <TabsContent value="usage">
          <UsageTab />
        </TabsContent>
        
        <TabsContent value="testing">
          <TestingTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};
