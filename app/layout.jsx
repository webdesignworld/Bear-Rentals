import "@/assets/styles/globals.css"

export const metadata = {
  title: 'BearProperties',
  description: 'Find The Impossible',
  keywords: 'rental, property, real estate, berlin',
};

const MainLayout = ({children}) => {
  return (
    <html>
      <body>
        <main>
               {children}
        </main>
      </body>
    </html>
  );
};

export default MainLayout;
