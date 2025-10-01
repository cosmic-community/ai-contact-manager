# 🎯 AI Contact Manager

![App Preview](https://imgix.cosmicjs.com/2d7c6d50-9e8a-11f0-bba7-d56988718db7-photo-1507003211169-0a1dd7228f2d-1759297669876.jpg?w=1200&h=300&fit=crop,auto=format,compress)

An intelligent, AI-powered contact management system with voice recognition, duplicate detection, automated organization grouping, Truecaller integration, and interactive maps for finding nearest contacts.

## ✨ Features

- **🎤 Voice Recognition Search**: Search contacts using voice commands with Web Speech API
- **🚫 Duplicate Detection**: Smart algorithms prevent duplicate contact entries
- **🏢 Auto-Organization Grouping**: Contacts automatically grouped by organization
- **📞 Truecaller Integration**: Find unknown numbers and identify callers
- **🗺️ Interactive Map**: Visual map showing contact locations with distance calculation
- **⭐ Favorites System**: Mark and quick-access important contacts
- **🔍 Advanced Filtering**: Filter by organization, industry, tags, and more
- **📱 Fully Responsive**: Works perfectly on all devices
- **🎨 Modern UI**: Clean, professional design with smooth animations
- **⚡ Real-time Updates**: Instant synchronization with Cosmic CMS

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68dcbf8b71f3904a2a9412a4&clone_repository=68dcc1da71f3904a2a941312)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "I need a AI based contact manager that includes vioice recoginition to search contacts , avoid duplicate contacts , automated grouping based on the organization in the name field , Truecaller integration to find unknown numbers , integrate map to find the nearest contacts . create an attractive one using react"

### Code Generation Prompt

> Based on the content model I created for "I need a AI based contact manager that includes vioice recoginition to search contacts , avoid duplicate contacts , automated grouping based on the organization in the name field , Truecaller integration to find unknown numbers , integrate map to find the nearest contacts . create an attractive one using react", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless CMS for content management
- **Web Speech API** - Voice recognition functionality
- **Geolocation API** - Distance calculation and mapping
- **React Hooks** - Modern state management

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket
- Modern web browser with Web Speech API support

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ai-contact-manager
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your Cosmic credentials:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Cosmic SDK Examples

### Fetching Contacts with Organization Data

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch contacts with nested organization data
const response = await cosmic.objects
  .find({ type: 'contacts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

const contacts = response.objects as Contact[]
```

### Searching Contacts

```typescript
// Search by name or phone
const response = await cosmic.objects
  .find({
    type: 'contacts',
    $or: [
      { 'metadata.full_name': { $regex: searchTerm, $options: 'i' } },
      { 'metadata.phone': { $regex: searchTerm, $options: 'i' } }
    ]
  })
  .depth(1)
```

### Filtering by Organization

```typescript
// Get contacts for specific organization
const response = await cosmic.objects
  .find({
    type: 'contacts',
    'metadata.organization': organizationId
  })
  .depth(1)
```

### Creating a New Contact

```typescript
const newContact = await cosmic.objects.insertOne({
  type: 'contacts',
  title: fullName,
  metadata: {
    full_name: fullName,
    phone: phoneNumber,
    email: email,
    organization: organizationId,
    job_title: jobTitle,
    contact_source: { key: 'manual', value: 'Manual Entry' },
    favorite: false,
    tags: '',
    notes: ''
  }
})
```

## 🎨 Cosmic CMS Integration

This application uses two main object types:

### Contacts Object Type
- Full Name (text, required)
- Phone Number (text, required, validated)
- Email (text, optional, validated)
- Organization (object metafield)
- Job Title (text)
- Profile Photo (file)
- Address, City, Country (text)
- Latitude & Longitude (number)
- Contact Source (select-dropdown)
- Tags (text)
- Notes (textarea)
- Favorite (switch)
- Last Contact Date (date)

### Organizations Object Type
- Organization Name (text, required)
- Industry (select-dropdown)
- Website (text)
- Logo (file)
- Description (textarea)

## 🗺️ Map Features

The application includes interactive mapping capabilities:
- Visual display of all contacts with location data
- Distance calculation from your current location
- "Find Nearest" feature to locate closest contacts
- Organization-based color coding on map markers

## 🎤 Voice Search

Voice search uses the Web Speech API to:
- Transcribe spoken queries in real-time
- Search across contact names and phone numbers
- Provide visual feedback during listening
- Handle multiple languages (browser dependent)

## 🚫 Duplicate Detection

Smart duplicate prevention checks:
- Phone number matching
- Name similarity algorithms
- Organization comparison
- Warns before creating potential duplicates

## 🌐 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Connect your repository
2. Add environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
3. Deploy!

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

1. Connect your repository
2. Build command: `bun run build`
3. Publish directory: `.next`
4. Add environment variables in Netlify dashboard

## 📖 Learn More

- [Cosmic Documentation](https://www.cosmicjs.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)

<!-- README_END -->