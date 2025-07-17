"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Linkedin, Mail } from "lucide-react"
import { useEffect, useState, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

interface CodeLine {
  text: string
  x: number
  y: number
  speed: number
  opacity: number
  color: string
}

export function Hero() {
  const [text, setText] = useState("")
  const fullText = "Full Stack Developer & ML Enthusiast"
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const codeCanvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const codeLinesRef = useRef<CodeLine[]>([])
  const animationRef = useRef<number>()
  const codeAnimationRef = useRef<number>()

  // Code snippets for the background
  const codeSnippets = [
    "const developer = new FullStackDev();",
    "function buildAmazingApps() {",
    "  return innovation + passion;",
    "}",
    "class MachineLearning {",
    "  predict(future) {",
    "    return 'success';",
    "  }",
    "}",
    "import React from 'react';",
    "const skills = ['Java', 'Python', 'React'];",
    "if (opportunity.exists()) {",
    "  developer.apply();",
    "}",
    "SELECT * FROM opportunities",
    "WHERE company = 'innovative';",
    "git commit -m 'Ready for career'",
    "npm install --save future-success",
    "docker run -d career-growth",
    "const passion = true;",
    "while (learning) { grow(); }",
    "export default KalyanKumar;",
  ]

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      setText(fullText.slice(0, index))
      index++
      if (index > fullText.length) {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  // Particle animation setup
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      const particles: Particle[] = []
      const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 8000))

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.4 + 0.2,
        })
      }

      particlesRef.current = particles
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Animate particles
      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`
        ctx.fill()

        // Draw connections
        particlesRef.current.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.2 * (1 - distance / 100)})`
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

  // Code background animation setup
  useEffect(() => {
    const canvas = codeCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createCodeLines = () => {
      const lines: CodeLine[] = []
      const colors = [
        "rgba(34, 197, 94, 0.6)", // Green
        "rgba(59, 130, 246, 0.6)", // Blue
        "rgba(139, 92, 246, 0.6)", // Purple
        "rgba(251, 191, 36, 0.6)", // Yellow
        "rgba(236, 72, 153, 0.6)", // Pink
        "rgba(16, 185, 129, 0.6)", // Emerald
      ]

      for (let i = 0; i < 15; i++) {
        lines.push({
          text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speed: Math.random() * 0.5 + 0.2,
          opacity: Math.random() * 0.3 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }

      codeLinesRef.current = lines
    }

    const animateCode = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      codeLinesRef.current.forEach((line, index) => {
        // Move the code line
        line.y += line.speed

        // Reset position when it goes off screen
        if (line.y > canvas.height + 50) {
          line.y = -50
          line.x = Math.random() * canvas.width
          line.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
        }

        // Draw the code line
        ctx.font = '14px "Fira Code", "Courier New", monospace'
        ctx.fillStyle = line.color
        ctx.globalAlpha = line.opacity
        ctx.fillText(line.text, line.x, line.y)
        ctx.globalAlpha = 1
      })

      codeAnimationRef.current = requestAnimationFrame(animateCode)
    }

    resizeCanvas()
    createCodeLines()
    animateCode()

    const handleResize = () => {
      resizeCanvas()
      createCodeLines()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (codeAnimationRef.current) {
        cancelAnimationFrame(codeAnimationRef.current)
      }
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
    >
      {/* Code Background Canvas */}
      <canvas ref={codeCanvasRef} className="absolute inset-0 z-0" />

      {/* Animated Particles Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10" />

      {/* Matrix-style overlay */}
      <div className="absolute inset-0 z-5 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/20 to-gray-900/40"></div>
      </div>

      {/* Floating Shapes */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-20">
        <div className="text-center">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-2xl animate-pulse border-4 border-blue-400/30">
              NK
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              Kalyan Kumar
            </span>
          </h1>

          <div className="text-xl md:text-2xl text-blue-100 mb-8 h-8 drop-shadow-md font-mono">
            {text}
            <span className="animate-pulse text-green-400">|</span>
          </div>

          <p className="text-lg text-blue-50 mb-8 max-w-2xl mx-auto drop-shadow-md">
            Recent Computer Science graduate passionate about building innovative solutions with machine learning and
            full-stack development. Ready to contribute to your team!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              onClick={() => scrollToSection("projects")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-blue-400/30"
            >
              View My Work
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("contact")}
              className="border-2 border-white/80 text-white hover:bg-white hover:text-gray-900 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
            >
              <Mail className="mr-2 h-4 w-4" />
              Get In Touch
            </Button>
          </div>

          <div className="flex justify-center space-x-6">
            <a
              href="https://www.linkedin.com/in/kalyan-kumar-noothalapaati/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-100 hover:text-yellow-400 transition-colors transform hover:scale-110 duration-300 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:kalyankumarn29@gmail.com"
              className="text-blue-100 hover:text-yellow-400 transition-colors transform hover:scale-110 duration-300 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm">
              <ArrowDown className="h-6 w-6 text-blue-100" />
            </div>
          </div>
        </div>
      </div>

      {/* Coding elements decoration */}
      <div className="absolute top-10 left-10 text-green-400 font-mono text-sm opacity-30 z-15">{"<developer>"}</div>
      <div className="absolute top-10 right-10 text-blue-400 font-mono text-sm opacity-30 z-15">
        {"{ coding: true }"}
      </div>
      <div className="absolute bottom-10 left-10 text-purple-400 font-mono text-sm opacity-30 z-15">
        {"</developer>"}
      </div>
      <div className="absolute bottom-10 right-10 text-yellow-400 font-mono text-sm opacity-30 z-15">
        {"// Ready to code!"}
      </div>
    </section>
  )
}
