"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Utensils, Users, Play } from "lucide-react"
import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

export function Projects() {
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
      const particleCount = Math.min(60, Math.floor((canvas.width * canvas.height) / 12000))

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
        ctx.fillStyle = `rgba(139, 92, 246, ${particle.opacity})`
        ctx.fill()

        particlesRef.current.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 90) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 * (1 - distance / 90)})`
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

  const projects = [
    {
      title: "CyberShield ML-Powered Threat Detection",
      description:
        "A comprehensive full-stack ML-based threat detection platform with real-time monitoring and interactive dashboards.",
      icon: Shield,
      technologies: ["Python", "TypeScript", "React", "Flask", "Chart.js", "ML Models"],
      features: [
        "Integrated Random Forest, SVM, Naive Bayes, and PCA models",
        "Real-time threat visualization with Chart.js dashboards",
        "Secure authentication with protected routes",
        "Data pipelines for CSV parsing and feature normalization",
      ],
      date: "March 2025",
      status: "Featured Project",
    },
    {
      title: "Online Food Delivery Management",
      description: "A responsive food ordering platform with real-time tracking and secure backend management.",
      icon: Utensils,
      technologies: ["HTML", "CSS", "JavaScript", "Bootstrap", "MySQL"],
      features: [
        "Responsive design with Bootstrap and custom CSS",
        "Dynamic JavaScript features for smooth navigation",
        "Secure MySQL backend for orders and user data",
        "Real-time order tracking system",
      ],
      date: "May 2024",
    },
    {
      title: "Student Attendance System",
      description: "A comprehensive attendance management system with Java Swing UI and MySQL integration.",
      icon: Users,
      technologies: ["Java", "Swing", "MySQL"],
      features: [
        "User-friendly Java Swing interface",
        "Secure MySQL database integration",
        "Real-time attendance tracking",
        "Admin panel for attendance management",
      ],
      date: "December 2023",
    },
    {
      title: "Netflix Clone",
      description: "A pixel-perfect front-end replica of Netflix with dynamic content loading and API integration.",
      icon: Play,
      technologies: ["HTML", "CSS", "JavaScript", "YouTube API"],
      features: [
        "Responsive layout with HTML5 and CSS3",
        "Dynamic content loading with JavaScript",
        "YouTube API integration for trailers",
        "Smooth transitions and interactive modals",
      ],
      date: "September 2023",
    },
  ]

  return (
    <section id="projects" className="py-20 bg-gray-800 relative overflow-hidden">
      {/* Animated Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Floating Shapes */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Projects</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Here are some of my key projects that demonstrate my technical skills and problem-solving abilities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 group bg-gray-700/50 border-gray-600 backdrop-blur-sm"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <project.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-white">{project.title}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-gray-400">{project.date}</span>
                          {project.status && (
                            <Badge
                              variant="secondary"
                              className="text-xs bg-blue-600/20 text-blue-400 border-blue-600/30"
                            >
                              {project.status}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-base mt-3 text-gray-300">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-white">Key Features:</h4>
                      <ul className="space-y-1">
                        {project.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="text-sm text-gray-300 flex items-start">
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 text-white">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="outline"
                            className="text-xs border-gray-600 text-gray-300 hover:bg-gray-600/50"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-300 mb-4">Want to see more of my work or discuss a project?</p>
            <Button
              size="lg"
              onClick={() => {
                const element = document.getElementById("contact")
                if (element) element.scrollIntoView({ behavior: "smooth" })
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Let's Connect
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
