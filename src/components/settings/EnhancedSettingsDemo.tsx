
import { useState } from "react";
import { ValidatedSettingItem } from "./ValidatedSettingItem";
import { AutoSaveSettingsSection } from "./AutoSaveSettingsSection";

export const EnhancedSettingsDemo = () => {
  const [demoData, setDemoData] = useState({
    email: "",
    url: "",
    description: "",
    notifications: true,
    theme: "system"
  });

  const handleSave = async (data: typeof demoData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Saving demo settings:", data);
  };

  const handleReset = () => {
    setDemoData({
      email: "",
      url: "",
      description: "",
      notifications: true,
      theme: "system"
    });
  };

  return (
    <AutoSaveSettingsSection
      title="Enhanced Settings Demo"
      description="Demonstration of the new interaction enhancements including validation, contextual help, and auto-save"
      data={demoData}
      onSave={handleSave}
      onReset={handleReset}
      category="Demo"
      autoSaveDelay={3000}
    >
      <ValidatedSettingItem
        id="demo-email"
        type="input"
        inputType="email"
        label="Email Address"
        description="Your primary email address for notifications"
        helpTitle="Email Validation"
        helpContent="We validate your email format in real-time. This email will be used for system notifications and account recovery."
        helpLinks={[
          { url: "https://example.com/email-help", label: "Email Setup Guide" }
        ]}
        value={demoData.email}
        onChange={(value) => setDemoData(prev => ({ ...prev, email: value }))}
        placeholder="user@example.com"
        validation={{
          required: true,
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          custom: (value) => {
            if (value.includes('+')) {
              return "Email aliases with '+' are not supported";
            }
            return null;
          }
        }}
      />

      <ValidatedSettingItem
        id="demo-url"
        type="input"
        inputType="url"
        label="Website URL"
        description="Your personal or company website"
        helpTitle="URL Format"
        helpContent="Enter a valid URL starting with http:// or https://. This will be displayed on your public profile."
        value={demoData.url}
        onChange={(value) => setDemoData(prev => ({ ...prev, url: value }))}
        placeholder="https://example.com"
        validation={{
          pattern: /^https?:\/\/.+/,
          custom: (value) => {
            if (value && !value.startsWith('https://')) {
              return "HTTPS URLs are recommended for security";
            }
            return null;
          }
        }}
      />

      <ValidatedSettingItem
        id="demo-description"
        type="textarea"
        label="Description"
        description="Brief description about yourself or your organization"
        helpTitle="Profile Description"
        helpContent="This description will be visible to other users. Keep it professional and concise."
        value={demoData.description}
        onChange={(value) => setDemoData(prev => ({ ...prev, description: value }))}
        placeholder="Tell us about yourself..."
        rows={4}
        validation={{
          maxLength: 500,
          minLength: 10
        }}
      />

      <ValidatedSettingItem
        id="demo-notifications"
        type="switch"
        label="Enable Notifications"
        description="Receive email notifications for important updates"
        helpTitle="Notification Settings"
        helpContent="When enabled, you'll receive notifications about system updates, security alerts, and other important information."
        checked={demoData.notifications}
        onCheckedChange={(checked) => setDemoData(prev => ({ ...prev, notifications: checked }))}
      />

      <ValidatedSettingItem
        id="demo-theme"
        type="select"
        label="Theme Preference"
        description="Choose your preferred theme"
        helpTitle="Theme Options"
        helpContent="System theme follows your device settings, while Light and Dark themes provide consistent appearance."
        value={demoData.theme}
        onValueChange={(value) => setDemoData(prev => ({ ...prev, theme: value }))}
        options={[
          { value: "system", label: "System" },
          { value: "light", label: "Light" },
          { value: "dark", label: "Dark" }
        ]}
      />
    </AutoSaveSettingsSection>
  );
};
