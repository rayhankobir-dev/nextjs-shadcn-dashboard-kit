import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, Settings, Shield } from "lucide-react";

function NotificationSettingsPage() {
  return (
    <section>
      <h2 className="text-xl font-semibold">Notifications</h2>
      <p>Customize your notification settings.</p>

      <div className="mt-4 flex flex-wrap gap-3">
        <Button variant="outline" size="sm">
          <Bell className="mr-2 h-4 w-4" />
          Enable All
        </Button>
        <Button variant="outline" size="sm">
          <Settings className="mr-2 h-4 w-4" />
          Reset to Default
        </Button>
        <Button variant="outline" size="sm">
          <Shield className="mr-2 h-4 w-4" />
          Security Only
        </Button>
      </div>

      <div className="mt-10 grid max-w-2xl gap-5">
        <div className="flex items-center justify-between">
          <div className="grid gap-1">
            <Label hideOption required={false} htmlFor="app-mentions" className="text-sm font-medium">
              Mentions & Replies
            </Label>
            <p className="text-sm text-gray-500">Show in notification center</p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <Label hideOption htmlFor="sms-critical" className="text-sm font-medium">
                Critical System Alerts
              </Label>
            </div>
            <p className="text-sm text-gray-500">Service outages and critical issues</p>
          </div>
          <Switch id="sms-critical" disabled />
        </div>

        <div className="flex items-center justify-between">
          <div className="grid gap-1">
            <Label hideOption htmlFor="app-mentions" className="text-sm font-medium">
              Mentions & Replies
            </Label>
            <p className="text-sm text-gray-500">Show in notification center</p>
          </div>
          <Switch />
        </div>
      </div>
    </section>
  );
}

export default NotificationSettingsPage;
