import { Link } from "@tanstack/react-router";

export function MobileStickyCTA() {
  return (
    <div className="lg:hidden fixed bottom-4 inset-x-4 z-40">
      <Link
        to="/contact"
        className="block w-full text-center px-6 py-4 rounded-full bg-primary text-primary-foreground text-sm uppercase tracking-[0.18em] font-medium shadow-lg shadow-primary/20"
      >
        Book a Consultation
      </Link>
    </div>
  );
}
