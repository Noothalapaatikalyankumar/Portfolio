"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Calendar, MapPin } from "lucide-react"
import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

export function Education() {
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
      const particleCount = Math.min(55, Math.floor((canvas.width * canvas.height) / 13000))

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          size: Math.random() * 1.8 + 0.5,
          opacity: Math.random() * 0.35 + 0.1,
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
        ctx.fillStyle = `rgba(251, 191, 36, ${particle.opacity})`
        ctx.fill()

        particlesRef.current.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 95) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.13 * (1 - distance / 95)})`
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

  const education = [
    {
      degree: "Bachelor of Engineering in Computer Science",
      institution: "Sathyabama Institute of Science and Technology",
      location: "Chennai, Tamil Nadu",
      duration: "Aug 2021 – May 2025",
      status: "Current",
      description:
        "Comprehensive computer science program covering software development, algorithms, data structures, and emerging technologies.",
      highlights: [
        "Strong foundation in programming and software engineering",
        "Hands-on experience with modern development frameworks",
        "Focus on practical application through project-based learning",
      ],
    },
    {
      degree: "Board of Intermediate Education",
      institution: "Sri Chaitanya Junior College",
      location: "Andhra Pradesh",
      duration: "May 2019 – March 2021",
      description: "Intermediate education with focus on Mathematics, Physics, and Chemistry.",
      highlights: ["Strong analytical and problem-solving foundation", "Mathematics and logical reasoning skills"],
    },
    {
      degree: "Central Board of Secondary Education",
      institution: "Edify School",
      location: "Andhra Pradesh",
      duration: "May 2018 – April 2019",
      description: "Secondary education with well-rounded academic foundation.",
      highlights: ["Solid academic foundation across multiple subjects", "Development of critical thinking skills"],
    },
  ]

  return (
    <section id="education" className="py-20 bg-gray-800 relative overflow-hidden">
      {/* Animated Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Floating Shapes */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-yellow-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Education</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              My educational journey that has shaped my technical foundation and problem-solving abilities.
            </p>
          </div>

          <div className="space-y-8">
            {education.map((edu, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 bg-gray-700/50 border-gray-600 backdrop-blur-sm"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2 text-white">{edu.degree}</CardTitle>
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-300">
                            <span className="font-medium">{edu.institution}</span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {edu.location}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {edu.duration}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {edu.status && (
                      <Badge variant="secondary" className="ml-4 bg-blue-600/20 text-blue-400 border-blue-600/30">
                        {edu.status}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">{edu.description}</p>
                  <div>
                    <h4 className="font-semibold mb-2 text-white">Key Highlights:</h4>
                    <ul className="space-y-1">
                      {edu.highlights.map((highlight, highlightIndex) => (
                        <li key={highlightIndex} className="text-sm text-gray-300 flex items-start">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 text-white">Academic Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-bold text-blue-400 mb-2">4</div>
                  <div className="text-gray-300">Years of Engineering</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400 mb-2">2025</div>
                  <div className="text-gray-300">Expected Graduation</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400 mb-2">CS</div>
                  <div className="text-gray-300">Computer Science</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
