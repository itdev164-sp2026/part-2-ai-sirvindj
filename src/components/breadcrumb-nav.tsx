"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const routeLabels: Record<string, string> = {
  "/": "Overview",
  "/projects": "Projects",
  "/settings": "Settings",
};

function getBreadcrumbLabel(pathname: string) {
  return routeLabels[pathname] ?? routeLabels["/"];
}

export function BreadcrumbNav() {
  const pathname = usePathname();
  const label = getBreadcrumbLabel(pathname);
  const isRoot = pathname === "/";

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {isRoot ? (
            <BreadcrumbPage>ITDEV-164</BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link href="/">ITDEV-164</Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        <BreadcrumbItem>
          {isRoot ? (
            <BreadcrumbPage>{label}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link href={pathname}>{label}</Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}