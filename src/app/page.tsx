import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Database,
  Figma,
  GitBranch,
  Globe,
  LayoutTemplate,
  Server,
  Wind,
} from "lucide-react";
import { PortfolioLoadingGate } from "@/components/portfolio-loading-gate";

type Skill = {
  name: string;
  description: string;
  icon: LucideIcon;
};

const skills: Skill[] = [
  {
    name: "TypeScript",
    description: "Building strongly typed, maintainable web applications.",
    icon: Code2,
  },
  {
    name: "Next.js",
    description: "Creating modern App Router projects with server-first patterns.",
    icon: Globe,
  },
  {
    name: "Tailwind CSS",
    description: "Designing responsive interfaces quickly with utility classes.",
    icon: Wind,
  },
  {
    name: "React",
    description: "Composing reusable components for scalable front-end UIs.",
    icon: LayoutTemplate,
  },
  {
    name: "Supabase",
    description: "Integrating authentication and database features in full-stack apps.",
    icon: Database,
  },
  {
    name: "Git & GitHub",
    description: "Using version control workflows for collaboration and deployment.",
    icon: GitBranch,
  },
  {
    name: "Node.js",
    description: "Working with backend logic and API routes in JavaScript runtimes.",
    icon: Server,
  },
  {
    name: "UI/UX Foundations",
    description: "Applying layout, spacing, and hierarchy principles in design.",
    icon: Figma,
  },
];

export default function HomePage() {
  return (
    <PortfolioLoadingGate>
      <div className="space-y-10">
        <section className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight">
            Developer Profile
          </h1>
          <h2 className="text-xl font-semibold">Dominykas Sirvinskas</h2>
          <p className="max-w-3xl text-muted-foreground">
            I am a web development student focused on building modern, full-stack
            applications with clean user experiences. I am currently strengthening
            my skills in Next.js, TypeScript, and practical AI-assisted workflows.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-semibold tracking-tight">Skills</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map(({ name, description, icon: Icon }) => (
              <div
                key={name}
                className="group rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/40"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">
                    <Icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                  </div>
                  <h4 className="font-semibold leading-none">{name}</h4>
                </div>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PortfolioLoadingGate>
  );
}
