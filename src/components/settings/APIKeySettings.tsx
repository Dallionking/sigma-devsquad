
import { EnhancedAPIKeyManager } from "./api-keys/EnhancedAPIKeyManager";
import { OpenAIKeySettings } from "./api-keys/OpenAIKeySettings";
import { AnthropicKeySettings } from "./api-keys/AnthropicKeySettings";
import { GoogleKeySettings } from "./api-keys/GoogleKeySettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface APIKeySettingsProps {
  searchQuery?: string;
}

export const APIKeySettings = ({ searchQuery = "" }: APIKeySettingsProps) => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="enhanced" className="space-y-4">
        <TabsList>
          <TabsTrigger value="enhanced">Enhanced Manager</TabsTrigger>
          <TabsTrigger value="basic">Basic Setup</TabsTrigger>
        </TabsList>

        <TabsContent value="enhanced">
          <EnhancedAPIKeyManager />
        </TabsContent>

        <TabsContent value="basic" className="space-y-6">
          <OpenAIKeySettings searchQuery={searchQuery} />
          <AnthropicKeySettings searchQuery={searchQuery} />
          <GoogleKeySettings searchQuery={searchQuery} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
