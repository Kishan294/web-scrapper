# WebScraper Pro - Professional Web Scraping SaaS

A complete, production-ready web scraping SaaS platform built with Next.js 15, featuring modern authentication, database management, and a beautiful UI.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15 with App Router, TypeScript, Tailwind CSS v4
- **Authentication**: Clerk for secure user management
- **Database**: MongoDB with Prisma ORM
- **API**: Type-safe tRPC for backend communication
- **UI Components**: Shadcn/ui with light mode design
- **Web Scraping**: Cheerio for HTML parsing with CSS selectors and XPath
- **Scheduling**: Configurable scraping frequencies (once, daily, weekly, monthly)
- **Export Formats**: JSON, CSV, and HTML export options
- **Real-time Updates**: React Query for data fetching and caching
- **Animations**: Framer Motion for smooth transitions
- **Responsive Design**: Mobile-first responsive layout

## 🛠 Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first CSS framework (light mode only)
- **Shadcn/ui** - Modern, accessible UI components
- **Framer Motion** - Animation library
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation

### Backend

- **tRPC** - Type-safe API layer
- **Prisma** - Database ORM
- **MongoDB** - NoSQL database
- **Clerk** - Authentication and user management
- **Axios** - HTTP client for web scraping
- **Cheerio** - Server-side HTML parsing

### Development

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd web-scraper-saas
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Copy `.env.example` to `.env` and fill in your values:

   ```env
   # Database
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/webscraper?retryWrites=true&w=majority"

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
   CLERK_SECRET_KEY=sk_test_your_secret_key_here
   CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

   # App Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_here

   # Optional: Stripe (for billing)
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   ```

4. **Set up the database**

   ```bash
   pnpm db:push
   ```

5. **Generate Prisma client**

   ```bash
   pnpm db:generate
   ```

6. **Run the development server**

   ```bash
   pnpm dev
   ```

7. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Clerk Setup

1. Create a Clerk account at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy your publishable key and secret key to `.env`
4. Configure sign-in/sign-up URLs in Clerk dashboard
5. Set up webhooks for user synchronization (optional)

### MongoDB Setup

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Add it to your `.env` file as `DATABASE_URL`

### Prisma Setup

The database schema includes:

- **User**: Stores user information synced from Clerk
- **ScrapeJob**: Stores scraping job configurations
- **ScrapeResult**: Stores scraping results and data

## 📱 Usage

### Creating a Scraping Job

1. Sign up/Sign in to your account
2. Navigate to the Dashboard
3. Click "New Scraping Job"
4. Configure your job:
   - **Name**: Descriptive name for your job
   - **URL**: Target website URL
   - **CSS Selector**: Optional CSS selector for specific elements
   - **XPath**: Optional XPath expression
   - **Frequency**: How often to run (once, daily, weekly, monthly)
   - **Format**: Export format (JSON, CSV, HTML)

### Running Jobs

- Jobs can be run manually from the dashboard
- Scheduled jobs will run automatically based on frequency
- View results in real-time
- Export data in multiple formats

### Managing Results

- View all scraping results in a paginated table
- Export individual results as JSON, CSV, or HTML
- Monitor job status and error logs
- Track scraping history and analytics

## 🏗 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── api/               # API routes (tRPC, webhooks)
│   ├── sign-in/           # Authentication pages
│   └── sign-up/
├── components/            # React components
│   ├── ui/               # Shadcn/ui components
│   ├── navbar.tsx        # Navigation component
│   ├── footer.tsx        # Footer component
│   └── providers.tsx     # App providers
├── lib/                  # Utility libraries
│   ├── db.ts            # Database connection
│   ├── trpc.ts          # tRPC client setup
│   └── utils.ts         # Utility functions
├── server/               # tRPC server setup
│   ├── routers/         # API route handlers
│   ├── context.ts       # tRPC context
│   └── trpc.ts          # tRPC server config
└── middleware.ts         # Clerk middleware
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔒 Security Features

- **Authentication**: Secure user authentication with Clerk
- **Authorization**: Protected routes and API endpoints
- **Data Validation**: Zod schema validation on all inputs
- **Rate Limiting**: Built-in protection against abuse
- **CORS**: Proper CORS configuration
- **Environment Variables**: Secure configuration management

## 🎨 UI/UX Features

- **Light Mode Only**: Clean, professional light theme
- **Responsive Design**: Works on all device sizes
- **Smooth Animations**: Framer Motion animations
- **Loading States**: Skeleton components and loading indicators
- **Error Handling**: User-friendly error messages
- **Toast Notifications**: Real-time feedback with Sonner

## 📊 Analytics & Monitoring

- **Job Statistics**: Track completed, failed, and total jobs
- **Result Analytics**: Monitor scraping success rates
- **User Dashboard**: Comprehensive overview of user activity
- **Error Logging**: Detailed error tracking and reporting

## 🔮 Future Enhancements

- **API Keys**: Programmatic access to scraping jobs
- **Webhooks**: Real-time notifications for job completion
- **Stripe Integration**: Subscription billing and payments
- **Advanced Scheduling**: Cron-like scheduling options
- **Proxy Support**: Rotating proxy integration
- **CAPTCHA Handling**: Automated CAPTCHA solving
- **Browser Automation**: Playwright/Puppeteer integration
- **Data Transformation**: Built-in data processing pipelines

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email support@webscraperpro.com or join our Discord community.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - The React framework
- [Clerk](https://clerk.com) - Authentication platform
- [Prisma](https://prisma.io) - Database toolkit
- [Shadcn/ui](https://ui.shadcn.com) - UI component library
- [tRPC](https://trpc.io) - Type-safe APIs
