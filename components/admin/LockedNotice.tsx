import { Lock } from "lucide-react";
import Card from "@/components/admin/Card";

export default function LockedNotice({ resource }: { resource: string }) {
  return (
    <Card className="flex flex-col items-center gap-3 py-16 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink/5 text-ink/40">
        <Lock size={18} />
      </span>
      <div>
        <p className="text-sm font-medium text-ink">You don&rsquo;t have access to {resource}</p>
        <p className="mt-1 text-sm text-ink/50">Ask the owner to grant this permission.</p>
      </div>
    </Card>
  );
}
