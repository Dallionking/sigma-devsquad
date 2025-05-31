
import { DiscordIntegrationContainer } from "./discord/DiscordIntegrationContainer";

interface DiscordIntegrationProps {
  searchQuery?: string;
}

export const DiscordIntegration = ({ searchQuery = "" }: DiscordIntegrationProps) => {
  return <DiscordIntegrationContainer searchQuery={searchQuery} />;
};
