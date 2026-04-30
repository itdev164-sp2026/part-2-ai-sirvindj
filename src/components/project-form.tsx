"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, Project as ProjectType } from "@/lib/schemas";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError, FieldContent } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { createProject } from "@/app/actions";

type FormValues = ProjectType;

export function ProjectForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: { status: "active" },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      // Call the server action
      const result = await createProject(values as any);

      if (result?.success) {
        toast.success("Project created");
        reset();
      } else {
        toast.error(result?.error ?? "Failed to create project");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Field>
        <FieldLabel>Title</FieldLabel>
        <FieldContent>
          <Input {...register("title")} placeholder="Project title" />
          <FieldError errors={[errors.title as any]} />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel>Description</FieldLabel>
        <FieldContent>
          <Textarea {...register("description")} placeholder="Short project description" />
          <FieldError errors={[errors.description as any]} />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel>Status</FieldLabel>
        <FieldContent>
          <Select {...register("status") as any}>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </Select>
          <FieldError errors={[errors.status as any]} />
        </FieldContent>
      </Field>

      <div>
        <Button type="submit" disabled={isSubmitting}>
          Create Project
        </Button>
      </div>
    </form>
  );
}

export default ProjectForm;
