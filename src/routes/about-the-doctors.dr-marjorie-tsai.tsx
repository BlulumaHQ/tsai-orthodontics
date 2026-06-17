import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/about-the-doctors/dr-marjorie-tsai")({
  beforeLoad: () => {
    throw redirect({ to: "/about-the-doctors", hash: "dr-marjorie-tsai" });
  },
  component: () => null,
});
