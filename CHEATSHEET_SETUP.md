# Cheat Sheet Setup Guide

This guide will help you set up the cheat sheet functionality in your RefCode application.

## Prerequisites

- You need to be logged into your Supabase account
- Your Supabase project should be running and accessible

## Step 1: Apply Database Migration

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to the "SQL Editor" section
4. Copy the contents of `apply_migration.sql` file
5. Paste it into the SQL editor and click "Run"

This will create:
- `cheatsheets` table - stores cheat sheet metadata
- `cheatsheet_items` table - stores individual code examples and items
- Proper indexes for performance
- Row Level Security (RLS) policies for user isolation
- Automatic timestamp updates

## Step 2: Test the Application

1. Start your Next.js development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/cheatsheet` in your browser
3. Log in with your Supabase account
4. Try creating a new cheat sheet using the "Create Cheat Sheet" button

## Features Available

### Create Cheat Sheet
- Add basic information (name, description, category, icon)
- Add multiple code examples with titles and descriptions
- Organize items by categories
- Reorder items using up/down arrows

### Manage Cheat Sheets
- View all your cheat sheets
- Search and filter by category
- Mark favorites with star icon
- Edit existing cheat sheets
- Delete cheat sheets

### Code Examples
- Syntax-highlighted code display
- Copy code to clipboard with one click
- Organized by categories within each cheat sheet
- Collapsible sections for better organization

## Database Schema

### CheatSheets Table
```sql
- id: UUID (Primary Key)
- name: TEXT (Required)
- description: TEXT
- category: TEXT (Required)
- icon: TEXT
- favorite: BOOLEAN (Default: false)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
- user_id: UUID (Foreign Key to auth.users)
```

### CheatSheetItems Table
```sql
- id: UUID (Primary Key)
- cheatsheet_id: UUID (Foreign Key to cheatsheets)
- title: TEXT (Required)
- description: TEXT
- code: TEXT (Required)
- category: TEXT (Required)
- order_index: INTEGER (Default: 0)
- created_at: TIMESTAMP
```

## Security Features

- **Row Level Security (RLS)**: Users can only access their own cheat sheets
- **User Isolation**: Each user's data is completely separated
- **Authentication Required**: Must be logged in to access cheat sheets
- **Proper Permissions**: Only authenticated users can perform CRUD operations

## Troubleshooting

### Common Issues

1. **"Cannot find project ref" error**
   - Make sure you're in the correct directory
   - Check if Supabase CLI is properly installed

2. **Docker connection errors**
   - If running locally, ensure Docker is running
   - For remote setup, use the SQL migration file instead

3. **Authentication errors**
   - Verify your Supabase URL and anon key in `.env.local`
   - Check if the user is properly logged in

4. **Database connection issues**
   - Verify your Supabase project is active
   - Check if the migration was applied successfully

### Getting Help

If you encounter issues:
1. Check the browser console for error messages
2. Verify the database tables were created correctly
3. Ensure RLS policies are in place
4. Check that your user account has proper permissions

## Next Steps

After setting up cheat sheets, you can:
- Create cheat sheets for different programming languages
- Share cheat sheets with your team
- Export cheat sheets to different formats
- Add more advanced features like tags and search

## Files Modified/Created

- `supabase/migrations/002_create_cheatsheets_table.sql` - Database migration
- `types/type.d.ts` - TypeScript interfaces
- `lib/supabase/cheatsheets.ts` - Database operations
- `components/CreateCheatSheet.tsx` - Create/Edit component
- `app/(root)/cheatsheet/page.tsx` - Main page with Supabase integration
- `apply_migration.sql` - Manual migration script
- `CHEATSHEET_SETUP.md` - This setup guide
