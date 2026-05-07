"use server";

import { projectSchema } from "@/lib/schemas";
import { createServerActionSupabase } from "@/lib/supabase/clients";
import { redirect } from "next/navigation";

type ActionResult = { success: true; data?: any } | { success: false; error: string };

export async function createProject(data: unknown): Promise<ActionResult> {
  // Server-side validation
  const parsed = projectSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.message };
  }

  const project = parsed.data;

  try {
    const supabase = await createServerActionSupabase();

    const { data: inserted, error } = await supabase
      .from("projects")
      .insert({ title: project.title, description: project.description, status: project.status })
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: inserted };
  } catch (err) {
    return { success: false, error: (err as Error).message ?? "Unknown error" };
  }
}

export async function signIn(form: FormData) {
  const supabase = await createServerActionSupabase();

  const email = String(form.get("email") ?? "");
  const password = String(form.get("password") ?? "");

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    throw new Error(error.message);
  }

  // successful sign in -> redirect to projects
  redirect("/projects");
}

export async function signUp(form: FormData) {
  const supabase = await createServerActionSupabase();

  const email = String(form.get("email") ?? "");
  const password = String(form.get("password") ?? "");

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    throw new Error(error.message);
  }

  // after sign up, redirect to projects (or email confirmation flow)
  redirect("/projects");
}

export async function signOut() {
  const supabase = await createServerActionSupabase();
  await supabase.auth.signOut();
  redirect("/login");
}
