'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  MessageSquare,
  Book,
  Video,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  Lightbulb,
  Zap,
  Shield,
  Settings,

  Globe
} from 'lucide-react'

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All Topics', icon: <HelpCircle className="h-4 w-4" /> },
    { id: 'getting-started', label: 'Getting Started', icon: <Zap className="h-4 w-4" /> },
    { id: 'scraping', label: 'Web Scraping', icon: <Globe className="h-4 w-4" /> },
    { id: 'billing', label: 'Billing', icon: <CheckCircle className="h-4 w-4" /> },
    { id: 'technical', label: 'Technical', icon: <Settings className="h-4 w-4" /> },
    { id: 'security', label: 'Security', icon: <Shield className="h-4 w-4" /> }
  ]

  const faqs = [
    {
      id: 1,
      category: 'getting-started',
      question: 'How do I create my first scraping job?',
      answer: 'To create your first scraping job, navigate to your dashboard and click "New Job". Fill in the target URL, choose your selection method (CSS selector, XPath, ID, or tag), set the frequency, and click "Create Job". The job will be ready to run immediately.',
      popularity: 'high'
    },
    {
      id: 2,
      category: 'scraping',
      question: 'What\'s the difference between CSS selectors and XPath?',
      answer: 'CSS selectors are simpler and more commonly used for basic element selection (e.g., .class-name, #id). XPath is more powerful and can navigate complex document structures with advanced expressions like //div[@class=\'content\']//p[1]. Choose CSS for simplicity, XPath for complex selections.',
      popularity: 'high'
    },
    {
      id: 3,
      category: 'billing',
      question: 'How does the pricing work?',
      answer: 'Our pricing is based on the number of scrapes per month and concurrent jobs. The Starter plan includes 1,000 scrapes for $9/month, Professional includes 10,000 scrapes for $29/month, and Enterprise offers unlimited scraping for $99/month. All plans include our core features.',
      popularity: 'high'
    },
    {
      id: 4,
      category: 'technical',
      question: 'What happens if a scraping job fails?',
      answer: 'If a job fails, we automatically retry it up to 3 times with exponential backoff. You\'ll receive an email notification about the failure, and the error details will be available in your dashboard. Common causes include website changes, network issues, or invalid selectors.',
      popularity: 'medium'
    },
    {
      id: 5,
      category: 'scraping',
      question: 'Can I scrape websites that require login?',
      answer: 'Currently, our service works best with publicly accessible content. For websites requiring authentication, consider using our API with custom headers or contact our support team for enterprise solutions that may include session management.',
      popularity: 'medium'
    },
    {
      id: 6,
      category: 'security',
      question: 'Is web scraping legal?',
      answer: 'Web scraping legality depends on various factors including the website\'s terms of service, the type of data being scraped, and your intended use. We recommend reviewing robots.txt files, respecting rate limits, and consulting legal advice for commercial use. Our service includes built-in rate limiting to promote ethical scraping.',
      popularity: 'high'
    },
    {
      id: 7,
      category: 'technical',
      question: 'How often can I run scraping jobs?',
      answer: 'You can set jobs to run once, daily, weekly, or monthly. For more frequent scraping, consider our API which allows custom scheduling. Enterprise plans can include custom frequencies and real-time scraping capabilities.',
      popularity: 'medium'
    },
    {
      id: 8,
      category: 'billing',
      question: 'Can I change my plan anytime?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Upgrades take effect immediately, while downgrades take effect at the next billing cycle. Any unused scrapes from your current plan will be credited to your account.',
      popularity: 'low'
    },
    {
      id: 9,
      category: 'scraping',
      question: 'What data formats can I export?',
      answer: 'We support JSON, CSV, and HTML export formats. JSON is best for developers and API integration, CSV works great with spreadsheet applications, and HTML preserves the original formatting. You can change the export format for each job.',
      popularity: 'medium'
    },
    {
      id: 10,
      category: 'technical',
      question: 'Do you provide an API?',
      answer: 'Yes! We offer a comprehensive REST API that allows you to create jobs, retrieve results, and manage your account programmatically. API access is included with Professional and Enterprise plans. Check our documentation for detailed endpoints and examples.',
      popularity: 'high'
    }
  ]

  const quickActions = [
    {
      title: 'Contact Support',
      description: 'Get help from our support team',
      icon: <MessageSquare className="h-6 w-6" />,
      action: '/contact',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Documentation',
      description: 'Browse our complete documentation',
      icon: <Book className="h-6 w-6" />,
      action: '/docs',
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Video Tutorials',
      description: 'Watch step-by-step guides',
      icon: <Video className="h-6 w-6" />,
      action: '#',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'System Status',
      description: 'Check our service status',
      icon: <CheckCircle className="h-6 w-6" />,
      action: '#',
      color: 'bg-green-100 text-green-600'
    }
  ]

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id)
  }

  const getPriorityIcon = (popularity: string) => {
    switch (popularity) {
      case 'high':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case 'medium':
        return <Info className="h-4 w-4 text-yellow-500" />
      default:
        return <Lightbulb className="h-4 w-4 text-gray-400" />
    }
  }

  const getPriorityLabel = (popularity: string) => {
    switch (popularity) {
      case 'high':
        return 'Popular'
      case 'medium':
        return 'Common'
      default:
        return 'General'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
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
              Help Center
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Find answers to common questions, browse our documentation, or get in touch
              with our support team.
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          >
            {quickActions.map((action, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className={`p-3 rounded-full w-fit mx-auto mb-3 ${action.color}`}>
                    {action.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-1"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${selectedCategory === category.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'hover:bg-gray-100'
                          }`}
                      >
                        {category.icon}
                        <span className="text-sm font-medium">{category.label}</span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Need More Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">Email Support</p>
                      <p className="text-xs text-gray-600">support@webscraperpro.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">Phone Support</p>
                      <p className="text-xs text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">Business Hours</p>
                      <p className="text-xs text-gray-600">Mon-Fri: 8am-6pm PST</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-600">
                  {filteredFaqs.length} question{filteredFaqs.length !== 1 ? 's' : ''} found
                  {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.label}`}
                </p>
              </div>

              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden">
                      <div
                        className="cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => toggleFaq(faq.id)}
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center space-x-2">
                                {getPriorityIcon(faq.popularity)}
                                <Badge variant="secondary" className="text-xs">
                                  {getPriorityLabel(faq.popularity)}
                                </Badge>
                              </div>
                              <CardTitle className="text-base">{faq.question}</CardTitle>
                            </div>
                            {expandedFaq === faq.id ? (
                              <ChevronDown className="h-5 w-5 text-gray-400" />
                            ) : (
                              <ChevronRight className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                        </CardHeader>
                      </div>
                      <AnimatePresence>
                        {expandedFaq === faq.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CardContent className="pt-0">
                              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                            </CardContent>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {filteredFaqs.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No results found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search or browse different categories
                  </p>
                  <Button variant="outline" onClick={() => setSearchQuery('')}>
                    Clear Search
                  </Button>
                </motion.div>
              )}

              {/* Still Need Help */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-12"
              >
                <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <CardContent className="p-8 text-center">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Still need help?</h3>
                    <p className="text-blue-100 mb-6">
                      Can't find what you're looking for? Our support team is here to help.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button variant="secondary" asChild>
                        <Link href="/contact">Contact Support</Link>
                      </Button>
                      <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600" asChild>
                        <Link href="/docs">Browse Documentation</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div >
      </section >


    </div >
  )
}