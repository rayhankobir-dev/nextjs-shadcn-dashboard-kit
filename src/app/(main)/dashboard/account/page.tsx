import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, CheckCircle2, XCircle } from "lucide-react";
import React from "react";

function AccountPage() {
  return (
    <section className="grid max-w-2xl gap-6">
      <h2 className="text-xl font-semibold">Personal information</h2>

      <div className="flex items-center gap-6">
        <Avatar className="h-20 w-20">
          <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="Avatar" />
          <AvatarFallback>FG</AvatarFallback>
        </Avatar>

        <div>
          <h3 className="text-xl font-medium">John Doe</h3>
          <Badge variant="default">Admin</Badge>
        </div>
      </div>

      <form className="mt-5 flex flex-col gap-10">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6 grid gap-2">
            <Label htmlFor="first-name">First name</Label>
            <Input id="first-name" placeholder="John" />
          </div>
          <div className="col-span-6 grid gap-2">
            <Label htmlFor="last-name">Last name</Label>
            <Input id="last-name" placeholder="Doe" />
          </div>
          <div className="col-span-6 grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="john.doe@example.com" />
          </div>
          <div className="col-span-6 grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="john.doe@example.com" />
          </div>
          <div className="col-span-6 grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="john.doe@example.com" />
          </div>
          <div className="col-span-6 grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="john.doe@example.com" />
          </div>

          <div className="col-span-4 grid gap-2">
            <Label htmlFor="countryCode">Country code</Label>
            <Input id="countryCode" placeholder="+1" />
          </div>

          <div className="col-span-8 grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" placeholder="+1 (123) 456-7890" />
          </div>

          <div className="col-span-12 grid gap-2">
            <Label required={false} htmlFor="address">
              Address
            </Label>
            <Textarea id="address" className="min-h-20" placeholder="1234 Main St" />
          </div>
        </div>

        <div className="flex items-center justify-start gap-4">
          <Button variant="outline">
            <XCircle />
            Cancel
          </Button>
          <Button>
            <CheckCircle2 /> Update Profile
          </Button>
        </div>
      </form>
    </section>
  );
}

export default AccountPage;
