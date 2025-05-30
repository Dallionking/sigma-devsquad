
import { OpenAIKeySettings } from "./api-keys/OpenAIKeySettings";
import { AnthropicKeySettings } from "./api-keys/AnthropicKeySettings";
import { GoogleKeySettings } from "./api-keys/GoogleKeySettings";

interface APIKeySettingsProps {
  searchQuery?: string;
}

export const APIKeySettings = ({ searchQuery = "" }: APIKeySettingsProps) => {
  return (
    <div className="space-y-6">
      <OpenAIKeySettings searchQuery={searchQuery} />
      <AnthropicKeySettings searchQuery={searchQuery} />
      <GoogleKeySettings searchQuery={searchQuery} />
    </div>
  );
};
