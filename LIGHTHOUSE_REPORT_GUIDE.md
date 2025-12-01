# Lighthouse Performance Report Guide

## How to Generate Lighthouse Report for Projects Listing Page

### Step 1: Start Your Application
1. Start the backend server (in `assignment002` folder):
   ```bash
   npm start
   ```

2. Start the frontend server (in `assignment001` folder):
   ```bash
   npm start
   ```

3. Wait for the application to load at `http://localhost:3001`

### Step 2: Open Chrome DevTools
1. Open Google Chrome browser
2. Navigate to `http://localhost:3001/projects`
3. Press `F12` or right-click and select "Inspect" to open DevTools

### Step 3: Run Lighthouse
1. In Chrome DevTools, click on the **"Lighthouse"** tab
2. If you don't see it, click the `>>` icon to see more tabs
3. Select the following options:
   - ✅ **Performance** (required)
   - Optionally: Accessibility, Best Practices, SEO
4. Select **"Desktop"** or **"Mobile"** device (assignment requires Desktop)
5. Click **"Analyze page load"** button

### Step 4: Wait for Analysis
- Lighthouse will analyze the page (takes 30-60 seconds)
- It will test performance, accessibility, best practices, and SEO

### Step 5: Save as PDF
1. Once the report is generated, scroll to the top
2. Click the **"..."** (three dots) menu in the top right of the Lighthouse panel
3. Select **"Save as PDF"** or **"Export Report"**
4. Choose a location and save the file
5. Rename it to something like `lighthouse-performance-report.pdf`

### Step 6: Review the Report
The report will show:
- **Performance Score** (0-100)
- **Core Web Vitals** (LCP, FID, CLS)
- **Performance Metrics** (First Contentful Paint, Time to Interactive, etc.)
- **Opportunities** for improvement
- **Diagnostics** with recommendations

## Performance Optimizations Applied

The following optimizations have been implemented to improve performance:

1. **Lazy Loading Images**: Images use `loading="lazy"` attribute to defer loading until needed
2. **Code Splitting**: Projects component is lazy-loaded using React.lazy() to reduce initial bundle size
3. **Memoization**: 
   - `useMemo` for filtered projects to avoid unnecessary recalculations
   - `useCallback` for event handlers to prevent unnecessary re-renders
4. **Async Image Decoding**: Images use `decoding="async"` for better rendering performance
5. **Optimized Re-renders**: Event handlers are memoized to prevent child component re-renders

## Expected Performance Scores

With these optimizations, you should see:
- **Performance Score**: 80-95 (depending on network and device)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s

## Notes

- Make sure both backend and frontend are running before generating the report
- Close other browser tabs to get accurate results
- Run the test multiple times and take the average for best results
- The report should be generated on the `/projects` page as specified in the assignment

