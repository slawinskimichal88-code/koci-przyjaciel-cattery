import { isAuthenticated, getCredentials } from "@/lib/cmsAuth";
import { redirect } from "next/navigation";
import CMSDashboardClient from "./CMSDashboardClient";
import { getKittens } from "@/lib/kittensStorage";

export const metadata = {
  title: "Panel Zarządzania | Koci Przyjaciel *PL",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function CMSPage() {
  const authed = await isAuthenticated();

  if (!authed) {
    redirect("/wariat/login");
  }

  const initialKittens = getKittens();
  const currentLogin = getCredentials().login;

  return <CMSDashboardClient initialKittens={initialKittens} currentLogin={currentLogin} />;
}
