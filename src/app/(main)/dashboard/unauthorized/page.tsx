import UnauthorizedAccess from "@/components/auth/unauthorized-access";

export default function page() {
  return (
    <div className="h-full w-full">
      <UnauthorizedAccess />
    </div>
  );
}
