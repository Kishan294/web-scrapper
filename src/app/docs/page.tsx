'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'
import {
  Search,
  BookOpen,
  Code,
  Zap,
  Settings,
  Globe,
  Download,
  Shield,
  Clock,
  ArrowRight,
  ExternalLink,
  Copy,
  CheckCircle
} from 'lucide-react'

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <Zap className="h-5 w-5" />,
      description: 'Quick start guide to begin scraping',
      articles: [
        { title: 'Creating Your First Scraping Job', time: '5 min read' },
        { title: 'Understanding Selection Methods', time: '3 min read' },
        { title: 'Running and Monitoring Jobs', time: '4 min read' },
        { title: 'Exporting Your Data', time: '2 min read' }
      ]
    },
    {
      id: 'api-reference',
      title: 'API Reference',
      icon: <Code className="h-5 w-5" />,
      description: 'Complete API documentation',
      articles: [
        { title: 'Authentication', time: '3 min read' },
        { title: 'Jobs Endpoint', time: '8 min read' },
        { title: 'Results Endpoint', time: '6 min read' },
        { title: 'Webhooks', time: '5 min read' }
      ]
    },
    {
      id: 'selectors',
      title: 'Element Selection',
      icon: <Globe className="h-5 w-5" />,
      description: 'Master CSS selectors, XPath, and more',
      articles: [
        { title: 'CSS Selector Guide', time: '10 min read' },
        { title: 'XPath Expressions', time: '12 min read' },
        { title: 'ID and Tag Selection', time: '4 min read' },
        { title: 'Advanced Targeting', time: '8 min read' }
      ]
    },
    {
      id: 'automation',
      title: 'Automation',
      icon: <Clock className="h-5 w-5" />,
      description: 'Schedule and automate your scraping',
      articles: [
        { title: 'Setting Up Schedules', time: '6 min read' },
        { title: 'Webhook Integration', time: '7 min read' },
        { title: 'Error Handling', time: '5 min read' },
        { title: 'Monitoring & Alerts', time: '4 min read' }
      ]
    },
    {
      id: 'data-export',
      title: 'Data Export',
      icon: <Download className="h-5 w-5" />,
      description: 'Export formats and integration options',
      articles: [
        { title: 'JSON Export', time: '3 min read' },
        { title: 'CSV Export', time: '3 min read' },
        { title: 'HTML Export', time: '2 min read' },
        { title: 'API Integration', time: '8 min read' }
      ]
    },
    {
      id: 'security',
      title: 'Security & Best Practices',
      icon: <Shield className="h-5 w-5" />,
      description: 'Security guidelines and best practices',
      articles: [
        { title: 'Rate Limiting', time: '4 min read' },
        { title: 'Proxy Usage', time: '6 min read' },
        { title: 'Ethical Scraping', time: '5 min read' },
        { title: 'Legal Considerations', time: '7 min read' }
      ]
    }
  ]

  const quickStart = {
    title: 'Quick Start Example',
    description: 'Get started with a simple scraping job in minutes',
    steps: [
      {
        title: 'Create a New Job',
        code: `// Navigate to Dashboard > New Job
{
  "name": "Product Prices",
  "url": "https://example-store.com/products",
  "selectionType": "css",
  "selector": ".product-price",
  "frequency": "daily",
  "format": "json"
}`,
        language: 'json'
      },
      {
        title: 'API Request',
        code: `curl -X POST https://api.webscraperpro.com/jobs \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Product Prices",
    "url": "https://example-store.com/products",
    "selector": ".product-price"
  }'`,
        language: 'bash'
      },
      {
        title: 'Get Results',
        code: `// GET /api/jobs/{job_id}/results
{
  "status": "success",
  "itemCount": 25,
  "data": [
    {
      "text": "$29.99",
      "html": "<span class='product-price'>$29.99</span>",
      "attributes": {"class": "product-price"}
    }
  ]
}`,
        language: 'json'
      }
    ]
  }

  const filteredSections = sections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.articles.some(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Documentation
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Everything you need to know about WebScraper Pro. From quick start guides
              to advanced API documentation.
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </motion.div>

          {/* Quick Start */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Zap className="h-6 w-6 mr-2" />
                  {quickStart.title}
                </CardTitle>
                <CardDescription className="text-blue-100">
                  {quickStart.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {quickStart.steps.map((step, index) => (
                    <div key={index} className="bg-white/10 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-sm">{step.title}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(step.code, `quick-${index}`)}
                          className="text-white hover:bg-white/20 h-6 w-6 p-0"
                        >
                          {copiedCode === `quick-${index}` ? (
                            <CheckCircle className="h-3 w-3" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                      <pre className="text-xs bg-black/20 rounded p-2 overflow-x-auto">
                        <code>{step.code}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Documentation Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg text-blue-600 mr-3">
                        {section.icon}
                      </div>
                      {section.title}
                    </CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {section.articles.map((article, articleIndex) => (
                        <div
                          key={articleIndex}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center space-x-3">
                            <BookOpen className="h-4 w-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                              {article.title}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="text-xs">
                              {article.time}
                            </Badge>
                            <ArrowRight className="h-3 w-3 text-gray-400 group-hover:text-blue-600" />
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      View All Articles
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Additional Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Additional Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-4">
                    <BookOpen className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Video Tutorials</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Step-by-step video guides for common tasks
                  </p>
                  <Button variant="outline" size="sm">
                    Watch Now
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="p-3 bg-purple-100 rounded-full w-fit mx-auto mb-4">
                    <Code className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Code Examples</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Ready-to-use code snippets and templates
                  </p>
                  <Button variant="outline" size="sm">
                    Browse Code
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="p-3 bg-orange-100 rounded-full w-fit mx-auto mb-4">
                    <Settings className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Community Forum</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Get help from other developers and experts
                  </p>
                  <Button variant="outline" size="sm">
                    Join Forum
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}