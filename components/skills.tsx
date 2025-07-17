"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Code, Database, Wrench, Cloud } from "lucide-react"
import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

export function Skills() {
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
      const particleCount = Math.min(70, Math.floor((canvas.width * canvas.height) / 10000))

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
        ctx.fillStyle = `rgba(16, 185, 129, ${particle.opacity})`
        ctx.fill()

        particlesRef.current.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 85) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.12 * (1 - distance / 85)})`
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

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code,
      skills: [
        { name: "Java", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "Python", level: 75 },
        { name: "C", level: 80 },
        { name: "HTML/CSS", level: 90 },
        { name: "MySQL", level: 85 },
      ],
    },
    {
      title: "Frameworks & Libraries",
      icon: Wrench,
      skills: [
        { name: "React", level: 85 },
        { name: "Node.js", level: 80 },
        { name: "Flask", level: 75 },
        { name: "Bootstrap", level: 90 },
        { name: "Chart.js", level: 80 },
      ],
    },
    {
      title: "Tools & Technologies",
      icon: Database,
      skills: [
        { name: "VS Code", level: 95 },
        { name: "Eclipse", level: 85 },
        { name: "NetBeans", level: 80 },
        { name: "Git", level: 85 },
        { name: "MySQL Workbench", level: 85 },
      ],
    },
    {
      title: "Cloud & Certifications",
      icon: Cloud,
      skills: [
        { name: "Oracle Cloud", level: 80 },
        { name: "ServiceNow", level: 85 },
        { name: "Machine Learning", level: 75 },
        { name: "System Administration", level: 80 },
      ],
    },
  ]

  const certifications = [
    "Oracle Certified Professional: Java SE 11 Developer",
    "Oracle Cloud Infrastructure Generative AI Certified Professional",
    "ServiceNow Certified System Administrator",
    "ServiceNow Certified Application Developer",
    "Cloud Infrastructure Foundations Associate",
  ]

  return (
    <section id="skills" className="py-20 bg-gray-900 relative overflow-hidden">
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Technical Skills</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              A comprehensive overview of my technical expertise and professional certifications.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {skillCategories.map((category, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 bg-gray-800/50 border-gray-700 backdrop-blur-sm"
              >
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-white">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <category.icon className="h-4 w-4 text-white" />
                    </div>
                    <span>{category.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-white">{skill.name}</span>
                          <span className="text-sm text-gray-400">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center mb-8 text-white">Professional Certifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="bg-gray-700/50 backdrop-blur-sm border border-gray-600 rounded-lg p-4 shadow-sm"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm font-medium text-white">{cert}</span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="mt-2 text-xs bg-green-600/20 text-green-400 border-green-600/30"
                  >
                    2024
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">4+</div>
                <div className="text-gray-300">Years Learning</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">10+</div>
                <div className="text-gray-300">Technologies</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">5</div>
                <div className="text-gray-300">Certifications</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-400 mb-2">4</div>
                <div className="text-gray-300">Major Projects</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
