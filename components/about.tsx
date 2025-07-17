"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Code, Database, Brain, Rocket } from "lucide-react"
import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

export function About() {
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
      const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 15000))

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
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`
        ctx.fill()

        particlesRef.current.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 80) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - distance / 80)})`
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

  const highlights = [
    {
      icon: Code,
      title: "Full Stack Development",
      description: "Experienced in building end-to-end web applications with modern technologies",
    },
    {
      icon: Brain,
      title: "Machine Learning",
      description: "Passionate about AI/ML with hands-on experience in threat detection systems",
    },
    {
      icon: Database,
      title: "Database Management",
      description: "Proficient in MySQL and data pipeline design for efficient data handling",
    },
    {
      icon: Rocket,
      title: "Quick Learner",
      description: "Multiple certifications and constantly learning new technologies",
    },
  ]

  return (
    <section id="about" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Animated Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Floating Shapes */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">About Me</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              I'm a passionate Computer Science graduate from Sathyabama Institute of Science and Technology, eager to
              start my career in software development. With a strong foundation in programming and hands-on project
              experience, I'm ready to contribute to innovative teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {highlights.map((item, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-xl transition-all duration-300 bg-gray-800/50 border-gray-700 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{item.title}</h3>
                  <p className="text-gray-300 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-white">Why Choose Me?</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Fresh perspective with modern development practices</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Strong problem-solving skills demonstrated through diverse projects</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Multiple industry certifications showing commitment to learning</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Ready to contribute immediately and grow with your team</span>
                  </li>
                </ul>
              </div>
              <div className="text-center lg:text-right">
                <div className="inline-block bg-gray-700/50 backdrop-blur-sm border border-gray-600 rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl font-bold text-blue-400 mb-2">2025</div>
                  <div className="text-gray-300">Graduate</div>
                  <div className="text-3xl font-bold text-purple-400 mb-2 mt-4">4+</div>
                  <div className="text-gray-300">Projects</div>
                  <div className="text-3xl font-bold text-green-400 mb-2 mt-4">5+</div>
                  <div className="text-gray-300">Certifications</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
