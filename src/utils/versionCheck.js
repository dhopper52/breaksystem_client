// Version checking utility to ensure users get the latest app version

/**
 * Checks if the application version has been updated
 * - Fetches index.html to compare current and latest version
 * - Shows a prompt to reload if a new version is detected
 * - Stores the current version in localStorage
 */
export async function checkAppVersion() {
  try {
    // Add timestamp to prevent caching
    const html = await fetch(`/index.html?t=${new Date().getTime()}`, { 
      cache: 'no-cache' 
    }).then(res => res.text());
    
    // Extract version from the fetched HTML
    const match = html.match(/<meta name="app-version" content="(.*?)"/);
    const latestVersion = match?.[1];
    
    if (!latestVersion) return;
    
    // Get stored version from localStorage
    const currentVersion = localStorage.getItem('app-version');
    
    if (latestVersion && currentVersion && latestVersion !== currentVersion) {
      // New version detected - prompt user to reload
      if (window.confirm("A new version is available. Reload to update?")) {
        localStorage.setItem('app-version', latestVersion);
        window.location.reload();
      }
    } else if (!currentVersion) {
      // First load - store the current version
      localStorage.setItem('app-version', latestVersion);
    }
  } catch (error) {
    console.error("Failed to check for app updates:", error);
  }
} 