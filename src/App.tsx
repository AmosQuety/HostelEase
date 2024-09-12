import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { browserLocalPersistence, setPersistence } from "firebase/auth";
import { auth } from "./pages/login/firebase";

const App = () => {
  useEffect(() => {
    // Set persistence globally when the app initializes
    setPersistence(auth, browserLocalPersistence).catch((error) => {
      console.error("Error setting persistence:", error);
    });
  }, []);
  return (
    <div>
      <AppRoutes />
    </div>
  );
};

export default App;
