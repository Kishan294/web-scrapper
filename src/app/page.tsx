'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { motion } from 'framer-motion'
import {
  Globe,
  Zap,
  Shield,
  Code,
  ArrowRight,
  Database,
  Activity
} from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-indigo-500/30">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full opacity-20 blur-[120px] bg-indigo-600 mix-blend-screen" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full opacity-20 blur-[100px] bg-cyan-500 mix-blend-screen" />
        <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] rounded-full opacity-10 blur-[120px] bg-purple-600 mix-blend-screen" />
      </div>

      <div className="relative z-10 hidden md:block border-b border-white/5 bg-slate-950/50 backdrop-blur-xl">
        <Navbar />
      </div>

      {/* Mobile Navbar will still handle its own sticky styles but we want to ensure it looks reasonable. For this design we'll keep the Navbar as is for simplicity, assuming it's mostly controlled by layout or itself. Wait, Navbar is inside Home? Ah, it's rendered here. Let's wrap it nicely. */}
      {/* Wait, the existing Navbar has bright classes. Let's fix that later or rely on the fact that Navbar is a separate component. Actually, Navbar is rendered here. 
          The original Navbar has `bg-white/80`. The new Navbar will clash if left unchanged, but since we are replacing just the Home page, we might have contrast issues. Let's change Navbar as well to be dark or transparent. For now, let's keep the dark theme. */}
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <Badge variant="outline" className="mb-6 border-indigo-500/30 text-indigo-300 bg-indigo-500/10 backdrop-blur-sm px-4 py-1.5 text-sm">
              <span className="flex h-2 w-2 rounded-full bg-indigo-500 mr-2 animate-pulse" />
              Next-Gen Data Extraction
            </Badge>
            
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-8">
              Scrape the Web at <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400 bg-300% animate-gradient">
                Unprecedented Scale
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl font-light leading-relaxed">
              Industrial-grade web scraping infrastructure. Bypass blocks, extract dynamic content, 
              and instantly transform unstructured web data into powerful insights.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 h-14 text-base shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] transition-all hover:scale-105" asChild>
                <Link href="/sign-up">
                  Start Extracting Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/10 text-white hover:bg-white/5 rounded-full px-8 h-14 text-base backdrop-blur-sm" asChild>
                <Link href="#features">
                  Explore Platform
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Dashboard Mockup - Abstract UI */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="max-w-5xl mx-auto mt-20 px-4 sm:px-6 relative z-10"
        >
          <div className="rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-2xl p-2 sm:p-4 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="rounded-xl border border-white/5 bg-slate-950 overflow-hidden flex flex-col h-[400px]">
              <div className="h-12 border-b border-white/5 flex items-center px-4 gap-2 bg-slate-900/80">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="ml-4 text-xs font-mono text-slate-500 truncate w-full max-w-[200px] p-1 bg-black/50 rounded flex items-center gap-2">
                  <Globe className="h-3 w-3 text-cyan-400" /> WebScraper Pro Engine
                </div>
              </div>
              <div className="flex-1 p-6 font-mono text-sm overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950 z-10 pointer-events-none" />
                <div className="text-slate-400 space-y-2 opacity-80">
                  <p><span className="text-indigo-400">➜</span> Initializing distributed workers...</p>
                  <p><span className="text-green-400">✓</span> Proxies rotated and verified.</p>
                  <p><span className="text-indigo-400">➜</span> Connecting to target: <span className="text-cyan-300">ecommerce-global.net</span></p>
                  <p><span className="text-yellow-400">⚠</span> Bypassing Cloudflare protections...</p>
                  <p><span className="text-green-400">✓</span> WAF bypassed successfully.</p>
                  <p><span className="text-indigo-400">➜</span> Extracting product catalog schema...</p>
                  <p className="animate-pulse"><span className="text-cyan-400">⟳</span> Streaming 14,293 records to data lake...</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Core Infrastructure Section */}
      <section id="features" className="py-24 relative z-10 border-t border-white/5 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-5xl font-bold mb-6 text-white tracking-tight">
              Enterprise-Grade Engine
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light">
              Built on a distributed architecture that scales from ad-hoc scripts to millions of concurrent extractions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-8 w-8 text-cyan-400" />,
                title: "Asynchronous Execution",
                description: "Leverage high-concurrency event loops to extract thousands of pages per second with minimal latency."
              },
              {
                icon: <Shield className="h-8 w-8 text-indigo-400" />,
                title: "Smart IP Rotation",
                description: "Built-in residential proxy network automatically rotates fingerprints to maintain 99.9% uptime."
              },
              {
                icon: <Code className="h-8 w-8 text-purple-400" />,
                title: "Headless Browser Fleet",
                description: "Execute complex JavaScript and render SPAs with our scalable chromium worker clusters."
              },
              {
                icon: <Database className="h-8 w-8 text-emerald-400" />,
                title: "Structured Data Lake",
                description: "Export directly to your warehouse. Built-in cleaning pipelines structure raw DOM to pristine JSON."
              },
              {
                icon: <Activity className="h-8 w-8 text-rose-400" />,
                title: "Anomaly Detection",
                description: "Machine learning models monitor target changes and auto-heal extraction selectors on the fly."
              },
              {
                icon: <Globe className="h-8 w-8 text-blue-400" />,
                title: "Global Distribution",
                description: "Scrape locally from 150+ countries to fetch geo-restricted content reliably."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <Card className="h-full bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300">
                  <CardHeader>
                    <div className="mb-4 p-3 bg-white/5 w-fit rounded-xl border border-white/10">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl text-white font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-400 text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-indigo-600/10" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="p-12 sm:p-16 rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-md shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]" />
            
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight relative z-10">
              Ready to scale your pipeline?
            </h2>
            <p className="text-xl text-slate-400 mb-10 mx-auto font-light relative z-10">
              Deploy your first cluster in minutes. No credit card required.
            </p>
            <Button size="lg" className="bg-white text-slate-950 hover:bg-slate-200 rounded-full px-10 h-14 text-base font-medium transition-transform hover:scale-105 relative z-10 w-full sm:w-auto" asChild>
              <Link href="/sign-up">
                Start Free Trial
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer rendering context */}
      <div className="relative z-10 border-t border-white/5 bg-slate-950">
        <Footer />
      </div>

    </div>
  )
}