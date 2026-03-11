import Link from 'next/link'
import { Globe } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-transparent border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Globe className="h-8 w-8 text-indigo-500" />
              <span className="text-xl font-bold text-white tracking-tight">WebScraper Pro</span>
            </Link>
            <p className="text-slate-400 max-w-md font-light leading-relaxed">
              Industrial-grade web scraping infrastructure. Extract data from any website with our powerful,
              easy-to-use platform. Scale your data collection effortlessly.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Platform</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/#features" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold text-white mb-4">Connect</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors text-sm">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col items-center">
          <p className="text-slate-500 text-sm font-light">
            © {new Date().getFullYear()} WebScraper Pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}