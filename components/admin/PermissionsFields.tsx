import { PERMISSION_RESOURCES } from "@/lib/admin/permissions";

export default function PermissionsFields({
  defaultPermissions,
}: {
  defaultPermissions?: Record<string, boolean>;
}) {
  return (
    <div>
      <p className="mb-2 block text-sm font-medium text-ink">Can write to</p>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {PERMISSION_RESOURCES.map((r) => (
          <label
            key={r.key}
            className="flex items-center gap-2 rounded-xl border border-ink/10 bg-offwhite px-3 py-2.5 text-sm text-ink"
          >
            <input
              type="checkbox"
              name={`perm_${r.key}`}
              defaultChecked={defaultPermissions?.[r.key] ?? false}
              className="h-4 w-4 rounded border-ink/25 accent-teal"
            />
            {r.label}
          </label>
        ))}
      </div>
    </div>
  );
}
