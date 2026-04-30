import ProjectForm from "@/components/project-form";

export default function NewProjectPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">Dashboard</p>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">New Project</h1>
          <p className="max-w-2xl text-muted-foreground">Create a new project to appear in your portfolio.</p>
        </div>
      </section>

      <section className="max-w-3xl">
        {/* @ts-expect-error Server component importing client form */}
        <ProjectForm />
      </section>
    </div>
  );
}
