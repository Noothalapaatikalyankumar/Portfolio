"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Calendar } from "lucide-react"
import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

export function Certifications() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()

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
      const particleCount = Math.min(65, Math.floor((canvas.width * canvas.height) / 11000))

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
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
        ctx.fillStyle = `rgba(236, 72, 153, ${particle.opacity})`
        ctx.fill()

        particlesRef.current.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 88) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.14 * (1 - distance / 88)})`
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

  const certifications = [
    {
      title: "Oracle Certified Professional: Java SE 11 Developer",
      issuer: "Oracle",
      year: "2024",
      category: "Programming",
      description:
        "Advanced Java programming certification demonstrating expertise in Java SE 11 features and best practices.",
      skills: ["Java SE 11", "Object-Oriented Programming", "Advanced Java Features", "Best Practices"],
    },
    {
      title: "Oracle Cloud Infrastructure Generative AI Certified Professional",
      issuer: "Oracle",
      year: "2024",
      category: "AI/ML",
      description:
        "Certification in Oracle's cloud-based AI and machine learning services and generative AI technologies.",
      skills: ["Generative AI", "Oracle Cloud", "Machine Learning", "AI Services"],
    },
    {
      title: "ServiceNow Certified System Administrator",
      issuer: "ServiceNow",
      year: "2024",
      category: "Platform",
      description: "Comprehensive certification covering ServiceNow platform administration and configuration.",
      skills: ["ServiceNow Platform", "System Administration", "Configuration", "User Management"],
    },
    {
      title: "ServiceNow Certified Application Developer",
      issuer: "ServiceNow",
      year: "2024",
      category: "Development",
      description: "Advanced certification for developing custom applications on the ServiceNow platform.",
      skills: ["ServiceNow Development", "Custom Applications", "Scripting", "Workflow Design"],
    },
    {
      title: "Cloud Infrastructure Foundations Associate",
      issuer: "Oracle University",
      year: "2024",
      category: "Cloud",
      description: "Foundational certification covering cloud infrastructure concepts and Oracle Cloud services.",
      skills: ["Cloud Computing", "Infrastructure", "Oracle Cloud Services", "Cloud Architecture"],
    },
  ]

  const categoryColors = {
    Programming: "bg-blue-600/20 text-blue-400 border-blue-600/30",
    "AI/ML": "bg-purple-600/20 text-purple-400 border-purple-600/30",
    Platform: "bg-green-600/20 text-green-400 border-green-600/30",
    Development: "bg-orange-600/20 text-orange-400 border-orange-600/30",
    Cloud: "bg-cyan-600/20 text-cyan-400 border-cyan-600/30",
  }

  return (
    <section id="certifications" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Animated Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Floating Shapes */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Professional Certifications</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Industry-recognized certifications that validate my technical expertise and commitment to continuous
              learning.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {certifications.map((cert, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 group bg-gray-800/50 border-gray-700 backdrop-blur-sm"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Award className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg leading-tight mb-2 text-white">{cert.title}</CardTitle>
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <span className="font-medium">{cert.issuer}</span>
                          <span>•</span>
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {cert.year}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className={`ml-2 ${categoryColors[cert.category as keyof typeof categoryColors]}`}
                    >
                      {cert.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4 text-sm">{cert.description}</p>
                  <div>
                    <h4 className="font-semibold mb-2 text-sm text-white">Key Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="outline"
                          className="text-xs border-gray-600 text-gray-300 hover:bg-gray-600/50"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-8 text-white">Certification Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <div className="text-3xl font-bold text-blue-400 mb-2">5</div>
                  <div className="text-gray-300">Total Certifications</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400 mb-2">2024</div>
                  <div className="text-gray-300">All Earned In</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400 mb-2">3</div>
                  <div className="text-gray-300">Major Vendors</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-400 mb-2">100%</div>
                  <div className="text-gray-300">Pass Rate</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-300 mb-4">
              Continuously expanding my skill set with new certifications and technologies.
            </p>
            <div className="flex justify-center space-x-4">
              <Badge variant="outline" className="px-4 py-2 border-gray-600 text-gray-300">
                Oracle Certified
              </Badge>
              <Badge variant="outline" className="px-4 py-2 border-gray-600 text-gray-300">
                ServiceNow Certified
              </Badge>
              <Badge variant="outline" className="px-4 py-2 border-gray-600 text-gray-300">
                Cloud Professional
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
