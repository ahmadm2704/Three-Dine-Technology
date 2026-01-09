import { redirect } from "next/navigation";

export default function ResearchAdminRedirect() {
    redirect("/admin/research/papers");
}
