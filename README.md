# Portfolio Website

This is a personal portfolio website built with Next.js, React, and Tailwind CSS.

## Setup EmailJS for Contact Form

To enable the contact form functionality:

1. Create an account on [EmailJS](https://www.emailjs.com/)
2. Set up an email service (Gmail, Outlook, etc.)
3. Create an email template with the following variables:
   - `{{from_name}}` - Sender's name
   - `{{reply_to}}` - Sender's email
   - `{{subject}}` - Email subject
   - `{{message}}` - Email message content
4. Create a `.env.local` file in the project root with the following:
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```
5. Replace the placeholder values with your actual EmailJS credentials

## Development

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

## Production

```bash
# Build for production
npm run build

# Start the production server
npm start
```
