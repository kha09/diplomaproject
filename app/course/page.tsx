import Image from "next/image";
import { Clock, Calendar, CircleDot } from "lucide-react";
import Link from 'next/link'; // Import Link for navigation
// Import the data fetching function and type
import { getAllCoursesWithRelations, CourseWithRelations } from '@/lib/course-data';
// Import Header and Footer
import Header from '@/components/header';
import Footer from '@/components/footer';
// Import the new CourseCard client component
import CourseCard from '@/components/course-card';
// Prisma types might not be needed directly here anymore if CourseWithRelations covers it
// import { Course, Instructor, Diploma } from "@prisma/client";

// Explicitly mark the page as dynamic
export const dynamic = 'force-dynamic';

// Make the component async to fetch data
export default async function TrainingPrograms() { 
  
  // Fetch data directly using the imported function
  let courses: CourseWithRelations[] = [];
  let fetchError: string | null = null;
  try {
    // Call the function directly - no need for fetch or absolute URLs
    courses = await getAllCoursesWithRelations();
  } catch (error) {
    console.error("Error fetching courses:", error);
    fetchError = error instanceof Error ? error.message : "An unknown error occurred while fetching courses.";
  }

  return (
    <div className="min-h-screen bg-white flex flex-col" dir="ltr"> {/* Added flex flex-col */}
      <Header /> {/* Add Header component */}
      <main className="flex-grow"> {/* Wrap content in main and allow it to grow */}
        {/* Header Section */}
        <div className="relative">
          <div className="relative pt-32 pb-48 px-4 text-white text-center">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/static/images/Mask Group 32.png?height=600&width=1920"
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
      <div className="container mx-auto px-4 py-12 -mt-8 relative z-10" dir="rtl">
        {fetchError ? (
          <p className="text-center text-red-600">Error loading courses: {fetchError}</p>
        ) : (
          // Render the grid structure regardless of whether courses were fetched (unless there's an error)
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* --- Demo Course Card (Always render if no fetch error) --- */}
            <CourseCard key="demo-course" detailsLink="/diploma" isDemoCard={true} course={{
              id: 0, // Use a unique key like 0 or a string
              name: "دبلوم اخصائي جودة وتميز سياحي",
              description: "يتكون الدبلوم من مجموعة دورات متخصصة في الجودة والتميز تركز على تطبيق المعايير والإرشادات القياسية ودمجها في خدمات ومنتجات المجال السياحي، لترتقي بمستوى جودة مكوناته وفق أفضل الممارسات العالمية من خلال تأهيل أخصائي جودة وتميز سياحي قادر على تطبيق المواصفات القياسية في جميع مجالات السياحة",
              startDate: new Date(2025, 3, 30), // April 30, 2025 (Month is 0-indexed)
              finishDate: new Date(new Date(2025, 3, 30).setDate(new Date(2025, 3, 30).getDate() + 61)), // 61 days after start date
              price: 99.99,
              room: "قاعة أونلاين",
              instructorId: 0, // Dummy ID
              diplomaId: null, // No diploma for demo
              // createdAt: new Date(), // Removed incorrect field
              // updatedAt: new Date(), // Removed incorrect field
              instructor: { // Dummy instructor data (Removed 'bio', added 'specialty')
                id: 0,
                name: "مدرب تجريبي",
                specialty: "تخصص تجريبي", // Added required field
                // bio: "خبير في العروض التوضيحية.", // Removed incorrect field
                imagePath: "/static/images/diploma.jpeg", // Use an existing image or placeholder
                // createdAt: new Date(), // Removed incorrect field
                // updatedAt: new Date(), // Removed incorrect field
              },
              diploma: null // No diploma for demo
            }} />
            {/* --- End Demo Course Card --- */}

            {/* Map over fetched courses ONLY if they exist */}
            {courses.length > 0 ? (
              courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
              // Optional: If you want a message when ONLY the demo card is shown
              // <p className="col-span-full text-center text-gray-500">No other courses available at the moment.</p>
              null // Render nothing else if only the demo card should show when courses are empty
            )}
          </div>
        )}
      </div>
      </main>
      <Footer /> {/* Add Footer component */}
    </div>
  )
}

// Removed the old CourseCard function definition from here
