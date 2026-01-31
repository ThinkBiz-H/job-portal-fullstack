"use client";

import { useState } from "react";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: "JobPortal",
    siteEmail: "admin@jobportal.com",
    contactPhone: "+1 (555) 123-4567",
    maxJobsPerEmployer: 10,
    jobApprovalRequired: true,
    allowUserRegistration: true,
    maintenanceMode: false,
  });

  const [notifications, setNotifications] = useState({
    newJobNotification: true,
    newUserNotification: true,
    dailySummary: true,
    weeklyReport: true,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSettingChange = (key, value) => {
    setSettings({
      ...settings,
      [key]: value,
    });
  };

  const handleNotificationChange = (key, value) => {
    setNotifications({
      ...notifications,
      [key]: value,
    });
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);

    try {
      const token = localStorage.getItem("adminToken");
      await fetch("/api/admin/settings", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          general: settings,
          notifications: notifications,
        }),
      });

      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetToDefault = () => {
    if (confirm("Are you sure you want to reset all settings to default?")) {
      setSettings({
        siteName: "JobPortal",
        siteEmail: "admin@jobportal.com",
        contactPhone: "+1 (555) 123-4567",
        maxJobsPerEmployer: 10,
        jobApprovalRequired: true,
        allowUserRegistration: true,
        maintenanceMode: false,
      });

      setNotifications({
        newJobNotification: true,
        newUserNotification: true,
        dailySummary: true,
        weeklyReport: true,
      });
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Admin Settings</h2>
        <p className="text-gray-600">Configure your portal settings</p>
      </div>

      <div className="space-y-6">
        {/* General Settings */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <h3 className="text-xl font-bold mb-4">General Settings</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Site Name</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) =>
                  handleSettingChange("siteName", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Contact Email</label>
              <input
                type="email"
                value={settings.siteEmail}
                onChange={(e) =>
                  handleSettingChange("siteEmail", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Contact Phone</label>
              <input
                type="text"
                value={settings.contactPhone}
                onChange={(e) =>
                  handleSettingChange("contactPhone", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Max Jobs Per Employer
              </label>
              <input
                type="number"
                value={settings.maxJobsPerEmployer}
                onChange={(e) =>
                  handleSettingChange(
                    "maxJobsPerEmployer",
                    parseInt(e.target.value),
                  )
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                min="1"
                max="100"
              />
            </div>
          </div>
        </div>

        {/* Feature Toggles */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <h3 className="text-xl font-bold mb-4">Feature Toggles</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Job Approval Required</p>
                <p className="text-gray-500 text-sm">
                  New jobs require admin approval before going live
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.jobApprovalRequired}
                  onChange={(e) =>
                    handleSettingChange("jobApprovalRequired", e.target.checked)
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Allow User Registration</p>
                <p className="text-gray-500 text-sm">
                  Allow new users to register on the portal
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.allowUserRegistration}
                  onChange={(e) =>
                    handleSettingChange(
                      "allowUserRegistration",
                      e.target.checked,
                    )
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Maintenance Mode</p>
                <p className="text-gray-500 text-sm">
                  Put the site in maintenance mode (only admins can access)
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) =>
                    handleSettingChange("maintenanceMode", e.target.checked)
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <h3 className="text-xl font-bold mb-4">Notification Settings</h3>

          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => {
              const label = key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase());

              return (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{label}</p>
                    <p className="text-gray-500 text-sm">
                      Receive notifications for {key}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) =>
                        handleNotificationChange(key, e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleResetToDefault}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Reset to Default
            </button>
            <button
              onClick={handleSaveSettings}
              disabled={isSaving}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
