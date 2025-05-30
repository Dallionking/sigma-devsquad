
import { ProviderCard } from "./ProviderCard";

interface Provider {
  name: string;
  status: string;
  models: string[];
  usage: number;
  limit: number;
  cost: string;
}

interface ProvidersTabProps {
  providers: Provider[];
  showApiKey: boolean;
  setShowApiKey: (show: boolean) => void;
}

export const ProvidersTab = ({ providers, showApiKey, setShowApiKey }: ProvidersTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {providers.map((provider) => (
        <ProviderCard
          key={provider.name}
          provider={provider}
          showApiKey={showApiKey}
          setShowApiKey={setShowApiKey}
        />
      ))}
    </div>
  );
};
