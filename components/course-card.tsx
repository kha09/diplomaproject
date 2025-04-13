"use client"; // Make this a client component - MUST be at the top

"use client"; // Make this a client component - MUST be at the top

import Image from "next/image";
import { Clock, Calendar, CircleDot } from "lucide-react";
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { CourseWithRelations } from '@/lib/course-data'; // Assuming type is exported from here
import { useState, useEffect } from 'react'; // Import useState and useEffect

// Accept course data, optional detailsLink, and isDemoCard flag
export default function CourseCard({ course, detailsLink, isDemoCard }: { course: CourseWithRelations; detailsLink?: string; isDemoCard?: boolean }) {
  const { data: session, status } = useSession(); // Get session status
  const [isClient, setIsClient] = useState(false); // State to track client-side mount

  useEffect(() => {
    // This effect runs only on the client after mounting
    setIsClient(true);
  }, []);

  // Determine the link for the "Register Now" button
  let registerHref = `/register?courseId=${course.id}`; // Default link
  if (isDemoCard) {
    if (status === "authenticated") {
      registerHref = "/diploma"; // Logged-in users go to /diploma for demo card
    } else {
      // For unauthenticated or loading status, link to login
      registerHref = "/login";
    }
  }

  // Basic date formatting - use state for client-side rendering
  // Format date only on the client after hydration
  const formattedStartDate = isClient && course.startDate
    ? new Date(course.startDate).toLocaleDateString('ar-SA')
    : (course.startDate ? new Date(course.startDate).toLocaleDateString('en-CA') : 'N/A'); // Use a consistent server format like YYYY-MM-DD or 'N/A'

  const durationDays = course.startDate && course.finishDate
    ? Math.ceil((new Date(course.finishDate).getTime() - new Date(course.startDate).getTime()) / (1000 * 60 * 60 * 24))
    : null;
  const durationText = durationDays !== null ? `${durationDays} يوم` : 'N/A';
  const hoursText = 'N/A'; // Placeholder

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 flex flex-col h-full">
      <div className="p-4 flex-grow">
        <Image
          src={course.instructor?.imagePath || "/placeholder.svg?height=200&width=300"}
          alt={course.name || "Course Image"}
          width={300}
          height={200}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <div className="text-center">
          <h3 className="font-bold text-lg">{course.name}</h3>
          <p className="text-sm text-gray-600 mt-1">
             {course.description || (course.instructor ? `بواسطة: ${course.instructor.name}` : '')}
          </p>
        </div>
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <div className="flex items-center" title={`Start Date: ${formattedStartDate}`}>
            <Calendar className="w-5 h-5 ml-1 text-blue-600" />
            {/* Render formatted date only on client */}
            <span>{formattedStartDate}</span>
          </div>
          <div className="flex items-center" title={`Duration: ${durationText}`}>
            <Clock className="w-5 h-5 ml-1 text-blue-600" />
            <span>{durationText}</span>
          </div>
          <div className="flex items-center" title="Hours (Placeholder)">
            <CircleDot className="w-5 h-5 ml-1 text-blue-600" />
            <span>{hoursText}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-auto p-4 border-t border-gray-100 gap-2">
        <Link href={registerHref} passHref legacyBehavior>
           <a className={`flex-1 text-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition ${status === 'loading' && isDemoCard ? 'opacity-50 cursor-not-allowed' : ''}`}>
             سجل الآن
           </a>
         </Link>
         <Link href={detailsLink || `/course/${course.id}`} passHref legacyBehavior>
           <a className="flex-1 text-center py-2 px-4 border border-blue-600 text-blue-600 rounded-md hover:bg-gray-50 transition">
             التفاصيل
           </a>
        </Link>
      </div>
    </div>
  );
}
