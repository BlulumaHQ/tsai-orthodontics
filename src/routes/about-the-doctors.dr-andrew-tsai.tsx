import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/about-the-doctors/dr-andrew-tsai")({
  beforeLoad: () => {
    throw redirect({ to: "/about-the-doctors", hash: "dr-andrew-tsai" });
  },
  component: () => null,
});
