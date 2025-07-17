import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { Education } from "@/components/education"
import { Certifications } from "@/components/certifications"
import { Contact } from "@/components/contact"
import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Education />
        <Certifications />
        <Contact />
      </main>
    </div>
  )
}
