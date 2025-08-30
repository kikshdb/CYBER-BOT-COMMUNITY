import React from "react"; import { motion } from "framer-motion"; import { BookOpen, GraduationCap, Search, Star, Clock, Tag, Calendar, CheckCircle2, ArrowRight, Play, Award, Moon, Sun, ListFilter } from "lucide-react"; import { Card, CardContent } from "@/components/ui/card"; import { Button } from "@/components/ui/button"; import { Input } from "@/components/ui/input"; import { Badge } from "@/components/ui/badge"; import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"; import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"; import { Progress } from "@/components/ui/progress";

// Simple mock data const courses = [ { id: "c1", title: "React Fundamentals", tagline: "Build modern UIs from scratch", level: "Beginner", duration: "12h", lessons: 36, rating: 4.8, category: "Web Dev", color: "from-indigo-500 to-purple-500", }, { id: "c2", title: "Tailwind CSS Mastery", tagline: "Ship beautiful designs fast", level: "Intermediate", duration: "8h", lessons: 24, rating: 4.9, category: "Design", color: "from-emerald-500 to-teal-500", }, { id: "c3", title: "TypeScript for JS Devs", tagline: "Confident, scalable code", level: "Intermediate", duration: "10h", lessons: 28, rating: 4.7, category: "Web Dev", color: "from-sky-500 to-cyan-500", }, { id: "c4", title: "Data Viz with Recharts", tagline: "Tell stories with data", level: "Beginner", duration: "6h", lessons: 18, rating: 4.6, category: "Data", color: "from-rose-500 to-orange-500", }, ];

const syllabus = [ { id: "s1", title: "Getting Started", items: [ "What is React & why use it?", "Project setup & tooling", "JSX & components" ], }, { id: "s2", title: "Core Concepts", items: [ "Props, state & events", "Lists & keys", "Conditional rendering" ], }, { id: "s3", title: "Real-World Patterns", items: [ "Hooks you actually need", "Folder structure that scales", "Fetching & caching data" ], }, ];

function useDarkMode() { const [dark, setDark] = React.useState(false); React.useEffect(() => { const root = document.documentElement; if (dark) root.classList.add("dark"); else root.classList.remove("dark"); }, [dark]); return { dark, setDark }; }

function CourseCard({ c }) { return ( <motion.div layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}> <Card className="group overflow-hidden rounded-2xl border border-border/60 shadow-sm hover:shadow-lg transition-all"> <div className={h-28 bg-gradient-to-br ${c.color} p-4 flex items-end}> <Badge variant="secondary" className="backdrop-blur bg-white/20 text-white border-white/30">{c.category}</Badge> </div> <CardContent className="p-5"> <div className="flex items-start justify-between gap-3"> <div> <h3 className="text-lg font-semibold leading-snug tracking-tight">{c.title}</h3> <p className="text-sm text-muted-foreground mt-1">{c.tagline}</p> </div> <TooltipProvider> <Tooltip> <TooltipTrigger asChild> <div className="flex items-center gap-1 text-sm"><Star className="h-4 w-4"/> {c.rating}</div> </TooltipTrigger> <TooltipContent>Average learner rating</TooltipContent> </Tooltip> </TooltipProvider> </div>

<div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1"><Tag className="h-4 w-4"/> {c.level}</span>
        <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4"/> {c.duration}</span>
        <span className="inline-flex items-center gap-1"><Play className="h-4 w-4"/> {c.lessons} lessons</span>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <Button className="rounded-2xl">Enroll</Button>
        <Button variant="ghost" className="rounded-2xl">Syllabus <ArrowRight className="ml-1 h-4 w-4"/></Button>
      </div>
    </CardContent>
  </Card>
</motion.div>

); }

export default function LearningPage() { const { dark, setDark } = useDarkMode(); const [query, setQuery] = React.useState(""); const [tab, setTab] = React.useState("all");

const filtered = courses.filter(c => { const matchTab = tab === "all" || c.category.toLowerCase() === tab; const q = query.trim().toLowerCase(); const matchQ = !q || c.title.toLowerCase().includes(q) || c.tagline.toLowerCase().includes(q) || c.category.toLowerCase().includes(q); return matchTab && matchQ; });

return ( <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 dark:from-background dark:to-muted/20 text-foreground"> {/* Top Bar */} <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/60"> <div className="mx-auto max-w-7xl px-4 md:px-6"> <div className="flex items-center justify-between py-4"> <div className="flex items-center gap-2"> <div className="h-9 w-9 rounded-2xl grid place-items-center bg-primary/10"> <GraduationCap className="h-5 w-5"/> </div> <div> <p className="text-sm text-muted-foreground leading-tight">Learn • Build • Grow</p> <h1 className="text-xl font-bold tracking-tight">Open Learning</h1> </div> </div> <div className="flex items-center gap-2"> <Button variant="ghost" className="rounded-2xl" onClick={() => setDark(!dark)}> {dark ? <Sun className="h-4 w-4 mr-2"/> : <Moon className="h-4 w-4 mr-2"/>} {dark ? "Light" : "Dark"} </Button> <Button className="rounded-2xl"><Award className="mr-2 h-4 w-4"/> Get Pro</Button> </div> </div> </div> </header>

{/* Hero */}
  <section className="mx-auto max-w-7xl px-4 md:px-6 pt-10">
    <div className="grid gap-6 md:grid-cols-3">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="md:col-span-2">
        <Card className="rounded-2xl overflow-hidden border border-border/60">
          <div className="p-7 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent">
            <Badge className="rounded-xl" variant="secondary"><Calendar className="h-3.5 w-3.5 mr-1"/> New Cohort • Sept 15</Badge>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">Launch your next skill in 30 days</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl">Curated micro-lessons, hands-on projects, and community review. Start with a plan, finish with a portfolio piece.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button size="lg" className="rounded-2xl"><BookOpen className="mr-2 h-5 w-5"/> Start Learning</Button>
              <Button size="lg" variant="outline" className="rounded-2xl">Browse Tracks</Button>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <Card className="rounded-2xl border border-border/60 h-full">
          <CardContent className="p-6">
            <h3 className="font-semibold">Your Weekly Goals</h3>
            <div className="mt-4 space-y-3">
              {["Watch 3 lessons", "Build 1 mini-project", "Post 1 review"].map((g, i) => (
                <div className="flex items-center gap-3" key={i}>
                  <CheckCircle2 className="h-4 w-4"/>
                  <span className="text-sm">{g}</span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <p className="text-sm text-muted-foreground mb-2">Weekly Progress</p>
              <Progress value={48} className="h-2 rounded-full"/>
              <p className="text-xs text-muted-foreground mt-1">48% complete</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  </section>

  {/* Search & Filter */}
  <section className="mx-auto max-w-7xl px-4 md:px-6 mt-10">
    <Card className="rounded-2xl border border-border/60">
      <CardContent className="p-5">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search courses, topics, or tags..." className="pl-9 rounded-2xl"/>
          </div>
          <Button variant="outline" className="rounded-2xl"><ListFilter className="h-4 w-4 mr-2"/>Filters</Button>
        </div>

        <div className="mt-4">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="rounded-2xl">
              <TabsTrigger value="all" className="rounded-xl">All</TabsTrigger>
              <TabsTrigger value="web dev" className="rounded-xl">Web Dev</TabsTrigger>
              <TabsTrigger value="design" className="rounded-xl">Design</TabsTrigger>
              <TabsTrigger value="data" className="rounded-xl">Data</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  </section>

  {/* Courses Grid */}
  <section className="mx-auto max-w-7xl px-4 md:px-6 mt-6">
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filtered.map((c) => (
        <CourseCard key={c.id} c={c} />
      ))}
      {filtered.length === 0 && (
        <p className="text-muted-foreground">No results. Try another search.</p>
      )}
    </div>
  </section>

  {/* Syllabus / Curriculum preview */}
  <section className="mx-auto max-w-7xl px-4 md:px-6 mt-12">
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="rounded-2xl border border-border/60">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-5 w-5"/>
            <h3 className="font-semibold text-lg">Sample Syllabus</h3>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {syllabus.map((s) => (
              <AccordionItem key={s.id} value={s.id}>
                <AccordionTrigger className="text-left">{s.title}</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {s.items.map((it, i) => (
                      <li key={i} className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary"/> {it}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border border-border/60">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <Award className="h-5 w-5"/>
            <h3 className="font-semibold text-lg">Why learn here?</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Bite-sized lessons", desc: "Focus on what matters in 10–15 mins." },
              { title: "Project-first", desc: "Every module ends with a hands-on build." },
              { title: "Peer reviews", desc: "Get feedback from real humans (nicely)." },
              { title: "Certificates", desc: "Earn shareable badges for your profile." },
            ].map((f, i) => (
              <div key={i} className="rounded-2xl border border-border/60 p-4">
                <h4 className="font-medium">{f.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </section>

  {/* FAQ */}
  <section className="mx-auto max-w-7xl px-4 md:px-6 mt-12 mb-16">
    <Card className="rounded-2xl border border-border/60">
      <CardContent className="p-6">
        <h3 className="font-semibold text-lg">FAQ</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {[ 
            { q: "How long do I keep access?", a: "Lifetime access, including future updates." },
            { q: "Do I need prior experience?", a: "Beginner tracks start from zero—no worries." },
            { q: "Is there a community?", a: "Yes! Join our Discord to learn together." },
            { q: "Can I learn on mobile?", a: "The platform is fully responsive and fast." },
          ].map((f, i) => (
            <div key={i} className="rounded-2xl border border-border/60 p-4">
              <p className="font-medium">{f.q}</p>
              <p className="text-sm text-muted-foreground mt-1">{f.a}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </section>

  <footer className="border-t border-border/60">
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-3">
      <p>© {new Date().getFullYear()} Open Learning. All rights reserved.</p>
      <div className="flex items-center gap-4">
        <a className="hover:text-foreground" href="#">Privacy</a>
        <a className="hover:text-foreground" href="#">Terms</a>
        <a className="hover:text-foreground" href="#">Contact</a>
      </div>
    </div>
  </footer>
</div>

); }

