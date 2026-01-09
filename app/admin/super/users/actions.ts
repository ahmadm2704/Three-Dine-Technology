"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function deleteAdminAction(formData: FormData) {
    const id = formData.get("id") as string;
    const supabase = createClient();

    // 1. Check permissions (Super Admin Only)
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: myRole } = await supabase.from('admins').select('role').eq('id', user.id).single();
    if (myRole?.role !== 'super_admin') {
        return; // specific error handling skipped for brevity
    }

    // 2. Delete from public.admins (This effectively revokes access via middleware)
    await supabase.from("admins").delete().eq("id", id);

    // Note: To delete from auth.users requires Service Role key and specialized client
    // For now, removing from 'admins' table is sufficient to block access.

    redirect("/admin/super/users");
}
