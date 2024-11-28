import "@/app/styles/globals.css"
import Navbar from "./components/Navbar";

export const metadata = {
  title: 'BearProperties',
  description: 'Find The Impossible',
  keywords: 'rental, property, real estate, berlin',
};

const MainLayout = ({children}) => {
  return (
    <html>
      <body>
<Navbar/>
        <main>
               {children}
        </main>
      </body>
    </html>
  );
};

export default MainLayout;
