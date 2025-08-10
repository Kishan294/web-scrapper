'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { trpc } from '@/lib/trpc'
import { toast } from 'sonner'
import { ArrowLeft, Globe, Code, Clock, Download } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  url: z.string().url('Please enter a valid URL'),
  selectionType: z.enum(['css', 'xpath', 'id', 'tag']),
  selector: z.string().optional(),
  xpath: z.string().optional(),
  elementId: z.string().optional(),
  tagName: z.string().optional(),
  frequency: z.enum(['once', 'daily', 'weekly', 'monthly']),
  format: z.enum(['json', 'csv', 'html']),
  description: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

export default function NewScraperPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      url: '',
      selectionType: 'css',
      selector: '',
      xpath: '',
      elementId: '',
      tagName: '',
      frequency: 'once',
      format: 'json',
      description: '',
    },
  })

  const createJobMutation = trpc.scraper.createJob.useMutation({
    onSuccess: (job) => {
      toast.success('Scraping job created successfully!')
      router.push(`/dashboard/scraper/${job.id}`)
    },
    onError: (error) => {
      toast.error(`Failed to create job: ${error.message}`)
      setIsSubmitting(false)
    },
  })

  const onSubmit = (data: FormData) => {
    setIsSubmitting(true)
    createJobMutation.mutate(data)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Scraping Job</h1>
          <p className="text-gray-600 mt-1">Set up a new web scraping job with custom parameters</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Job Configuration
              </CardTitle>
              <CardDescription>
                Configure your web scraping job parameters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Name</FormLabel>
                        <FormControl>
                          <Input placeholder="My Scraping Job" {...field} />
                        </FormControl>
                        <FormDescription>
                          A descriptive name for your scraping job
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com" {...field} />
                        </FormControl>
                        <FormDescription>
                          The website URL you want to scrape
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="selectionType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Selection Method</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select how to target elements" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="css">CSS Selector</SelectItem>
                            <SelectItem value="xpath">XPath</SelectItem>
                            <SelectItem value="id">Element ID</SelectItem>
                            <SelectItem value="tag">HTML Tag</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Choose how you want to select elements from the page
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Conditional fields based on selection type */}
                  {form.watch('selectionType') === 'css' && (
                    <FormField
                      control={form.control}
                      name="selector"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CSS Selector</FormLabel>
                          <FormControl>
                            <Input placeholder=".product-title, .content, div.main" {...field} />
                          </FormControl>
                          <FormDescription>
                            CSS selector to target specific elements (e.g., .class-name, #id, div.container)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {form.watch('selectionType') === 'xpath' && (
                    <FormField
                      control={form.control}
                      name="xpath"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>XPath Expression</FormLabel>
                          <FormControl>
                            <Input placeholder="//div[@class='content']//p" {...field} />
                          </FormControl>
                          <FormDescription>
                            XPath expression for element selection (e.g., //div[@class='content'])
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {form.watch('selectionType') === 'id' && (
                    <FormField
                      control={form.control}
                      name="elementId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Element ID</FormLabel>
                          <FormControl>
                            <Input placeholder="main-content" {...field} />
                          </FormControl>
                          <FormDescription>
                            The ID of the element you want to scrape (without the # symbol)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {form.watch('selectionType') === 'tag' && (
                    <FormField
                      control={form.control}
                      name="tagName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>HTML Tag Name</FormLabel>
                          <FormControl>
                            <Input placeholder="h1, p, div, article" {...field} />
                          </FormControl>
                          <FormDescription>
                            HTML tag name to select (e.g., h1, p, div, article)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="frequency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Frequency</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select frequency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="once">Run Once</SelectItem>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            How often should this job run?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="format"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Export Format</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select format" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="json">JSON</SelectItem>
                              <SelectItem value="csv">CSV</SelectItem>
                              <SelectItem value="html">HTML</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Preferred export format for results
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Brief description of what this job does..." {...field} />
                        </FormControl>
                        <FormDescription>
                          Optional description for this scraping job
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex space-x-4">
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Creating...' : 'Create Job'}
                    </Button>
                    <Button type="button" variant="outline" asChild>
                      <Link href="/dashboard">Cancel</Link>
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Help Panel */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-sm">
                  <Code className="h-4 w-4 mr-2" />
                  Selection Methods
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-3">
                <div>
                  <strong className="text-blue-600">CSS Selector</strong>
                  <div className="mt-1 space-y-1">
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">.class-name</code>
                    <p className="text-gray-600 text-xs">Select by class</p>
                  </div>
                </div>
                <div>
                  <strong className="text-green-600">Element ID</strong>
                  <div className="mt-1 space-y-1">
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">main-content</code>
                    <p className="text-gray-600 text-xs">Select by unique ID</p>
                  </div>
                </div>
                <div>
                  <strong className="text-purple-600">HTML Tag</strong>
                  <div className="mt-1 space-y-1">
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">h1, p, div</code>
                    <p className="text-gray-600 text-xs">Select by tag name</p>
                  </div>
                </div>
                <div>
                  <strong className="text-orange-600">XPath</strong>
                  <div className="mt-1 space-y-1">
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">{'//div[@class=\'content\']'}</code>
                    <p className="text-gray-600 text-xs">Advanced XML path</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2" />
                  Frequency Options
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div>
                  <strong>Once:</strong> Run immediately, no scheduling
                </div>
                <div>
                  <strong>Daily:</strong> Run every 24 hours
                </div>
                <div>
                  <strong>Weekly:</strong> Run every 7 days
                </div>
                <div>
                  <strong>Monthly:</strong> Run every 30 days
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Formats
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div>
                  <strong>JSON:</strong> Structured data format
                </div>
                <div>
                  <strong>CSV:</strong> Spreadsheet compatible
                </div>
                <div>
                  <strong>HTML:</strong> Formatted web page
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}