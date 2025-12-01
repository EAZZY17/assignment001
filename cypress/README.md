# Cypress Test Suite

This folder contains the Cypress end-to-end tests for the Portfolio Application as required by Assignment 4.

## Test Files

### JavaScript Test Files (`.cy.js`)
Located in `cypress/e2e/`:
- `signup.cy.js` - Tests user sign up functionality
- `signin-add-project.cy.js` - Tests sign in and adding a project
- `signin-edit-project.cy.js` - Tests sign in and editing a project
- `signin-delete-project.cy.js` - Tests sign in and deleting a project

### JSON Test Documentation Files
Located in `cypress/`:
- `signup-test.json` - Test scenario documentation for Sign Up
- `signin-add-project-test.json` - Test scenario documentation for Sign In + Add Project
- `signin-edit-project-test.json` - Test scenario documentation for Sign In + Edit Project
- `signin-delete-project-test.json` - Test scenario documentation for Sign In + Delete Project

## Prerequisites

1. **Backend Server Running**: The backend must be running on `http://localhost:3000`
2. **Frontend Server Running**: The frontend must be running on `http://localhost:3001`
3. **MongoDB Connected**: Ensure your MongoDB Atlas connection is working

## Running the Tests

### Option 1: Interactive Mode (Recommended for First Time)

1. Start both servers:
   ```bash
   # Terminal 1 - Backend (in assignment002 folder)
   npm start
   
   # Terminal 2 - Frontend (in assignment001 folder)
   npm start
   ```

2. Open Cypress:
   ```bash
   npm run cypress:open
   ```

3. In the Cypress window:
   - Click "E2E Testing"
   - Select a browser (Chrome recommended)
   - Click on a test file to run it
   - Watch the test execute in real-time

### Option 2: Headless Mode (For CI/CD)

Run all tests in headless mode:
```bash
npm run cypress:run
```

## Test Scenarios

### 1. Sign Up Test (`signup.cy.js`)
- Navigates to `/signup`
- Fills in the sign up form with test data
- Submits the form
- Verifies redirect to sign in page

### 2. Sign In + Add Project (`signin-add-project.cy.js`)
- Creates a test user account
- Signs in with the test user
- Navigates to projects page
- Adds a new project
- Verifies the project appears in the list

### 3. Sign In + Edit Project (`signin-edit-project.cy.js`)
- Creates a test user and project
- Signs in with the test user
- Finds and edits an existing project
- Verifies the project was updated

### 4. Sign In + Delete Project (`signin-delete-project.cy.js`)
- Creates a test user and project
- Signs in with the test user
- Finds and deletes a project
- Verifies the project was removed

## Troubleshooting

### Tests Fail with "Cannot connect to server"
- Ensure both backend and frontend servers are running
- Check that backend is on port 3000 and frontend is on port 3001
- Verify MongoDB connection is working

### Tests Fail with "Element not found"
- Make sure the frontend is fully loaded before running tests
- Check that the form fields have the correct IDs (`#firstName`, `#email`, etc.)
- Wait a moment after page loads before interacting

### Authentication Errors
- Ensure the backend authentication is working correctly
- Check that JWT_SECRET is set in the backend `.env` file
- Verify the sign-in endpoint is returning tokens correctly

## Notes

- Each test creates unique test users with timestamps to avoid conflicts
- Tests clean up after themselves (projects are deleted)
- The JSON files document the test scenarios for submission
- All tests require authentication to work properly

## Assignment Requirements

As per Assignment 4, Part II - Testing:
- ✅ Sign Up test recorded
- ✅ Sign In, add one project test recorded
- ✅ Sign In, edit one project test recorded
- ✅ Sign In, delete one project test recorded
- ✅ JSON files provided in `cypress/` subfolder

## How to Verify Tests Work

### Option 1: Run Tests in Cypress (Recommended)
1. Start backend: `cd assignment002 && npm start`
2. Start frontend: `cd assignment001 && npm start`
3. Open Cypress: `cd assignment001 && npm run cypress:open`
4. Click "E2E Testing" → Choose browser → Run each test file
5. All tests should show green checkmarks ✅

### Option 2: Run Tests from Command Line
```bash
cd assignment001
npm run cypress:run
```
This will run all tests automatically and show results in the terminal.

### Option 3: View Test Results
After running tests, check:
- Screenshots (if any failures): `cypress/screenshots/`
- Videos (if enabled): `cypress/videos/`

## Test Verification

All 4 test scenarios have been verified to work:
1. ✅ **Sign Up** - Creates new user account successfully
2. ✅ **Sign In + Add Project** - Signs in and adds a new project
3. ✅ **Sign In + Edit Project** - Signs in and edits an existing project
4. ✅ **Sign In + Delete Project** - Signs in and deletes a project

## Screenshots

Screenshots of passing tests can be found in the `screenshots/` folder (if generated).
For best verification, run the tests using Option 1 above to see them execute in real-time.

