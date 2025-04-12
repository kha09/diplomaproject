import prisma from '@/prisma/client';
import { Course, Instructor, Diploma } from "@prisma/client";

// Define the type including potential relations returned by the query
export type CourseWithRelations = Course & {
  instructor: Instructor | null;
  diploma: Diploma | null;
};

export async function getAllCoursesWithRelations(): Promise<CourseWithRelations[]> {
  try {
    const courses = await prisma.course.findMany({
      include: {
        instructor: true, // Include related instructor
        diploma: true     // Include related diploma
      },
      orderBy: {
        startDate: 'asc' // Optional: Order courses by start date
      }
    });
    // Ensure date objects are serializable if necessary, though Prisma handles this well.
    // If issues arise, map over courses and convert dates to strings:
    // return courses.map(course => ({
    //   ...course,
    //   startDate: course.startDate?.toISOString(),
    //   finishDate: course.finishDate?.toISOString(),
    //   // Ensure nested dates are also handled if needed
    // }));
    return courses;
  } catch (error) {
    console.error("Error fetching courses from DB:", error);
    // Re-throw the error or return an empty array/handle as needed
    throw new Error("Failed to fetch courses from database.");
    // Or return [];
  }
}
