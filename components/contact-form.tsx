"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Mark the function as async
  const handleSubmit = async (e: React.FormEvent) => { 
    e.preventDefault()
    // Handle form submission
    // Handle form submission
    // console.log("Form submitted:", formData)
    try {
      const response = await fetch('/api/contact-messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Contact message sent successfully!");
        // Optionally show a success message to the user
        // Reset form
        setFormData({ name: "", phone: "", email: "" });
      } else {
        console.error("Failed to send contact message:", await response.text());
        // Optionally show an error message to the user
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
       // Optionally show an error message to the user
    }
  }

  const handleReset = () => {
    // Reset form
    setFormData({ name: "", phone: "", email: "" })
  }

  return (
    <section className="relative mb-10" style={{ marginTop: "-6rem" }}>
      <div className="container px-4 md:px-6">
        {/* Added max-w-3xl to constrain width */}
        <div className="mx-auto max-w-3xl"> 
          <div className="overflow-hidden rounded-lg shadow-xl" style={{ backgroundColor: "#00CECC" }}>
            {/* Reduced padding from p-8 to p-6 */}
            <div className="p-6 text-center text-white"> 
              <h3 className="mb-6 text-xl font-bold" dir="rtl">
                اترك بياناتك وسوف نتواصل معك
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="الاسم"
                      required
                      className="border-white bg-transparent text-white placeholder:text-white/80"
                    />
                  </div>

                  <div>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="رقم الجوال"
                      required
                      className="border-white bg-transparent text-white placeholder:text-white/80"
                    />
                  </div>

                  <div>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="البريد الالكتروني"
                      required
                      className="border-white bg-transparent text-white placeholder:text-white/80"
                    />
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <Button type="submit" style={{ backgroundColor: "#005A98" }} className="text-white hover:opacity-90">
                    إرســال
                  </Button>
                  <Button type="button" onClick={handleReset} className="bg-white/20 text-white hover:bg-white/30">
                    عرض الدورات
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
