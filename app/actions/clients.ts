"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function createClient(formData: FormData): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return;
  }

  // Exact mapping to Supabase columns: name, email, phone
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  if (!name || !email) {
    return;
  }

  await supabase
    .from("clients")
    .insert({
      user_id: user.id,
      name,
      email,
      phone,
    });

  revalidatePath("/clients");
}
