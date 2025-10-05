# 🎯 MergeMint

Track your merged GitHub pull requests automatically with MergeMint! Built with Next.js, Supabase, and TypeScript.

## ✨ Features

- 🔐 **GitHub OAuth Authentication** - Secure login with your GitHub account
- 📊 **PR Dashboard** - View all your merged PRs in one place
- 🪝 **Automatic Tracking** - GitHub webhooks automatically record merged PRs
- 📈 **Statistics** - See your total, completed, and pending PRs at a glance
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- 🔒 **Secure** - Row Level Security (RLS) ensures users only see their own data

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- A Supabase account ([sign up free](https://supabase.com))
- A GitHub account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd mergemint
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create `.env.local` in the project root:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Set up Supabase database**
   
   See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed instructions.

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:3000`

## 📖 Documentation

- **[MIGRATION_COMPLETE.md](./MIGRATION_COMPLETE.md)** - Complete migration guide and setup checklist
- **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** - Detailed Supabase configuration guide

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Database & Auth:** Supabase
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Heroicons
- **Animation:** Framer Motion

## 📁 Project Structure

```
mergemint/
├── app/
│   ├── api/webhook/github/    # GitHub webhook handler
│   ├── dashboard/             # Dashboard page
│   ├── page.tsx              # Login page
│   └── layout.tsx            # Root layout
├── components/
│   ├── Card.tsx              # Reusable card component
│   └── Sidebar.tsx           # Navigation sidebar
├── lib/
│   ├── supabase.ts          # Supabase client config
│   └── appwrite.ts          # (Commented out - legacy)
└── public/                   # Static assets
```

## 🔗 API Routes

### GitHub Webhook

**Endpoint:** `/api/webhook/github`

**Method:** `POST`

Handles GitHub webhook events for merged pull requests.

**Test it:**
```bash
curl http://localhost:3000/api/webhook/github
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Configure GitHub Webhook

After deployment:

1. Go to your GitHub repository → Settings → Webhooks
2. Add webhook with URL: `https://your-app.vercel.app/api/webhook/github`
3. Select "Pull requests" events
4. Save webhook

## 🎨 Features in Detail

### Authentication
- GitHub OAuth integration via Supabase Auth
- Automatic session management
- User profile with avatar

### Dashboard
- Real-time PR data from Supabase
- Statistics cards (total, completed, pending)
- Sortable PR list with status indicators
- Responsive design for all devices

### Webhook Integration
- Automatic PR tracking on merge
- User matching via GitHub username
- Duplicate prevention
- Error handling and logging

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 🆘 Support

Having issues? Check out:
- [MIGRATION_COMPLETE.md](./MIGRATION_COMPLETE.md) for troubleshooting
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)

---

Built with ❤️ by developers, for developers.
