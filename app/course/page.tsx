import Image from "next/image";
import { Clock, Calendar, CircleDot } from "lucide-react";
import Link from 'next/link'; // Import Link for navigation
import { Course, Instructor, Diploma } from "@prisma/client"; // Import Prisma types

// Explicitly mark the page as dynamic
export const dynamic = 'force-dynamic';

// Define the type including potential relations returned by the API
type CourseWithRelations = Course & {
  instructor: Instructor | null; // Assuming API includes instructor
  diploma: Diploma | null;    // Assuming API includes diploma
};

// Make the component async to fetch data
export default async function TrainingPrograms() { 
  
  // Fetch data within the Server Component
  let courses: CourseWithRelations[] = [];
  let fetchError: string | null = null;
  try {
    // Fetch using a relative path for server-side calls within the same app
    const response = await fetch(`/api/courses`, { 
        cache: 'no-store' // Keep no-store as data should be fresh
    });
    if (!response.ok) {
      // Provide more context on failure
      const errorBody = await response.text();
      console.error("API Response Error Body:", errorBody);
      throw new Error(`Failed to fetch courses: ${response.status} ${response.statusText}`);
    }
    courses = await response.json();
  } catch (error) {
    console.error("Error fetching courses:", error);
    fetchError = error instanceof Error ? error.message : "An unknown error occurred while fetching courses.";
  }

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Header Section */}
      <div className="relative">
        <div className="relative pt-32 pb-48 px-4 text-white text-center">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/placeholder.svg?height=600&width=1920"
              alt="Hero Background"
              fill
              className="object-cover"
              priority
            />
            {/* Dark Overlay for better text visibility */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h1 className="text-5xl font-bold mb-2">برامـج التدريـب</h1>
            <p className="text-2xl">مدربين متخصصين ومحترفون</p>
          </div>
        </div>

        {/* Wavy Divider */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="container mx-auto px-4 py-12 -mt-8 relative z-10">
        {fetchError ? (
           <p className="text-center text-red-600">Error loading courses: {fetchError}</p>
        ) : courses.length === 0 ? (
           <p className="text-center text-gray-500">No courses available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Map over fetched courses */}
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Update CourseCard to accept and use course data
function CourseCard({ course }: { course: CourseWithRelations }) {
  // Basic date formatting (consider using a library like date-fns for more complex needs)
  const startDate = course.startDate ? new Date(course.startDate).toLocaleDateString('ar-SA') : 'N/A';
  // Calculate duration (example - you might want a more robust calculation)
  // Note: Calculating duration accurately across timezones/DST can be complex.
  // This is a simple day difference calculation.
  const durationDays = course.startDate && course.finishDate 
    ? Math.ceil((new Date(course.finishDate).getTime() - new Date(course.startDate).getTime()) / (1000 * 60 * 60 * 24)) 
    : null; 
  const durationText = durationDays !== null ? `${durationDays} يوم` : 'N/A'; // Example: "X days"

  // Placeholder for hours - you'd need this data from your DB/API if required
  const hoursText = 'N/A'; 

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 flex flex-col h-full"> {/* Ensure cards take full height */}
      <div className="p-4 flex-grow"> {/* Allow content to grow */}
        {/* Use a placeholder or actual image path from course data */}
        <Image
          src={course.instructor?.imagePath || "/placeholder.svg?height=200&width=300"} // Example: use instructor image or placeholder
          alt={course.name || "Course Image"}
          width={300} // Set appropriate width
          height={200} // Set appropriate height
          className="w-full h-48 object-cover rounded-md mb-4" // Added margin-bottom
        />
        <div className="text-center"> {/* Removed mt-4 as image has mb-4 */}
          <h3 className="font-bold text-lg">{course.name}</h3>
          {/* Display actual description or instructor name */}
          <p className="text-sm text-gray-600 mt-1">
             {course.description || (course.instructor ? `بواسطة: ${course.instructor.name}` : '')}
          </p>
        </div>

        {/* Use actual data */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <div className="flex items-center" title={`Start Date: ${startDate}`}>
            <Calendar className="w-5 h-5 ml-1 text-blue-600" />
            <span>{startDate}</span>
          </div>
          <div className="flex items-center" title={`Duration: ${durationText}`}>
            <Clock className="w-5 h-5 ml-1 text-blue-600" />
            <span>{durationText}</span>
          </div>
          <div className="flex items-center" title="Hours (Placeholder)">
            <CircleDot className="w-5 h-5 ml-1 text-blue-600" />
            <span>{hoursText}</span> {/* Replace with actual hours if available */}
          </div>
        </div>
      </div>
      {/* Buttons at the bottom */}
      <div className="flex justify-between mt-auto p-4 border-t border-gray-100 gap-2"> {/* Use mt-auto to push buttons down */}
        {/* Link "Register Now" button if applicable */}
        <Link href={`/register?courseId=${course.id}`} passHref legacyBehavior>
           <a className="flex-1 text-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
             سجل الآن
           </a>
        </Link>
         {/* Link "Details" button to a dynamic course details page */}
         <Link href={`/course/${course.id}`} passHref legacyBehavior>
           <a className="flex-1 text-center py-2 px-4 border border-blue-600 text-blue-600 rounded-md hover:bg-gray-50 transition">
             التفاصيل
           </a>
        </Link>
      </div>
    </div>
  )
}
