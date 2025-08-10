'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UserProfile } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import {
  User,
  Key,
  Webhook,
  CreditCard,

} from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center">
            <Key className="h-4 w-4 mr-2" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="webhooks" className="flex items-center">
            <Webhook className="h-4 w-4 mr-2" />
            Webhooks
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center">
            <CreditCard className="h-4 w-4 mr-2" />
            Billing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Profile Settings
                </CardTitle>
                <CardDescription>
                  Manage your account profile and personal information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UserProfile />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="h-5 w-5 mr-2" />
                  API Keys
                </CardTitle>
                <CardDescription>
                  Manage your API keys for programmatic access to your scraping jobs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Coming Soon</h4>
                  <p className="text-sm text-blue-700">
                    API key management will be available in a future update. You'll be able to generate
                    and manage API keys for programmatic access to your scraping jobs.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="api-key">Primary API Key</Label>
                    <div className="flex space-x-2 mt-1">
                      <Input
                        id="api-key"
                        type="password"
                        value="sk_test_••••••••••••••••••••••••••••••••"
                        readOnly
                        className="flex-1"
                      />
                      <Button variant="outline" disabled>
                        Regenerate
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Keep your API key secure and don't share it publicly
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Webhook className="h-5 w-5 mr-2" />
                  Webhook Settings
                </CardTitle>
                <CardDescription>
                  Configure webhooks to receive notifications when scraping jobs complete
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Coming Soon</h4>
                  <p className="text-sm text-blue-700">
                    Webhook configuration will be available in a future update. You'll be able to set up
                    webhooks to receive real-time notifications about your scraping jobs.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="webhook-url">Webhook URL</Label>
                    <Input
                      id="webhook-url"
                      type="url"
                      placeholder="https://your-app.com/webhooks/scraper"
                      disabled
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      We'll send POST requests to this URL when jobs complete
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="webhook-secret">Webhook Secret</Label>
                    <Input
                      id="webhook-secret"
                      type="password"
                      placeholder="Your webhook secret for verification"
                      disabled
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Used to verify webhook authenticity
                    </p>
                  </div>

                  <Button disabled>
                    Save Webhook Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Billing & Subscription
                </CardTitle>
                <CardDescription>
                  Manage your subscription and billing information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Coming Soon</h4>
                  <p className="text-sm text-blue-700">
                    Billing and subscription management will be available in a future update.
                    You'll be able to upgrade your plan, manage payment methods, and view invoices.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Current Plan</h4>
                    <p className="text-2xl font-bold text-blue-600 mb-1">Free Trial</p>
                    <p className="text-sm text-gray-600">
                      100 scrapes remaining this month
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Usage This Month</h4>
                    <p className="text-2xl font-bold text-gray-900 mb-1">0 / 100</p>
                    <p className="text-sm text-gray-600">
                      Scrapes used
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Payment Method</h4>
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <p className="text-sm text-gray-600">
                      No payment method on file
                    </p>
                  </div>
                  <Button disabled>
                    Add Payment Method
                  </Button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Upgrade Plan</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-2">Professional</h5>
                      <p className="text-2xl font-bold text-gray-900 mb-2">$29<span className="text-sm font-normal">/month</span></p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 10,000 scrapes per month</li>
                        <li>• 25 concurrent jobs</li>
                        <li>• Priority support</li>
                      </ul>
                      <Button className="w-full mt-4" disabled>
                        Upgrade to Professional
                      </Button>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-2">Enterprise</h5>
                      <p className="text-2xl font-bold text-gray-900 mb-2">$99<span className="text-sm font-normal">/month</span></p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Unlimited scrapes</li>
                        <li>• Unlimited concurrent jobs</li>
                        <li>• 24/7 phone support</li>
                      </ul>
                      <Button className="w-full mt-4" disabled>
                        Upgrade to Enterprise
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}