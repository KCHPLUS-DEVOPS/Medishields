import { createClient } from "@/lib/supabase/server";
import { getCurrentAdmin, can } from "@/lib/admin/auth";
import Card from "@/components/admin/Card";
import LockedNotice from "@/components/admin/LockedNotice";
import SendGridKeyField from "@/components/admin/SendGridKeyField";
import ToastTrigger from "@/components/admin/ToastTrigger";
import { updateSettings } from "./actions";

export const metadata = { title: "Settings" };

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ toast?: string; toastType?: string }>;
}) {
  const admin = await getCurrentAdmin();
  if (!can(admin, "settings")) return <LockedNotice resource="Settings" />;

  const { toast, toastType } = await searchParams;
  const supabase = await createClient();
  const { data: settings } = await supabase.from("site_settings").select("*").single();

  async function save(formData: FormData) {
    "use server";
    const { redirect } = await import("next/navigation");
    let errorMessage: string | null = null;
    try {
      await updateSettings(formData);
    } catch (err) {
      errorMessage = err instanceof Error ? err.message : "Save failed";
    }
    if (errorMessage) {
      redirect(`/admin/settings?toast=${encodeURIComponent(errorMessage)}&toastType=error`);
    }
    redirect("/admin/settings?toast=Settings+saved");
  }

  return (
    <div className="max-w-2xl">
      <ToastTrigger message={toast} type={toastType === "error" ? "error" : "success"} />
      <h1 className="font-display text-2xl font-medium text-ink">Settings</h1>
      <p className="mt-1 text-sm text-ink/55">
        SendGrid connection and business details used across the site.
      </p>

      <Card className="mt-6">
        <form action={save} className="space-y-5">
          <SendGridKeyField currentKey={settings?.sendgrid_api_key ?? null} />

          <div>
            <label htmlFor="business_phone" className="mb-1.5 block text-sm font-medium text-ink">
              Business phone
            </label>
            <input
              id="business_phone"
              name="business_phone"
              defaultValue={settings?.business_phone || ""}
              placeholder="(786) 767-6696"
              className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
            />
          </div>

          <div>
            <label htmlFor="business_address" className="mb-1.5 block text-sm font-medium text-ink">
              Business address
            </label>
            <textarea
              id="business_address"
              name="business_address"
              rows={2}
              defaultValue={settings?.business_address || ""}
              placeholder="261 N University Dr, Ste 500, Plantation, FL 33324"
              className="w-full resize-none rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
            />
          </div>

          <div className="border-t border-ink/10 pt-5">
            <p className="mb-3 text-sm font-medium text-ink">Social links</p>
            <div className="space-y-3">
              <input
                name="social_facebook"
                defaultValue={settings?.social_links?.facebook || ""}
                placeholder="https://facebook.com/medishields"
                className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
              />
              <input
                name="social_instagram"
                defaultValue={settings?.social_links?.instagram || ""}
                placeholder="https://instagram.com/medishields"
                className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
              />
              <input
                name="social_linkedin"
                defaultValue={settings?.social_links?.linkedin || ""}
                placeholder="https://linkedin.com/company/medishields"
                className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
              />
            </div>
            <p className="mt-1.5 text-xs text-ink/45">
              Blank ones stay hidden from the header icons and site schema.
            </p>
          </div>

          <div className="border-t border-ink/10 pt-5">
            <p className="mb-3 text-sm font-medium text-ink">SEO defaults</p>
            <div className="space-y-3">
              <div>
                <label htmlFor="seo_meta_title" className="mb-1.5 block text-xs font-medium text-ink/60">
                  Default meta title
                </label>
                <input
                  id="seo_meta_title"
                  name="seo_meta_title"
                  defaultValue={settings?.seo_defaults?.meta_title || ""}
                  placeholder="MediShields: Revenue Cycle Management"
                  className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
                />
              </div>
              <div>
                <label
                  htmlFor="seo_meta_description"
                  className="mb-1.5 block text-xs font-medium text-ink/60"
                >
                  Default meta description
                </label>
                <textarea
                  id="seo_meta_description"
                  name="seo_meta_description"
                  rows={2}
                  defaultValue={settings?.seo_defaults?.meta_description || ""}
                  placeholder="HIPAA-compliant medical billing and revenue cycle management for US practices."
                  className="w-full resize-none rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
                />
              </div>
              <div>
                <label
                  htmlFor="seo_og_image_url"
                  className="mb-1.5 block text-xs font-medium text-ink/60"
                >
                  Default social share image
                </label>
                <input
                  id="seo_og_image_url"
                  name="seo_og_image_url"
                  defaultValue={settings?.seo_defaults?.og_image_url || ""}
                  placeholder="https://.../hero.webp"
                  className="w-full rounded-xl border border-ink/15 bg-offwhite px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal"
                />
              </div>
            </div>
            <p className="mt-1.5 text-xs text-ink/45">
              Used as the fallback whenever a page doesn&rsquo;t set its own title, description, or
              share image.
            </p>
          </div>

          <button
            type="submit"
            className="rounded-full bg-amber px-6 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-[#e08636]"
          >
            Save changes
          </button>
        </form>
      </Card>
    </div>
  );
}
