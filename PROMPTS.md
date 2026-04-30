# Prompting Log — ITDEV-164

## Activity 1: The AI-Native Launchpad

### Prompt 1
**What I asked:**
> Before the site loads can you add a loading screen that is shown for a minumum of 2 seconds. Have it say "Loading Portfolio..."(header), "Dominykas Sirvinskas"(under header as sub-heading), "Building something incredible"(under my name again as a sub-header). Don't change any other pages.

**What happened:**
> (Describe what the Agent did. Did it understand your intent immediately?
Agent understood immediately and created a loading screen before the page opens. I looked through and everything seemed to be correct.
> Did it create the right files? Were there any errors?)
No errors. Copilot created one extra file for the loading page. The only thing I changed was the loading time since 2 seconds was too short.

### Prompt 2
**What I asked:**
> Now can you create a clean transition from the loading page to the site so it doesn't snap from one to the other in an instant.

**What happened:**
> I didn't have to steer the Agent since my prompt was straight forward. 
> Writing effective prompts helps you get to your goal/solution quicker and easier. Just articulate your steps in a clear way.

### Reflection
> Copilot being able to have access to your files right away feels awesome. I feel like there are less errors this way 
since it can see how your entire code actually works and not just one file. I didn't expect it to be so quick with responses. Maybe next time I can ask for the AI to give me the exact file and line it added changes for things that are more so for preference like the time of the loading screen or transition.

## Activity 2: Building the Dashboard Shell

### Prompt 1
**What I asked:**
Using the shadcn sidebar components that are now in my src/components/ui/ folder,
create a professional, collapsible dashboard layout. It should include:

1. A sidebar (src/components/app-sidebar.tsx) with navigation links for:
   - Overview (use the Home icon from lucide-react)
   - Projects (use the FolderOpen icon)
   - Settings (use the Settings icon)

2. A top navigation area with breadcrumbs showing the current page.

3. A main content area that wraps the existing page content.

4. Update src/app/layout.tsx to use the new SidebarProvider and sidebar layout.

Important: Preserve the Developer Profile content from Activity 1 in
src/app/page.tsx — it should appear in the main content area of the new layout.
Keep the dark mode toggle working.

**What happened:**
> Everything went smoothly. Copilot...
1. Added a new app sidebar component with required nav links/icons
2. Added a top navigation component
3. Updated root layout to use shadcn sidebar shell
4. Preserved Developer Profile content

### Prompt 2
**What I asked:**
> When I collapse the sidebar on computer screen it leaves the "ITDEV-164 Dashboard" slightly on the sidebar and cutoff. Could you fox it to were you don't see it at all or so it isn't cutoff.

**What happened:**
> Yes the agent fixed this first try and removed the header for the sidebar when collapsed. It added overflow protection on the header container and wrapped the title in a span that is hidden in icon-collapsed mode using group-data state classes.

### Reflection
> N/A
> The agent listens when telling it to preserve certain files or area of a file.

## Activity 3: Server-Side Data with Supabase

### Prompt 1

**What I asked:**

> Using the Supabase client at src/lib/supabase.ts, create a new Server Component
at src/app/projects/page.tsx that:

Fetches all records from the "projects" table in Supabase
Displays them in a professional layout using shadcn/ui Card components
(run npx shadcn@latest add card if needed)
Each card should show the project title, description, and a status badge
The status badge should be color-coded:
"active" = green
"completed" = blue
"archived" = gray
Use @workspace context to match the styling of our existing Dashboard.
This must be a React Server Component (async function, no "use client").
Do NOT use useEffect or useState for data fetching.

**What happened:**

> Server Component was created
> No corrections needed

### Prompt 2

**What I asked:**

> Getting errors here...import { SidebarTrigger, SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import "./globals.css";

**What happened:**

> Fixed duplicate error

### Reflection

> Fetching data on the server feels simpler than using useEffect because the data is already ready when the page loads, instead of loading after render. It’s faster and cleaner, and it was surprising how little code is needed in the App Router to make it work.

## Activity 4: AI-Driven Forms & Validation

### Prompt 1

**What I asked:**

> Create a Zod validation schema in a new file src/lib/schemas.ts for a "Project"
with the following fields:

title: string, minimum 3 characters, with a custom error message
"Title must be at least 3 characters"
description: string, minimum 10 characters, with a custom error message
"Description must be at least 10 characters"
status: enum with values "active", "completed", "archived"
Export the schema and also export the inferred TypeScript type using z.infer.

**What happened:**

> Yes, the Agent created the Zod schema correctly and exported both the schema and the inferred TypeScript type using z.infer.

### Prompt 2

**What I asked:**

> Using the Zod schema from src/lib/schemas.ts, do the following:

1. Create a form component at src/components/project-form.tsx that:
   - Is a Client Component ("use client") because it uses react-hook-form hooks
   - Uses react-hook-form with the zodResolver from @hookform/resolvers for validation
   - Uses shadcn/ui Field, FieldLabel, and FieldError for field layout
   - Uses shadcn/ui Input for title, Textarea for description, and Select for status
   - Shows inline error messages under each field when validation fails
   - Has a "Create Project" submit button
   - Shows a sonner toast notification on successful submission

2. Create a Server Action at src/app/actions.ts that:
   - Has "use server" at the top of the file
   - Accepts the validated form data
   - Validates it again with the Zod schema (server-side validation)
   - Inserts the validated data into the Supabase "projects" table
   - Returns a success or error response

3. Create a new page at src/app/projects/new/page.tsx that renders
   the project form within the dashboard layout.

4. Add a "New Project" button to the existing projects page
   (src/app/projects/page.tsx) that links to /projects/new.

Use @workspace to match the existing project styling.

**What happened:**

> The Agent created multiple files successfully and connected the form submission to the createProject Server Action. It also included server-side Zod validation before inserting the data into Supabase.

### Prompt 3 (if applicable)

**What I asked:**

> n/a

**What happened:**

> n/a

### Reflection

> Using Zod first makes the form rules clear before building the form. It helps stop junk data because invalid titles, descriptions, or statuses are rejected before they reach the database.

Compared to previous courses, this feels more organized because validation is handled in one shared schema instead of being scattered across form code.