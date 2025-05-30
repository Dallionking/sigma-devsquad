import { SettingsSection } from "./SettingsSection";
import { SettingItem } from "./SettingItem";
import { EnhancedSettingsDemo } from "./EnhancedSettingsDemo";

interface GeneralSettingsProps {
  searchQuery?: string;
}

export const GeneralSettings = ({ searchQuery = "" }: GeneralSettingsProps) => {
  return (
    <div className="space-y-6">
      <EnhancedSettingsDemo />
      
      <SettingsSection
        title="Application Settings"
        description="Configure general application behavior and preferences"
        searchQuery={searchQuery}
      >
        <SettingItem
          id="language"
          type="select"
          label="Language"
          description="Select your preferred language"
          value="en"
          onValueChange={() => {}}
          options={[
            { value: "en", label: "English" },
            { value: "es", label: "Spanish" },
            { value: "fr", label: "French" },
            { value: "de", label: "German" }
          ]}
        />

        <SettingItem
          id="timezone"
          type="select"
          label="Timezone"
          description="Your local timezone for displaying dates and times"
          value="UTC"
          onValueChange={() => {}}
          options={[
            { value: "UTC", label: "UTC" },
            { value: "EST", label: "Eastern Time" },
            { value: "PST", label: "Pacific Time" },
            { value: "GMT", label: "Greenwich Mean Time" }
          ]}
        />

        <SettingItem
          id="auto-update"
          type="switch"
          label="Automatic Updates"
          description="Automatically download and install updates"
          checked={true}
          onCheckedChange={() => {}}
        />
      </SettingsSection>
    </div>
  );
};
