import AllRoutes from "./routes/route";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AllRoutes />
        <ToastContainer autoClose={900} />
      </QueryClientProvider>
    </>
  );
}

export default App;
