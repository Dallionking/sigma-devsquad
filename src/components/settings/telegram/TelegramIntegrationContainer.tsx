
import { SettingsSection } from "../SettingsSection";
import { TelegramSettingsProvider } from "./TelegramSettingsProvider";
import { TelegramSettingsForm } from "./TelegramSettingsForm";
import { TelegramConfigurationStatus } from "./TelegramConfigurationStatus";
import { useTelegramSettingsActions } from "./TelegramSettingsActions";

interface TelegramIntegrationContainerProps {
  searchQuery?: string;
}

const TelegramIntegrationContent = ({ searchQuery = "" }: TelegramIntegrationContainerProps) => {
  const { handleSave, handleReset } = useTelegramSettingsActions();

  return (
    <SettingsSection
      title="Telegram Integration"
      description="Connect to Telegram for external notifications and messaging"
      onSave={handleSave}
      onReset={handleReset}
      searchQuery={searchQuery}
      headerElement={<TelegramConfigurationStatus />}
    >
      <TelegramSettingsForm />
    </SettingsSection>
  );
};

export const TelegramIntegrationContainer = (props: TelegramIntegrationContainerProps) => {
  return (
    <TelegramSettingsProvider>
      <TelegramIntegrationContent {...props} />
    </TelegramSettingsProvider>
  );
};
