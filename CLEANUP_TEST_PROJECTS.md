# Clean Up Test Projects

## Quick Cleanup Instructions

### Method 1: Clear localStorage (Easiest)

1. Open your portfolio at `http://localhost:3001/projects`
2. Open Chrome DevTools (Press F12)
3. Go to the **Console** tab
4. Copy and paste this code:

```javascript
localStorage.removeItem('userProjects');
location.reload();
```

5. Press Enter
6. The page will reload and test projects will be gone!

### Method 2: Clear via Application Tab

1. Open Chrome DevTools (Press F12)
2. Go to the **Application** tab
3. Click **Local Storage** → `http://localhost:3001`
4. Find `userProjects` in the list
5. Right-click → **Delete**
6. Refresh the page

### Method 3: Delete via UI (If you're signed in)

1. Sign in to your portfolio
2. Go to `/projects` page
3. Find test projects (they'll have Edit/Delete buttons)
4. Click **Delete** on each test project
5. Confirm deletion

### Method 4: Clear Backend Database (Nuclear Option)

If you want to clear ALL projects from the backend:

1. Make a DELETE request to: `http://localhost:3000/api/projects`
2. Or use Postman/Thunder Client to delete all projects
3. **Warning**: This deletes ALL projects, not just test ones

## Test Projects to Look For

Common test project names:
- "Project to Edit"
- "Project to Delete"
- "Cypress Test Project"
- "Test Project"
- Any project with email like `testuser...@example.com`

## After Cleanup

After clearing, your projects page should only show:
- Your original portfolio projects (Pixar Gallery, Word Game, Pokédex)
- Any projects you manually created (not from tests)

## For Lighthouse Report

Clean up test projects before generating the Lighthouse report for a cleaner, more accurate performance measurement.

