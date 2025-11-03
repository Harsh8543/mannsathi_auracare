
import Modal from '@/components/Modal';
import { Button } from '@/components/ui/button';
import { UserContext } from '@/context/usercontext';
import Login from '@/pages/auth/login';
import SignUp from '@/pages/auth/signup';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Menu, User, Settings, LogOut } from 'lucide-react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const { user, clearUser } = useContext(UserContext);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b shadow-md" style={{ borderColor: '#A8D0E6' }}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              className="flex items-center gap-2 cursor-pointer transition transform hover:scale-105"
              onClick={() => navigate("/")}
            >
              <Heart className="w-8 h-8 text-pink-400" />
              <span className="text-2xl font-semibold text-gray-700">MannSathi</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {!user ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setOpenAuthModal(true)}
                  className="border cursor-pointer transition hover:bg-pink-50 hover:text-pink-600"
                  style={{ borderColor: '#A8D0E6', color: '#4A4A4A' }}
                >
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 px-2 hover:bg-white/30 transition-colors rounded-lg">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-purple-200 text-gray-700">
                          {getInitials(user?.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden md:block text-gray-700">{user?.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-48 bg-gradient-to-tr from-pink-50 via-purple-50 to-blue-50 shadow-lg rounded-xl"
                  >
                    <DropdownMenuItem onClick={() => navigate("/profilesetting")} className="hover:bg-purple-100 transition-colors rounded-md">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-purple-100 transition-colors rounded-md">
                      <Settings className="mr-2 h-4 w-4" />
                      Preferences
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        clearUser();
                        navigate("/");
                      }}
                      className="text-red-600 hover:text-red-700 rounded-md transition-colors"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              <Button
                size="sm"
                onClick={() => scrollToSection('resources')}
                className="text-white cursor-pointer bg-gradient-to-tr from-green-400 to-emerald-500 hover:from-green-300 hover:to-emerald-400 transition-colors"
              >
                Get Help
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5 text-gray-700" />
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden pt-4 pb-2 border-t mt-4" style={{ borderColor: '#A8D0E6' }}>
              <div className="flex flex-col gap-2">
                {!user ? (
                  <button
                    onClick={() => setOpenAuthModal(true)}
                    className="text-left py-2 transition-colors text-gray-700 hover:bg-pink-50 rounded-md"
                  >
                    Login
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => navigate("/profile")}
                      className="text-left py-2 transition-colors text-gray-700 hover:bg-purple-50 rounded-md"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        clearUser();
                        navigate("/");
                      }}
                      className="text-left py-2 text-red-600 hover:text-red-700 transition-colors rounded-md"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Auth Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
        </div>
      </Modal>
    </>
  );
}
