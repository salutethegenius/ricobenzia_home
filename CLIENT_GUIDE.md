# RicoBenzia Client Management Guide

> Complete guide for managing and maintaining your RicoBenzia website

## Table of Contents

1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [Environment Setup](#environment-setup)
4. [Deployment on Vercel](#deployment-on-vercel)
5. [Content Management System (CMS)](#content-management-system-cms)
6. [Managing Contact Messages](#managing-contact-messages)
7. [Updating Website Content](#updating-website-content)
8. [Admin Access](#admin-access)
9. [GitHub Integration](#github-integration)
10. [Troubleshooting](#troubleshooting)
11. [Advanced Configuration](#advanced-configuration)

---

## Overview

RicoBenzia is a modern Web3 portal built with:
- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **Database & Auth**: Supabase
- **Hosting**: Vercel
- **Version Control**: GitHub
- **Blockchain**: Polygon network (via RainbowKit/Wagmi)

### Key Features

- ✅ Content Management System (CMS) via Supabase
- ✅ Admin dashboard for content editing
- ✅ Contact form with message storage
- ✅ Wallet connection (MetaMask, WalletConnect, etc.)
- ✅ NFT-gated video room
- ✅ Privacy Policy & Terms of Service pages
- ✅ Responsive design (mobile, tablet, desktop)

---

## Getting Started

### Prerequisites

Before managing the site, ensure you have:

1. **GitHub Account** - Access to the repository
2. **Vercel Account** - For hosting and deployment
3. **Supabase Account** - For database and CMS
4. **Admin Credentials** - Email/password for CMS access

### Initial Setup Checklist

- [ ] GitHub repository access confirmed
- [ ] Vercel project linked to GitHub repo
- [ ] Supabase project created and configured
- [ ] Environment variables set in Vercel
- [ ] Admin user created in Supabase
- [ ] Database tables created (content, messages)
- [ ] First deployment successful

---

## Environment Setup

### Required Environment Variables

Your site requires the following environment variables (set in Vercel):

| Variable | Description | Where to Find |
|----------|-------------|---------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Supabase Dashboard → Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous/public key | Supabase Dashboard → Settings → API |

### Setting Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your RicoBenzia project
3. Navigate to **Settings** → **Environment Variables**
4. Add each variable:
   - Key: `VITE_SUPABASE_URL`
   - Value: `https://xxxxx.supabase.co` (your Supabase URL)
   - Environment: Production, Preview, Development
5. Repeat for `VITE_SUPABASE_ANON_KEY`
6. **Redeploy** your site after adding variables

⚠️ **Important**: After adding/modifying environment variables, you must redeploy for changes to take effect.

---

## Deployment on Vercel

### Initial Deployment

1. **Connect GitHub Repository**
   - In Vercel dashboard, click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Vite project

2. **Configure Build Settings**
   - Framework Preset: Vite (auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Add Environment Variables** (see section above)

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live at `your-project.vercel.app`

### Custom Domain Setup

1. In Vercel project settings, go to **Domains**
2. Add your custom domain (e.g., `ricobenzia.com`)
3. Follow DNS configuration instructions
4. Wait for DNS propagation (may take 24-48 hours)

### Automatic Deployments

Vercel automatically deploys when you:
- Push to `main` branch → **Production deployment**
- Push to other branches → **Preview deployment**
- Open a Pull Request → **Preview deployment**

### Manual Deployment

- Go to Vercel dashboard → Your Project → **Deployments**
- Click "Redeploy" on any deployment to rebuild

---

## Content Management System (CMS)

### Accessing the CMS

1. Navigate to `https://your-domain.com/admin/login`
2. Log in with your admin credentials
3. You'll see the CMS Dashboard with all editable sections

### CMS Structure

The CMS organizes content by **sections** and **fields**:

- **Sections**: Hero, About, Resources, Club House, Gameroom, Charts, DeFi, Contact, Privacy Policy, Terms of Service
- **Fields**: Each section has specific editable fields (titles, descriptions, content, JSON data)

### How Content is Stored

- All content is stored in Supabase `content` table
- Format: `{ section: "hero", field: "title", value: "..." }`
- Content is fetched dynamically on page load
- Changes are saved immediately to the database

---

## Managing Contact Messages

### Viewing Messages

1. Log into Supabase Dashboard
2. Go to **Table Editor** → `messages` table
3. You'll see all submitted contact form messages

### Message Fields

- `id` - Unique message ID
- `name` - Sender's name
- `email` - Sender's email
- `message` - Message content
- `created_at` - Timestamp
- `read` - Boolean flag (mark as read/unread)

### Managing Messages

**Mark as Read/Unread:**
- Toggle the `read` checkbox in the table

**Export Messages:**
- Use Supabase table export feature
- Or query via SQL Editor for custom exports

**Delete Messages:**
- Click on a row and delete if needed

### Setting Up Email Notifications (Optional)

You can set up Supabase Edge Functions or webhooks to receive email notifications when new messages arrive. Contact your developer for setup.

---

## Updating Website Content

### Step-by-Step: Editing Content

1. **Log into CMS**
   - Go to `https://your-domain.com/admin/login`
   - Enter your admin email and password

2. **Navigate to Section**
   - Click on the section you want to edit from the Dashboard
   - Sections include: Hero, About, Resources, Club House, Gameroom, Charts, DeFi, Contact, Privacy, Terms

3. **Edit Fields**
   - Each section has different fields (text, textarea, or JSON)
   - Text fields: Simple text input
   - Textarea fields: Multi-line text
   - JSON fields: Structured data (games, projects, links, etc.)

4. **Save Changes**
   - Click "Save Changes" button
   - Wait for success message
   - Changes are live immediately (no deployment needed!)

### Field Types Explained

#### Text Fields
- Single-line text input
- Used for titles, headings, emails

#### Textarea Fields
- Multi-line text input
- Used for descriptions, content paragraphs

#### JSON Fields
- Structured data in JSON format
- Examples: Games list, DeFi projects, Resource items
- Format must be valid JSON
- Use commas, quotes, brackets correctly

**Example JSON for Games:**
```json
[
  {
    "name": "Game Name",
    "description": "Game description",
    "url": "https://game-url.com",
    "image": "/path/to/image.png"
  }
]
```

### Content Sections Guide

#### Hero Section
- `title` - Main heading
- `subtitle` - Subheading text
- `description` - Hero description

#### About Section
- `title` - Section title
- `content` - About content
- `mission` - Mission statement

#### Resources Section
- `title` - Section title
- `description` - Section description
- `items` - JSON array of resource items

#### Club House Section
- `title` - Section title
- `description` - Section description
- `links` - JSON array of social/project links

#### Gameroom Section
- `title` - Section title
- `description` - Section description
- `games` - JSON array of game objects

#### Charts Section
- `title` - Section title
- `description` - Section description

#### DeFi Section
- `title` - Section title
- `description` - Section description
- `projects` - JSON array of DeFi project objects

#### Contact Section
- `title` - Section title
- `description` - Section description
- `email` - Contact email

#### Privacy Policy & Terms of Service
- Multiple fields for each section/paragraph
- Editable through CMS for easy updates

---

## Admin Access

### Creating Admin Users

1. Go to Supabase Dashboard
2. Navigate to **Authentication** → **Users**
3. Click "Add user" → "Create new user"
4. Enter:
   - Email: `your-admin@email.com`
   - Password: (strong password)
5. Click "Create user"

⚠️ **Security**: Use strong, unique passwords. Consider using a password manager.

### Logging In

1. Navigate to `https://your-domain.com/admin/login`
2. Enter email and password
3. Click "Sign In"
4. You'll be redirected to the Dashboard

### Logging Out

- Click "Sign Out" button in the Dashboard
- You'll be redirected to the login page

### Resetting Password

If you forget your password:

1. Go to Supabase Dashboard
2. **Authentication** → **Users**
3. Find your user
4. Click "Reset password" or update password manually

---

## GitHub Integration

### Repository Access

Your code is hosted on GitHub. Access:
- Repository URL: Provided by your developer
- Branch: `main` (production)

### Understanding Git Workflow

- **Main Branch**: Production code (auto-deploys to Vercel)
- **Commits**: Changes to code
- **Pull Requests**: Proposed changes before merging

### Making Code Changes (For Developers)

If you need to make code changes:

1. Create a new branch
2. Make changes
3. Commit changes
4. Push to GitHub
5. Create Pull Request
6. Review and merge

⚠️ **Important**: Only developers should make code changes. For content updates, use the CMS instead.

### Viewing Deployment History

- GitHub: View commit history and changes
- Vercel: View deployment history and status

---

## Troubleshooting

### Common Issues

#### CMS Login Not Working

**Symptoms**: Can't log into admin panel

**Solutions**:
1. Verify email/password in Supabase
2. Check Supabase Authentication → Users
3. Try resetting password
4. Clear browser cache and cookies
5. Check browser console for errors

#### Content Not Updating

**Symptoms**: Changes saved but not visible on site

**Solutions**:
1. Hard refresh browser (Ctrl+F5 or Cmd+Shift+R)
2. Clear browser cache
3. Check if changes were actually saved (verify in Supabase)
4. Check browser console for errors
5. Verify Supabase connection (check environment variables)

#### Contact Form Not Working

**Symptoms**: Form submissions not saving

**Solutions**:
1. Check Supabase `messages` table exists
2. Verify RLS (Row Level Security) policies are set
3. Check browser console for errors
4. Verify Supabase environment variables are set
5. Check Supabase logs for errors

#### Site Not Deploying

**Symptoms**: Build fails or deployment errors

**Solutions**:
1. Check Vercel deployment logs
2. Verify environment variables are set
3. Check for build errors in logs
4. Verify Node.js version compatibility
5. Check GitHub repository connection

#### Supabase Connection Errors

**Symptoms**: "Supabase credentials not found" warning

**Solutions**:
1. Verify `VITE_SUPABASE_URL` is set in Vercel
2. Verify `VITE_SUPABASE_ANON_KEY` is set in Vercel
3. Check values are correct (no extra spaces)
4. Redeploy after adding variables
5. Check Supabase project is active

### Getting Help

If you encounter issues:

1. **Check Logs**:
   - Vercel: Deployment logs
   - Browser: Console (F12)
   - Supabase: Logs in dashboard

2. **Document the Issue**:
   - What were you trying to do?
   - What error messages appeared?
   - When did it happen?
   - Screenshots if possible

3. **Contact Support**:
   - Reach out to your developer
   - Provide documentation of the issue

---

## Advanced Configuration

### Custom Domain Setup (Detailed)

1. **In Vercel**:
   - Settings → Domains
   - Add your domain
   - Note the DNS records needed

2. **In Your DNS Provider**:
   - Add A record: `@` → Vercel IP
   - Add CNAME: `www` → `cname.vercel-dns.com`
   - Or use Vercel's nameservers

3. **Wait for Propagation**:
   - DNS changes can take 24-48 hours
   - Use `dig` or online tools to check

### Supabase Database Management

#### Viewing Data Directly

1. Supabase Dashboard → Table Editor
2. Select table (`content` or `messages`)
3. View, edit, or delete records

#### Running SQL Queries

1. Supabase Dashboard → SQL Editor
2. Write SQL queries
3. Execute and view results

**Example: View all hero content**
```sql
SELECT * FROM content WHERE section = 'hero';
```

**Example: Count contact messages**
```sql
SELECT COUNT(*) FROM messages;
```

#### Backup Strategy

- Supabase provides automatic backups
- Manual exports available in dashboard
- Consider regular exports for critical data

### Performance Optimization

- **Images**: Optimize images before uploading
- **Content**: Keep JSON fields reasonable in size
- **Caching**: Vercel handles caching automatically
- **CDN**: Vercel provides global CDN

### Security Best Practices

1. **Strong Passwords**: Use complex passwords for admin accounts
2. **Environment Variables**: Never commit `.env` files
3. **RLS Policies**: Ensure Row Level Security is enabled in Supabase
4. **Regular Updates**: Keep dependencies updated
5. **Access Control**: Limit admin user creation

### Monitoring

#### Vercel Analytics
- Enable Vercel Analytics for traffic insights
- View in Vercel dashboard

#### Supabase Monitoring
- Check Supabase dashboard for:
  - API usage
  - Database performance
  - Error logs

---

## Quick Reference

### Important URLs

- **Live Site**: `https://your-domain.com`
- **Admin Login**: `https://your-domain.com/admin/login`
- **CMS Dashboard**: `https://your-domain.com/admin/dashboard`
- **Privacy Policy**: `https://your-domain.com/privacy-policy`
- **Terms of Service**: `https://your-domain.com/terms-of-service`

### Key Contacts

- **Developer**: [Your developer contact]
- **Hosting**: Vercel Support
- **Database**: Supabase Support

### Emergency Procedures

**Site is Down**:
1. Check Vercel dashboard for deployment status
2. Check Supabase dashboard for service status
3. Verify environment variables are set
4. Check GitHub for recent changes

**Can't Access CMS**:
1. Verify Supabase Authentication is working
2. Check user exists and is active
3. Try password reset
4. Contact developer if needed

**Content Accidentally Deleted**:
1. Check Supabase table editor (data may still exist)
2. Check Supabase backups
3. Contact developer for database restore if needed

---

## Appendices

### A. Environment Variables Checklist

```
✅ VITE_SUPABASE_URL
✅ VITE_SUPABASE_ANON_KEY
```

### B. Database Tables

- `content` - CMS content storage
- `messages` - Contact form submissions
- `auth.users` - Admin user accounts

### C. File Structure (Reference)

```
ricobenzia/
├── src/
│   ├── components/      # React components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities (Supabase client)
│   └── routes/          # Page routes
├── public/              # Static assets
└── dist/                # Production build (generated)
```

---

**Last Updated**: January 2025

**Document Version**: 1.0

For questions or updates to this guide, contact your development team.

---

Made with ❤️ // [KemisDigital](https://kemisdigital.com)
