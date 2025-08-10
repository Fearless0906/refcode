# Supabase Authentication Setup

This Next.js application has been configured with Supabase authentication using magic links.

## Features

- **Magic Link Authentication**: Users can sign in by entering their email address
- **Protected Routes**: All routes except `/login` and `/auth/*` require authentication
- **Automatic Redirects**: Authenticated users are redirected to the dashboard, unauthenticated users are redirected to login
- **Session Management**: Automatic token refresh and session handling

## Environment Variables

Make sure you have the following environment variables set in your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Authentication Flow

1. **Login**: Users visit `/login` and enter their email
2. **Magic Link**: A magic link is sent to their email
3. **Authentication**: Clicking the link authenticates the user and redirects to the dashboard
4. **Session**: The user remains authenticated until they sign out or their session expires

## Routes

- `/login` - Login page with magic link authentication
- `/auth/callback` - Handles magic link authentication redirects
- `/auth/logout` - Logs out the user
- `/` - Protected dashboard (requires authentication)

## Components

- `AuthProvider` - Context provider for authentication state
- `useAuth` - Hook to access authentication state
- `UserProfile` - User profile dropdown with logout functionality
- `AuthLoading` - Loading component while authentication state is determined

## Middleware

The application uses Next.js middleware to:
- Protect routes that require authentication
- Redirect unauthenticated users to `/login`
- Redirect authenticated users away from `/login`
- Handle session refresh automatically

## Usage

### In Components

```tsx
import { useAuth } from '@/lib/contexts/auth-context'

function MyComponent() {
  const { user, loading, signOut } = useAuth()
  
  if (loading) return <div>Loading...</div>
  if (!user) return <div>Please log in</div>
  
  return (
    <div>
      <p>Welcome, {user.email}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}
```

### Server Components

```tsx
import { createClient } from '@/lib/supabase/server'

export default async function ServerComponent() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }
  
  return <div>Hello, {user.email}</div>
}
```

## Security Features

- **SSR Authentication**: Server-side authentication checks
- **Automatic Token Refresh**: Middleware handles token refresh automatically
- **Protected Routes**: All sensitive routes are protected by default
- **Session Validation**: Automatic session validation on each request

## Troubleshooting

1. **Magic Link Not Working**: Check your Supabase project settings and email configuration
2. **Authentication Loops**: Ensure middleware is properly configured
3. **Session Issues**: Check that cookies are being set correctly
4. **Environment Variables**: Verify all required environment variables are set

## Next Steps

1. Configure your Supabase project with proper authentication settings
2. Set up email templates for magic links
3. Add additional authentication methods if needed (Google, GitHub, etc.)
4. Implement user profile management
5. Add role-based access control if required
