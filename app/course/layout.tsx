import type React from "react";
import type { Metadata } from "next";

// Metadata specific to the /course route and its children
export const metadata: Metadata = {
  title: "برامج التدريب", // Training Programs
  description: "منصة برامج التدريب مع مدربين متخصصين ومحترفون", // Training programs platform...
};

// This layout wraps pages inside the /course segment
export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Return children directly, or add specific wrappers for this section
  // e.g., <main className="course-section-wrapper">{children}</main>
  return <>{children}</>; 
}
