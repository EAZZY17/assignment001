// Quick script to clear test projects from localStorage
// Run this in the browser console on the projects page

// Clear user projects from localStorage
localStorage.removeItem('userProjects');
console.log('✅ Cleared userProjects from localStorage');
console.log('Refresh the page to see the changes');

// If you want to see what was cleared:
const cleared = JSON.parse(localStorage.getItem('userProjects') || '[]');
console.log('Projects that were cleared:', cleared);

