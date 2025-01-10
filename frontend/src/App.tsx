import AllRoutes from "./routes/Route";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./context/authContext";
const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AllRoutes />
          <ToastContainer autoClose={900} />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
