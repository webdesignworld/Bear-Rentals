import "@/app/styles/globals.css"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthProvider from "./components/AuthProvider";

export const metadata = {
  title: 'Bear Rentals',
  description: 'Find The Impossible',
  keywords: 'rental, property, real estate, berlin',
};

const MainLayout = ({children}) => {
  return (
    <AuthProvider>
    <html>
      <body>   
        
<Navbar/>
        <main>
               {children}
        </main>
        <Footer />   
        
      </body>
    </html>
    </AuthProvider>
  );
};

export default MainLayout;
