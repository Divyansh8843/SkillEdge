# SkillEdge - Peer Learning Platform

A modern peer-to-peer learning platform built with React, TypeScript, and Tailwind CSS, featuring Google OAuth authentication.

## Features

- 🔐 **Google OAuth Authentication** - Secure sign-in with Google accounts
- 📝 **Send Help Requests** - Students can submit requests for academic help
- 🤝 **Accept Requests** - Users can browse and accept help requests from peers
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- ⚡ **Real-time Updates** - Live feed of help requests
- 🎨 **Modern UI** - Beautiful, animated interface with glassmorphism effects

## Setup Instructions

### 1. Clone and Install

```bash
git clone <repository-url>
cd skillwave-connect-glow-main
npm install
```

### 2. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API or Google Identity API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure the consent screen if prompted
6. Add your domain to "Authorized JavaScript origins":
   - For development: `http://localhost:8081`
   - For production: your actual domain
7. Copy the Client ID

### 3. Environment Configuration

1. Copy the environment template:

   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Google Client ID:
   ```
   VITE_GOOGLE_CLIENT_ID=your-actual-google-client-id.googleusercontent.com
   ```

### 4. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:8081`

## How to Use

### For Students Seeking Help:

1. **Sign In** with your Google account
2. **Navigate to "Send Request"** from the navigation menu
3. **Fill out the form** with your subject and description
4. **Submit** and wait for peers to accept your request

### For Students Offering Help:

1. **Sign In** with your Google account
2. **Navigate to "Accept Request"** from the navigation menu
3. **Browse available requests** from other students
4. **Accept requests** where you can provide assistance
5. **Connect directly** with the student via the provided contact information

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Authentication**: Google OAuth via @react-oauth/google
- **Routing**: React Router v6
- **Build Tool**: Vite
- **UI Components**: Custom components with shadcn/ui

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── GoogleAuth.tsx   # Google OAuth component
│   ├── Navigation.tsx   # Main navigation
│   ├── Preloader.tsx    # Loading screen
│   └── ProtectedRoute.tsx # Route protection
├── contexts/            # React contexts
│   └── AuthContext.tsx  # Authentication state management
├── pages/               # Main application pages
│   ├── Index.tsx        # Landing page
│   ├── SendRequest.tsx  # Request submission page
│   └── AcceptRequest.tsx # Request browsing page
└── App.tsx             # Main application component
```

## Development Notes

- The application uses localStorage for demo purposes to store requests
- In a production environment, you would replace this with a proper backend API
- Google OAuth requires HTTPS in production environments
- Make sure to configure proper CORS settings for your domain

## Security Considerations

- Never commit your actual Google Client ID to version control
- Use environment variables for sensitive configuration
- Implement proper input validation and sanitization
- Consider implementing rate limiting for request submissions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
