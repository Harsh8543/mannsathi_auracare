
import { NavLink } from "react-router-dom";
import { Home, BarChart, User, Settings, Book, Calendar, Group, Smile, Shapes } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="h-screen w-20 flex flex-col items-center py-6 bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50 shadow-md border-r">
      {/* Logo */}
      <div className="mb-8">
        <span className="text-2xl font-bold text-indigo-600">🌿</span>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-6">
        {[
          { to: "/dashboard", icon: <Home className="w-5 h-5" /> },
          { to: "/resourcehub", icon: <Book className="w-5 h-5" /> },
          { to: "/community", icon: <Group className="w-5 h-5" /> },
          { to: "/counselingsessions", icon: <Calendar className="w-5 h-5" /> },
          { to: "/moodtracker", icon: <Smile className="w-5 h-5" /> },
          { to: "/gamehub", icon: <Shapes className="w-5 h-5" /> },
        ].map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 
               hover:scale-110 hover:shadow-lg 
               ${isActive ? "bg-gradient-to-tr from-pink-200 to-purple-200 text-purple-800 shadow-inner" : "text-gray-500 hover:bg-gradient-to-tr from-green-100 to-green-200"}`
            }
          >
            {link.icon}
          </NavLink>
        ))}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />
    </aside>
  );
};

export default Sidebar;
