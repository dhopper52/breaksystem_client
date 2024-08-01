import { BrowserRouter } from "react-router-dom";
import RouterWrapper from "./system/routes/routesWraper/RouteWraper";

function App() {
  return (
    <BrowserRouter>
      <RouterWrapper />
    </BrowserRouter>
  );
}

export default App;
