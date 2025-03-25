import Image from "next/image"
import Link from "next/link"

export default function ServicesSection() {
  const services = [
    {
      id: 1,
      title: "جائزة الجودة السياحية",
      icon: "/static/images/qualityy.png?height=60&width=60",
      href: "#quality",
    },
    {
      id: 2,
      title: "جائزة التميز السياحي",
      icon: "/static/images/idealistic.png?height=60&width=60",
      href: "#excellence",
    },
    {
      id: 3,
      title: "التدريب والتأهيل",
      icon: "/static/images/presentation.png?height=60&width=60",
      href: "#training",
    },
    {
      id: 4,
      title: "الاستشارات والتطوير",
      icon: "/static/images/discussion.png?height=160&width=160",
      href: "#consulting",
    },
  ]

  return (
    <section className="py-10">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-teal-600">خدماتنا</h2>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4" dir="rtl">
          {services.map((service) => (
            <Link key={service.id} href={service.href} className="flex flex-col items-center text-center">
              <div className="mb-4">
                <Image
                  src={service.icon || "/placeholder.svg"}
                  alt={service.title}
                  width={60}
                  height={60}
                  className="h-16 w-16 text-teal-600"
                />
              </div>
              <h3 className="text-sm font-medium text-gray-800">{service.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

