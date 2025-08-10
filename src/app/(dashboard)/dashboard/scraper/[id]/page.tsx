'use client'


import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { trpc } from '@/lib/trpc'
import { toast } from 'sonner'
import {
  ArrowLeft,
  Play,
  Download,
  Clock,
  CheckCircle,
  XCircle,
  Globe,
  Calendar,
  FileText,
  Trash2
} from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { format } from 'date-fns'

export default function ScraperJobPage() {
  const params = useParams()
  const router = useRouter()
  const jobId = params.id as string

  const { data: job, isLoading, refetch } = trpc.scraper.getJob.useQuery({ id: jobId })

  const runJobMutation = trpc.scraper.runJob.useMutation({
    onSuccess: () => {
      toast.success('Scraping job started successfully!')
      refetch()
    },
    onError: (error) => {
      toast.error(`Failed to run job: ${error.message}`)
    },
  })

  const deleteJobMutation = trpc.scraper.deleteJob.useMutation({
    onSuccess: () => {
      toast.success('Job deleted successfully!')
      router.push('/dashboard')
    },
    onError: (error) => {
      toast.error(`Failed to delete job: ${error.message}`)
    },
  })

  const handleRunJob = () => {
    runJobMutation.mutate({ id: jobId })
  }

  const handleDeleteJob = () => {
    if (confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
      deleteJobMutation.mutate({ id: jobId })
    }
  }

  const handleExportResult = (result: any, format: string) => {
    let content = ''
    let filename = ''
    let mimeType = ''

    switch (format) {
      case 'json':
        content = JSON.stringify(result.data, null, 2)
        filename = `scrape-result-${result.id}.json`
        mimeType = 'application/json'
        break
      case 'csv':
        if (Array.isArray(result.data) && result.data.length > 0) {
          const headers = Object.keys(result.data[0])
          const csvContent = [
            headers.join(','),
            ...result.data.map((row: any) =>
              headers.map(header => JSON.stringify(row[header] || '')).join(',')
            )
          ].join('\n')
          content = csvContent
        } else {
          content = 'No data available'
        }
        filename = `scrape-result-${result.id}.csv`
        mimeType = 'text/csv'
        break
      case 'html':
        content = `
          <!DOCTYPE html>
          <html></html>        <head>
            <title>Scrape Result</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .result { margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
              pre { background: #f5f5f5; padding: 10px; border-radius: 3px; overflow-x: auto; }
            </style>
          </head>
          <body>
            <h1>Scrape Result</h1>
            <div class="result">
              <pre>${JSON.stringify(result.data, null, 2)}</pre>
            </div>
          </body>
          </html>
        `
        filename = `scrape-result-${result.id}.html`
        mimeType = 'text/html'
        break
    }

    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'running':
        return 'bg-blue-100 text-blue-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />
      case 'running':
        return <Clock className="h-4 w-4" />
      case 'failed':
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-10 w-32" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-96 w-full" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="max-w-6xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
        <p className="text-gray-600 mb-6">The scraping job you're looking for doesn't exist.</p>
        <Button asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{job.name || 'Unnamed Job'}</h1>
            <p className="text-gray-600 mt-1">{job.description || job.url}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={handleRunJob}
            disabled={runJobMutation.isPending || job.status === 'running'}
          >
            <Play className="h-4 w-4 mr-2" />
            {job.status === 'running' ? 'Running...' : 'Run Job'}
          </Button>
          <Button
            variant="destructive"
            onClick={handleDeleteJob}
            disabled={deleteJobMutation.isPending}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Globe className="h-5 w-5 mr-2" />
                    Job Status
                  </span>
                  <Badge className={getStatusColor(job.status)}>
                    {getStatusIcon(job.status)}
                    <span className="ml-1 capitalize">{job.status}</span>
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">URL</p>
                    <p className="text-sm text-gray-900 truncate">{job.url}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Frequency</p>
                    <p className="text-sm text-gray-900 capitalize">{job.frequency}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Format</p>
                    <p className="text-sm text-gray-900 uppercase">{job.format}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Results</p>
                    <p className="text-sm text-gray-900">{job.results.length}</p>
                  </div>
                </div>
                {(job.selector || job.xpath) && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm font-medium text-gray-500 mb-2">Selectors</p>
                    {job.selector && (
                      <div className="mb-2">
                        <span className="text-xs font-medium text-gray-500">CSS:</span>
                        <code className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded">{job.selector}</code>
                      </div>
                    )}
                    {job.xpath && (
                      <div>
                        <span className="text-xs font-medium text-gray-500">XPath:</span>
                        <code className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded">{job.xpath}</code>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Scraping Results</CardTitle>
                <CardDescription>
                  History of all scraping runs for this job
                </CardDescription>
              </CardHeader>
              <CardContent>
                {job.results.length > 0 ? (
                  <Tabs defaultValue="table" className="w-full">
                    <TabsList>
                      <TabsTrigger value="table">Table View</TabsTrigger>
                      <TabsTrigger value="json">JSON View</TabsTrigger>
                    </TabsList>
                    <TabsContent value="table">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {job.results.map((result) => (
                            <TableRow key={result.id}>
                              <TableCell>
                                {format(new Date(result.createdAt), 'MMM dd, yyyy HH:mm')}
                              </TableCell>
                              <TableCell>
                                <Badge className={result.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                  {result.status === 'success' ? (
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                  ) : (
                                    <XCircle className="h-3 w-3 mr-1" />
                                  )}
                                  {result.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{result.itemCount}</TableCell>
                              <TableCell>
                                {result.status === 'success' && (
                                  <div className="flex space-x-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleExportResult(result, 'json')}
                                    >
                                      <Download className="h-3 w-3 mr-1" />
                                      JSON
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleExportResult(result, 'csv')}
                                    >
                                      <Download className="h-3 w-3 mr-1" />
                                      CSV
                                    </Button>
                                  </div>
                                )}
                                {result.error && (
                                  <p className="text-xs text-red-600 mt-1">{result.error}</p>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TabsContent>
                    <TabsContent value="json">
                      <div className="space-y-4">
                        {job.results.map((result) => (
                          <div key={result.id} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">
                                {format(new Date(result.createdAt), 'MMM dd, yyyy HH:mm')}
                              </span>
                              <Badge className={result.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                {result.status}
                              </Badge>
                            </div>
                            <pre className="text-xs bg-gray-50 p-3 rounded overflow-x-auto">
                              {JSON.stringify(result.data, null, 2)}
                            </pre>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No results yet</h3>
                    <p className="text-gray-600 mb-4">
                      Run this job to see scraping results
                    </p>
                    <Button onClick={handleRunJob} disabled={runJobMutation.isPending}>
                      <Play className="h-4 w-4 mr-2" />
                      Run Job Now
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Information
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-3">
                <div>
                  <p className="font-medium text-gray-500">Created</p>
                  <p>{format(new Date(job.createdAt), 'MMM dd, yyyy HH:mm')}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-500">Last Updated</p>
                  <p>{format(new Date(job.updatedAt), 'MMM dd, yyyy HH:mm')}</p>
                </div>
                {job.lastRunAt && (
                  <div>
                    <p className="font-medium text-gray-500">Last Run</p>
                    <p>{format(new Date(job.lastRunAt), 'MMM dd, yyyy HH:mm')}</p>
                  </div>
                )}
                {job.nextRunAt && (
                  <div>
                    <p className="font-medium text-gray-500">Next Run</p>
                    <p>{format(new Date(job.nextRunAt), 'MMM dd, yyyy HH:mm')}</p>
                  </div>
                )}
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
                <CardTitle className="text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  size="sm"
                  className="w-full"
                  onClick={handleRunJob}
                  disabled={runJobMutation.isPending || job.status === 'running'}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Run Now
                </Button>
                <Button size="sm" variant="outline" className="w-full" asChild>
                  <Link href={job.url} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4 mr-2" />
                    Visit URL
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}