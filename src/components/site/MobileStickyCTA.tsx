import { Link } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";

export function MobileStickyCTA() {
  const { t } = useT();
  return (
    <div className="lg:hidden fixed bottom-4 inset-x-4 z-40">
      <Link
        to="/contact"
        className="block w-full text-center px-6 py-4 rounded-full bg-primary text-primary-foreground text-sm uppercase tracking-[0.18em] font-medium shadow-lg shadow-primary/20"
      >
        {t("Book a Consultation", "預約諮詢")}
      </Link>
    </div>
  );
}
