
import { useState } from "react";
import { SettingsSection } from "./SettingsSection";
import { SettingItem } from "./SettingItem";

interface SecuritySettingsProps {
  searchQuery?: string;
}

export const SecuritySettings = ({ searchQuery = "" }: SecuritySettingsProps) => {
  const [apiKeyEncryption, setApiKeyEncryption] = useState(true);
  const [auditLogging, setAuditLogging] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("3600");
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [ipWhitelist, setIpWhitelist] = useState("");

  const handleSave = () => {
    console.log("Saving security settings:", {
      apiKeyEncryption,
      auditLogging,
      sessionTimeout,
      twoFactorAuth,
      ipWhitelist
    });
  };

  const handleReset = () => {
    setApiKeyEncryption(true);
    setAuditLogging(true);
    setSessionTimeout("3600");
    setTwoFactorAuth(false);
    setIpWhitelist("");
  };

  return (
    <SettingsSection
      title="Security Settings"
      description="Configure security and privacy options"
      onSave={handleSave}
      onReset={handleReset}
      searchQuery={searchQuery}
    >
      <SettingItem
        id="api-key-encryption"
        type="switch"
        label="API Key Encryption"
        description="Encrypt stored API keys"
        checked={apiKeyEncryption}
        onCheckedChange={setApiKeyEncryption}
      />

      <SettingItem
        id="audit-logging"
        type="switch"
        label="Audit Logging"
        description="Log all system activities"
        checked={auditLogging}
        onCheckedChange={setAuditLogging}
      />

      <SettingItem
        id="session-timeout"
        type="select"
        label="Session Timeout"
        description="Automatic logout after inactivity"
        value={sessionTimeout}
        onValueChange={setSessionTimeout}
        options={[
          { value: "1800", label: "30 minutes" },
          { value: "3600", label: "1 hour" },
          { value: "7200", label: "2 hours" },
          { value: "86400", label: "24 hours" }
        ]}
      />

      <SettingItem
        id="two-factor-auth"
        type="switch"
        label="Two-Factor Authentication"
        description="Enable 2FA for additional security"
        checked={twoFactorAuth}
        onCheckedChange={setTwoFactorAuth}
      />

      <SettingItem
        id="ip-whitelist"
        type="textarea"
        label="IP Whitelist"
        description="Comma-separated list of allowed IP addresses"
        value={ipWhitelist}
        onChange={setIpWhitelist}
        placeholder="192.168.1.1, 10.0.0.1"
        rows={3}
      />
    </SettingsSection>
  );
};
