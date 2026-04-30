import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

type Project = {
  id: string | number;
  title: string;
  description: string | null;
  status: string | null;
};

const statusStyles: Record<string, string> = {
  active: "border-transparent bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
  completed: "border-transparent bg-sky-500/15 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300",
  archived: "border-transparent bg-muted text-muted-foreground",
};

function getStatusClassName(status: string | null | undefined) {
  if (!status) {
    return statusStyles.archived;
  }

  return statusStyles[status.toLowerCase()] ?? statusStyles.archived;
}

export default async function ProjectsPage() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("title", { ascending: true });

  if (error) {
    throw new Error(`Failed to load projects: ${error.message}`);
  }

  const projects = (data ?? []) as Project[];

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Dashboard
        </p>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="max-w-2xl text-muted-foreground">
            A server-rendered overview of the current portfolio work, styled to match the rest of the dashboard.
          </p>
          <div className="pt-2">
            <Button asChild>
              <Link href="/projects/new">New Project</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {projects.length > 0 ? (
          projects.map((project) => (
            <Card key={project.id} className="h-full shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
              <CardHeader className="space-y-3 pb-2">
                <div className="flex items-start justify-between gap-4">
                  <CardTitle className="text-lg leading-6">{project.title}</CardTitle>
                  <Badge className={cn("shrink-0", getStatusClassName(project.status))}>
                    {project.status ?? "archived"}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-3 min-h-[3rem]">
                  {project.description || "No description provided for this project yet."}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between pt-2 text-sm text-muted-foreground">
                <span>Project #{String(project.id)}</span>
                <span className="capitalize">{project.status ?? "archived"}</span>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle className="text-lg">No projects found</CardTitle>
              <CardDescription>
                Add rows to the <span className="font-medium text-foreground">projects</span> table in Supabase to see them here.
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </section>
    </div>
  );
}