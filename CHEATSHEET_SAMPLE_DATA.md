# Cheat Sheet Sample Data

This directory contains sample data that you can use to populate your cheat sheet system with useful programming examples.

## Files

- `sample-cheatsheet-data.ts` - TypeScript file with comprehensive sample data
- `populate-cheatsheets.js` - Node.js script to populate your database
- `CHEATSHEET_SAMPLE_DATA.md` - This documentation file

## Sample Cheat Sheets Included

### 1. React Hooks
- **Category**: Frontend
- **Items**: 5 code examples
- **Topics**: useState, useEffect, useContext, useRef, Custom Hooks

### 2. JavaScript ES6+
- **Category**: Language
- **Items**: 5 code examples
- **Topics**: Arrow Functions, Destructuring, Template Literals, Spread/Rest, Async/Await

### 3. CSS Grid & Flexbox
- **Category**: Frontend
- **Items**: 4 code examples
- **Topics**: Grid Basics, Flexbox Basics, Grid vs Flexbox, Responsive Grid

### 4. SQL Queries
- **Category**: Database
- **Items**: 4 code examples
- **Topics**: SELECT Queries, JOINs, Aggregates, Subqueries

### 5. Git Commands
- **Category**: Tools
- **Items**: 5 code examples
- **Topics**: Setup, Workflow, Branching, Remotes, Advanced Features

## How to Use

### Option 1: Manual Creation (Recommended for testing)
1. Go to your cheat sheet page
2. Click "Create Cheat Sheet"
3. Copy the data from the sample files
4. Fill in the form manually

### Option 2: Import TypeScript Data
1. Import the `sample-cheatsheet-data.ts` file
2. Use the `createSampleCheatSheets(userId)` function
3. Pass your user ID to populate the data

### Option 3: Use the Populate Script
1. Set your Supabase environment variables
2. Run `node populate-cheatsheets.js`
3. Pass your user ID to the function

## Data Structure

Each cheat sheet contains:
- **Basic Info**: name, description, category, icon
- **Items**: Array of code examples with:
  - title
  - description
  - code (formatted code examples)
  - category (for grouping within the cheat sheet)
  - order_index (for sorting)

## Categories Available

- Frontend
- Backend
- Language
- Database
- DevOps
- Tools
- Other

## Icons Available

- code
- database
- globe
- cpu
- book-open
- zap
- shield
- cloud

## Example Usage

```typescript
import { createSampleCheatSheets } from './sample-cheatsheet-data';

// Create all sample cheat sheets for a user
const sampleData = await createSampleCheatSheets('user-id-here');

// Or use individual cheat sheets
import { reactHooksCheatSheet } from './sample-cheatsheet-data';
```

## Customization

You can easily modify the sample data by:
1. Editing the `sample-cheatsheet-data.ts` file
2. Adding new cheat sheets
3. Modifying existing examples
4. Changing categories and icons

## Notes

- The sample data includes realistic, practical code examples
- All code examples are properly formatted and ready to use
- Categories are designed to work with your existing UI
- Icons match the available icon set in your application

## Support

If you need help integrating this data or have questions about the structure, refer to:
- Your existing cheat sheet components
- The TypeScript type definitions
- The Supabase database schema
