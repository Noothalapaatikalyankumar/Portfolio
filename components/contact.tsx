"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, Linkedin, MapPin, Send } from "lucide-react"
import { useState, useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

export function Contact() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    const createParticles = () => {
      const particles: Particle[] = []
      const particleCount = Math.min(60, Math.floor((canvas.width * canvas.height) / 12000))

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.3 + 0.1,
        })
      }

      particlesRef.current = particles
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(34, 197, 94, ${particle.opacity})`
        ctx.fill()

        particlesRef.current.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 90) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.12 * (1 - distance / 90)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    createParticles()
    animate()

    const handleResize = () => {
      resizeCanvas()
      createParticles()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(formData.subject || "Contact from Portfolio")
    const body = encodeURIComponent(
      `Hi Kalyan,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
    )
    window.location.href = `mailto:kalyankumarn29@gmail.com?subject=${subject}&body=${body}`
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "kalyankumarn29@gmail.com",
      href: "mailto:kalyankumarn29@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 6304252346",
      href: "tel:+916304252346",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "kalyan-kumar-noothalapaati",
      href: "https://www.linkedin.com/in/kalyan-kumar-noothalapaati/",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "India",
      href: null,
    },
  ]

  return (
    <section id="contact" className="py-20 bg-gray-800 relative overflow-hidden">
      {/* Animated Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Floating Shapes */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-green-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Let's Connect</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              I'm actively seeking opportunities to start my career in software development. Let's discuss how I can
              contribute to your team!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-bold mb-8 text-white">Get In Touch</h3>
              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <info.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-white">{info.label}</div>
                      {info.href ? (
                        <a
                          href={info.href}
                          target={info.href.startsWith("http") ? "_blank" : undefined}
                          rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <span className="text-gray-300">{info.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-700/50 backdrop-blur-sm border border-gray-600 rounded-2xl p-6">
                <h4 className="font-bold mb-4 text-white">Why Hire Me?</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-300">Fresh graduate with modern development skills</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-300">Strong foundation in full-stack development</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-300">Multiple industry certifications</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-300">Eager to learn and contribute immediately</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="bg-gray-700/50 border-gray-600 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Send Me a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2 text-white">
                        Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your Name"
                        className="bg-gray-600/50 border-gray-500 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2 text-white">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.email@example.com"
                        className="bg-gray-600/50 border-gray-500 text-white placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2 text-white">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Job Opportunity / Project Discussion"
                      className="bg-gray-600/50 border-gray-500 text-white placeholder:text-gray-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-white">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell me about the opportunity or project you'd like to discuss..."
                      className="bg-gray-600/50 border-gray-500 text-white placeholder:text-gray-400"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-16 pt-8 border-t border-gray-700">
            <p className="text-gray-300">© 2025 Kalyan Kumar Noothalapaati. Ready to start my career journey!</p>
          </div>
        </div>
      </div>
    </section>
  )
}
