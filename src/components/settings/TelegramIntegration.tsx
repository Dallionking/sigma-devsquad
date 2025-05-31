
import { TelegramIntegrationContainer } from "./telegram/TelegramIntegrationContainer";

interface TelegramIntegrationProps {
  searchQuery?: string;
}

export const TelegramIntegration = ({ searchQuery = "" }: TelegramIntegrationProps) => {
  return <TelegramIntegrationContainer searchQuery={searchQuery} />;
};
