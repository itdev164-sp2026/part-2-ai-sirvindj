"use server";

import { projectSchema } from "@/lib/schemas";
import { supabase } from "@/lib/supabase";

type ActionResult = { success: true; data?: any } | { success: false; error: string };

export async function createProject(data: unknown): Promise<ActionResult> {
  // Server-side validation
  const parsed = projectSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.message };
  }

  const project = parsed.data;

  try {
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
