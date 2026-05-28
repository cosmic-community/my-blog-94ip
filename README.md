# My Blog

![App Preview](https://imgix.cosmicjs.com/0630be50-5a4f-11f1-93fc-1339ba0f6cad-autopilot-photo-1528127269322-539801943592-1779943087788.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern, beautiful blog built with Next.js 16 and Cosmic CMS featuring posts, authors, and categories.

## Features

- 📝 Blog posts with featured images and rich content
- 👤 Author profiles with bios
- 🏷️ Category organization
- 📱 Fully responsive design
- ⚡ Server-side rendering for performance
- 🎨 Modern UI with Tailwind CSS

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a17c666f2c683f5f2b3780d&clone_repository=6a17c755f2c683f5f2b37873)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a blog with posts (including featured images, content, and tags), authors, and categories.
> 
> User instructions: A blog with posts, authors, and categories"

### Code Generation Prompt

> Build a Next.js application for a creative portfolio called "My Blog". The content is managed in Cosmic CMS with the following object types: categories, authors, posts. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
> 
> User instructions: A blog with posts, authors, and categories

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Cosmic CMS** - Content management
- **React 19** - UI library

## Getting Started

### Prerequisites

- Bun (or Node.js 18+)
- A Cosmic account and bucket

### Installation

1. Install dependencies:
```bash
bun install
```

2. Set up environment variables in `.env.local`:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

3. Run the development server:
```bash
bun run dev
```

## Cosmic SDK Examples

```typescript
// Fetch all posts with authors and categories
const posts = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Fetch a single post by slug
const post = await cosmic.objects
  .findOne({ type: 'posts', slug: 'my-post' })
  .depth(1)
```

## Cosmic CMS Integration

This app integrates with three Cosmic object types:
- **Posts**: Blog articles with featured images, content, and tags
- **Authors**: Writer profiles with bios
- **Categories**: Topic categorization

## Deployment Options

Deploy to Vercel, Netlify, or any platform supporting Next.js. Set your environment variables in your hosting platform's dashboard.

<!-- README_END -->