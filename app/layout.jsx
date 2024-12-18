import "../app/styles/globals.css"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthProvider from "./components/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { ThemeProvider } from "./components/providers/ThemeProvider";

export const metadata = {
  title: 'Bear Rentals',
  description: 'Find The Impossible',
  keywords: 'rental, property, real estate, berlin, germany',
};

const MainLayout = ({children}) => {
  return (
    <AuthProvider>
      <html lang="en" suppressHydrationWarning>
      <body>   
        <ThemeProvider attribute="class" defaultTheme="light"  enableSystem={false} storageKey="dashboard-theme">
<Navbar/>
        <main>
               {children}
        </main>
        <Footer />   
        <ToastContainer/>
        </ThemeProvider>
      </body>
    </html>
    </AuthProvider>
  );
};

export default MainLayout;
