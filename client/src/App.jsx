import { UserProvider } from "../src/components/Context/userContext";
import Path from "./routes/Routes";

function App() {
  return (
    <UserProvider>
      <Path />
    </UserProvider>
  );
}

export default App;
