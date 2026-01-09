import { redirect } from "next/navigation";

export default function TechAdminRedirect() {
    redirect("/admin/technology/projects");
}
