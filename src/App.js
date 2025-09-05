import { BrowserRouter } from "react-router-dom";
import RouterWrapper from "./system/routes/routesWraper/RouteWraper";
import { useEffect } from "react";
import { checkAppVersion } from "./utils/versionCheck";

function App() {
  useEffect(() => {
    // Initial version check
    checkAppVersion();
    
    // Set up periodic version checking (every 5 minutes)
    const versionCheckInterval = setInterval(() => {
      checkAppVersion();
    }, 5 * 60 * 1000);
    
    return () => clearInterval(versionCheckInterval);
  }, []);

  return (
    <BrowserRouter>
      <RouterWrapper />
    </BrowserRouter>
  );
}

export default App;
