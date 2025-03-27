import Image from "next/image"

export default function PartnersSection() {
  return (
    <section className="py-10">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-3 gap-6 items-center justify-items-center">
          <div className="p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1">
            <Image
              src="/static/images/companylogo.png?height=80&width=120"
              alt="Partner logo"
              width={120}
              height={80}
              className="h-20 w-auto object-contain"
            />
          </div>
          <div className="p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1">
            <Image
              src="/static/images/wmk.png?height=80&width=120"
              alt="Partner logo"
              width={120}
              height={80}
              className="h-20 w-auto object-contain"
            />
          </div>
          <div className="p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1">
            <Image
              src="/static/images/uqu.png?height=80&width=120"
              alt="Partner logo"
              width={120}
              height={80}
              className="h-20 w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
