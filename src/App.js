import { BottomNav, Navbar, SideNav } from "components";
import { routes } from "config/routes";
import { useRoutes } from "react-router-dom";

const App = () => {
  const routesEl = useRoutes(routes);
  return (
    <div className="bg-gray-100 dark:bg-gray-900 dark:text-slate-200">
      <Navbar />
      <div className="grid-container container mx-auto max-w-screen-lg">
        <SideNav />
        <main className="min-h-screen w-100 max-w-lg mt-[10vh] mb-[10vh] mx-auto rounded">
          {routesEl}
        </main>
        <BottomNav />
      </div>
    </div>
  );
};

export default App;
