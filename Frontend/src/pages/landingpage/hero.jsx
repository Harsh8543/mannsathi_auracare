
import { ImageWithFallback } from "@/components/inputs/imagefallback";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { UserContext } from "@/context/usercontext";
import { useNavigate } from "react-router-dom";
import Modal from "@/components/Modal";
import Login from "@/pages/auth/login";
import SignUp from "@/pages/auth/signup";

export function Hero() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDashboardClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      setOpenAuthModal(true);
    }
  };

  return (
    <>
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #A1C4FD 0%, #C2E9FB 100%)",
        }}
      >
        {/* Soft floating clouds / background image */}
        <div className="absolute inset-0 opacity-40 animate-pulse-slow">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
            alt="Peaceful mountains and sunrise"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlay tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/30"></div>

        <div className="relative z-20 text-center px-9 max-w-4xl mx-auto animate-fade-in">
          <div className="bg-white/30 backdrop-blur-md rounded-3xl p-10 shadow-xl border border-white/40">
            <h1
              className="mb-6 text-6xl font-bold drop-shadow-md"
              style={{
                background: "linear-gradient(90deg, #667eea, #764ba2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Find Your Peace 🌸
            </h1>
            <p className="mb-8 text-xl max-w-2xl mx-auto text-gray-700">
              Control your mind, for it can be your <span className="text-indigo-600 font-semibold">friend</span> or your <span className="text-rose-500 font-semibold">enemy</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Dashboard Button */}
              <Button
                size="lg"
                onClick={handleDashboardClick}
                className="text-white shadow-lg px-8 py-3 rounded-2xl transition-transform transform hover:scale-105 hover:shadow-2xl"
                style={{
                  background: "linear-gradient(to right, #667eea, #764ba2)",
                }}
              >
                🌿 Start Fresh
              </Button>

              {/* Other buttons */}
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection("affirmations")}
                className="border px-8 py-3 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
                style={{
                  borderColor: "#667eea",
                  background: "white/60",
                  color: "#333",
                }}
              >
                ✨ Positive Affirmations
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection("activities")}
                className="border px-8 py-3 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
                style={{
                  borderColor: "#667eea",
                  background: "white/60",
                  color: "#333",
                }}
              >
                🌞 Calming Activities
              </Button>
            </div>

            <div className="mt-12 text-sm text-gray-800 italic">
              <p>You are not alone 🌈. Help is always available 💙.</p>
            </div>
          </div>
        </div>
      </section>

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