"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type PortfolioLoadingGateProps = {
  children: React.ReactNode;
};

export function PortfolioLoadingGate({
  children,
}: PortfolioLoadingGateProps) {
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const [isTransitioningOut, setIsTransitioningOut] = useState(false);

  useEffect(() => {
    const showDurationMs = 3000;
    const fadeDurationMs = 500;

    const startFadeTimer = window.setTimeout(() => {
      setIsTransitioningOut(true);
    }, showDurationMs);

    const removeOverlayTimer = window.setTimeout(() => {
      setIsOverlayVisible(false);
    }, showDurationMs + fadeDurationMs);

    return () => {
      window.clearTimeout(startFadeTimer);
      window.clearTimeout(removeOverlayTimer);
    };
  }, []);

  return (
    <>
      <div
        className={cn(
          "transition-opacity duration-500",
          isTransitioningOut ? "opacity-100" : "opacity-0"
        )}
      >
        {children}
      </div>

      {isOverlayVisible && (
        <section
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center bg-background px-4 text-center transition-opacity duration-500",
            isTransitioningOut ? "opacity-0" : "opacity-100"
          )}
        >
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">Loading Portfolio...</h1>
            <h2 className="text-xl font-semibold text-muted-foreground">
              Dominykas Sirvinskas
            </h2>
            <p className="text-sm uppercase tracking-[0.16em] text-muted-foreground/80">
              Building something incredible
            </p>
          </div>
        </section>
      )}
    </>
  );
}
