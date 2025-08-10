'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { motion } from 'framer-motion'
import {
  FileText,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Scale,
  Users,
  Globe
} from 'lucide-react'

export default function TermsPage() {
  const lastUpdated = "January 1, 2024"

  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: <CheckCircle className="h-5 w-5" />,
      content: `By accessing and using WebScraper Pro ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`
    },
    {
      id: 'description',
      title: 'Service Description',
      icon: <Globe className="h-5 w-5" />,
      content: `WebScraper Pro is a web scraping service that allows users to extract data from publicly available websites. Our service provides tools for automated data collection, scheduling, and export in various formats including JSON, CSV, and HTML.`
    },
    {
      id: 'acceptable-use',
      title: 'Acceptable Use Policy',
      icon: <Shield className="h-5 w-5" />,
      content: `You agree to use our service only for lawful purposes and in accordance with these Terms. You agree not to use the service:
      
• To scrape websites that explicitly prohibit scraping in their robots.txt file or terms of service
• To collect personal information without proper consent
• To overload or damage target websites with excessive requests
• To violate any applicable laws or regulations
• To infringe on intellectual property rights
• To collect data for spam, harassment, or malicious purposes
• To bypass security measures or access controls`
    },
    {
      id: 'user-accounts',
      title: 'User Accounts',
      icon: <Users className="h-5 w-5" />,
      content: `When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account. You agree not to disclose your password to any third party.`
    },
    {
      id: 'billing',
      title: 'Billing and Payment',
      icon: <Scale className="h-5 w-5" />,
      content: `Our service operates on a subscription basis. You will be billed in advance on a recurring basis (monthly or annually). Payment is due immediately upon subscription. We reserve the right to change our pricing at any time, with 30 days notice to existing subscribers.

Refunds are available within 30 days of initial subscription for new customers. No refunds are provided for partial months of service.`
    },
    {
      id: 'data-usage',
      title: 'Data Usage and Limits',
      icon: <FileText className="h-5 w-5" />,
      content: `Your subscription plan determines your monthly scraping limits and concurrent job allowances. Exceeding these limits may result in service suspension or additional charges. We implement rate limiting to ensure fair usage and protect target websites.

Data collected through our service is stored securely and is accessible to you through our platform. We do not claim ownership of the data you collect, but you are responsible for ensuring you have the right to collect and use such data.`
    },
    {
      id: 'prohibited-content',
      title: 'Prohibited Content and Activities',
      icon: <AlertTriangle className="h-5 w-5" />,
      content: `You may not use our service to collect or process:

• Copyrighted content without permission
• Personal data subject to privacy laws (GDPR, CCPA, etc.) without proper legal basis
• Content from websites that explicitly prohibit automated access
• Data for illegal activities or purposes
• Content that violates third-party rights

We reserve the right to suspend accounts that violate these restrictions.`
    },
    {
      id: 'service-availability',
      title: 'Service Availability',
      icon: <Clock className="h-5 w-5" />,
      content: `We strive to maintain high service availability but do not guarantee uninterrupted access. Scheduled maintenance will be announced in advance when possible. We are not liable for service interruptions beyond our reasonable control.`
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property',
      icon: <Shield className="h-5 w-5" />,
      content: `The WebScraper Pro service, including its original content, features, and functionality, is owned by us and is protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.

You retain ownership of data you collect through our service, subject to the rights of the original data owners and applicable laws.`
    },
    {
      id: 'limitation-liability',
      title: 'Limitation of Liability',
      icon: <Scale className="h-5 w-5" />,
      content: `In no event shall WebScraper Pro, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.`
    },
    {
      id: 'termination',
      title: 'Termination',
      icon: <AlertTriangle className="h-5 w-5" />,
      content: `We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms.

Upon termination, your right to use the service will cease immediately. If you wish to terminate your account, you may simply discontinue using the service.`
    },
    {
      id: 'changes',
      title: 'Changes to Terms',
      icon: <FileText className="h-5 w-5" />,
      content: `We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.`
    },
    {
      id: 'contact',
      title: 'Contact Information',
      icon: <Users className="h-5 w-5" />,
      content: `If you have any questions about these Terms of Service, please contact us at:

Email: legal@webscraperpro.com
Address: 123 Tech Street, San Francisco, CA 94105
Phone: +1 (555) 123-4567`
    }
  ]

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-blue-100 rounded-full">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
              Please read these terms and conditions carefully before using our service.
            </p>
            <p className="text-sm text-gray-500">
              Last updated: {lastUpdated}
            </p>
          </motion.div>

          {/* Terms Content */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <div className="p-2 bg-gray-100 rounded-lg text-gray-600 mr-3">
                        {section.icon}
                      </div>
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-gray max-w-none">
                      {section.content.split('\n').map((paragraph, pIndex) => {
                        if (paragraph.trim().startsWith('•')) {
                          return (
                            <li key={pIndex} className="ml-4 mb-2">
                              {paragraph.trim().substring(1).trim()}
                            </li>
                          )
                        } else if (paragraph.trim()) {
                          return (
                            <p key={pIndex} className="mb-4 text-gray-700 leading-relaxed">
                              {paragraph.trim()}
                            </p>
                          )
                        }
                        return null
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Footer Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12"
          >
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="p-8 text-center">
                <Scale className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Questions about our Terms?</h3>
                <p className="text-blue-100 mb-6">
                  Our legal team is here to help clarify any questions you may have.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    Contact Legal Team
                  </Link>
                  <Link
                    href="/help"
                    className="inline-flex items-center justify-center px-6 py-3 border border-white text-white rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors"
                  >
                    Visit Help Center
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

    </div>
  )
}