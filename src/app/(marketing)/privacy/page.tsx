'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { motion } from 'framer-motion'
import {
  Shield,
  Lock,
  Eye,
  Database,
  Users,
  Globe,
  Settings,

  CheckCircle,
  Mail,
  Cookie,
  FileText
} from 'lucide-react'

export default function PrivacyPage() {
  const lastUpdated = "January 1, 2024"

  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
      icon: <Shield className="h-5 w-5" />,
      content: `WebScraper Pro ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our web scraping service.

This policy applies to all users of our service and covers both personal information we collect about you and data you collect using our platform.`
    },
    {
      id: 'information-we-collect',
      title: 'Information We Collect',
      icon: <Database className="h-5 w-5" />,
      content: `We collect several types of information:

**Personal Information:**
• Name and email address (for account creation)
• Billing information (processed securely through third-party payment processors)
• Profile information you choose to provide

**Usage Information:**
• Scraping job configurations and results
• API usage logs and statistics
• Service usage patterns and preferences
• Technical information about your device and browser

**Automatically Collected Information:**
• IP addresses and location data
• Browser type and version
• Operating system information
• Cookies and similar tracking technologies`
    },
    {
      id: 'how-we-use-information',
      title: 'How We Use Your Information',
      icon: <Settings className="h-5 w-5" />,
      content: `We use the information we collect to:

• Provide and maintain our scraping service
• Process payments and manage subscriptions
• Send important service notifications and updates
• Provide customer support and respond to inquiries
• Improve our service and develop new features
• Ensure compliance with our terms of service
• Detect and prevent fraud or abuse
• Comply with legal obligations

We do not sell, rent, or share your personal information with third parties for their marketing purposes.`
    },
    {
      id: 'data-you-collect',
      title: 'Data You Collect Through Our Service',
      icon: <Globe className="h-5 w-5" />,
      content: `When you use our service to scrape websites, you are responsible for:

• Ensuring you have the legal right to collect the data
• Complying with applicable privacy laws (GDPR, CCPA, etc.)
• Respecting website terms of service and robots.txt files
• Obtaining necessary consents for personal data collection

We do not claim ownership of data you collect, but we may temporarily store it to provide our service. You are solely responsible for the lawful use of collected data.`
    },
    {
      id: 'data-sharing',
      title: 'Information Sharing and Disclosure',
      icon: <Users className="h-5 w-5" />,
      content: `We may share your information in the following circumstances:

**Service Providers:**
We work with trusted third-party service providers who help us operate our business, including payment processors, cloud hosting providers, and analytics services.

**Legal Requirements:**
We may disclose information if required by law, court order, or government request, or to protect our rights and safety.

**Business Transfers:**
In the event of a merger, acquisition, or sale of assets, user information may be transferred as part of the transaction.

**With Your Consent:**
We may share information for other purposes with your explicit consent.`
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: <Lock className="h-5 w-5" />,
      content: `We implement appropriate technical and organizational security measures to protect your information:

• Encryption of data in transit and at rest
• Regular security assessments and updates
• Access controls and authentication requirements
• Secure data centers with physical security measures
• Employee training on data protection practices

However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.`
    },
    {
      id: 'data-retention',
      title: 'Data Retention',
      icon: <Database className="h-5 w-5" />,
      content: `We retain your information for as long as necessary to provide our services and comply with legal obligations:

• Account information: Retained while your account is active and for a reasonable period after closure
• Billing information: Retained as required by law and for tax purposes
• Usage logs: Typically retained for 12 months for service improvement and security purposes
• Scraped data: Stored according to your plan limits and deleted when you choose to delete it

You can request deletion of your personal information at any time, subject to legal retention requirements.`
    },
    {
      id: 'cookies',
      title: 'Cookies and Tracking Technologies',
      icon: <Cookie className="h-5 w-5" />,
      content: `We use cookies and similar technologies to:

• Maintain your login session
• Remember your preferences and settings
• Analyze service usage and performance
• Provide personalized experiences

You can control cookie settings through your browser, but disabling cookies may affect service functionality.

**Types of Cookies We Use:**
• Essential cookies (required for service operation)
• Analytics cookies (to understand usage patterns)
• Preference cookies (to remember your settings)`
    },
    {
      id: 'your-rights',
      title: 'Your Privacy Rights',
      icon: <Eye className="h-5 w-5" />,
      content: `Depending on your location, you may have the following rights:

**Access:** Request a copy of the personal information we hold about you
**Correction:** Request correction of inaccurate or incomplete information
**Deletion:** Request deletion of your personal information
**Portability:** Request transfer of your data to another service
**Objection:** Object to certain processing of your information
**Restriction:** Request limitation of processing in certain circumstances

To exercise these rights, please contact us using the information provided below.`
    },
    {
      id: 'international-transfers',
      title: 'International Data Transfers',
      icon: <Globe className="h-5 w-5" />,
      content: `Our service operates globally, and your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for international transfers, including:

• Standard contractual clauses approved by relevant authorities
• Adequacy decisions by regulatory bodies
• Other legally recognized transfer mechanisms

We are committed to protecting your information regardless of where it is processed.`
    },
    {
      id: 'children-privacy',
      title: 'Children\'s Privacy',
      icon: <Users className="h-5 w-5" />,
      content: `Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.`
    },
    {
      id: 'changes',
      title: 'Changes to This Privacy Policy',
      icon: <FileText className="h-5 w-5" />,
      content: `We may update this Privacy Policy from time to time. We will notify you of any changes by:

• Posting the new Privacy Policy on this page
• Updating the "Last updated" date
• Sending you an email notification for material changes

We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.`
    },
    {
      id: 'contact',
      title: 'Contact Us',
      icon: <Mail className="h-5 w-5" />,
      content: `If you have any questions about this Privacy Policy or our privacy practices, please contact us:

**Email:** privacy@webscraperpro.com
**Address:** 123 Tech Street, San Francisco, CA 94105
**Phone:** +1 (555) 123-4567

For EU residents, you may also contact our Data Protection Officer at: dpo@webscraperpro.com`
    }
  ]

  const highlights = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Data Protection',
      description: 'We use industry-standard encryption and security measures'
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: 'Transparency',
      description: 'Clear information about what data we collect and how we use it'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Your Rights',
      description: 'Full control over your personal information and privacy settings'
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: 'Compliance',
      description: 'GDPR, CCPA, and other privacy regulation compliant'
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
              <div className="p-3 bg-green-100 rounded-full">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-gray-500">
              Last updated: {lastUpdated}
            </p>
          </motion.div>

          {/* Privacy Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          >
            {highlights.map((highlight, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-3 text-blue-600">
                    {highlight.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{highlight.title}</h3>
                  <p className="text-sm text-gray-600">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Privacy Policy Content */}
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
                        if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**')) {
                          return (
                            <h4 key={pIndex} className="font-semibold text-gray-900 mt-4 mb-2">
                              {paragraph.trim().slice(2, -2)}
                            </h4>
                          )
                        } else if (paragraph.trim().startsWith('•')) {
                          return (
                            <li key={pIndex} className="ml-4 mb-2 text-gray-700">
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

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12"
          >
            <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
              <CardContent className="p-8 text-center">
                <Mail className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Questions about Privacy?</h3>
                <p className="text-green-100 mb-6">
                  Our privacy team is here to help with any questions or concerns.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="mailto:privacy@webscraperpro.com"
                    className="inline-flex items-center justify-center px-6 py-3 bg-white text-green-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    Email Privacy Team
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 border border-white text-white rounded-lg font-medium hover:bg-white hover:text-green-600 transition-colors"
                  >
                    Contact Support
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