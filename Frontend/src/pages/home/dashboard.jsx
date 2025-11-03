
import React, { useState, useEffect, useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Calendar, Users, BookOpen, Smile } from "lucide-react";
import axios from "axios";
import { UserContext } from "@/context/usercontext";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  const [moodData, setMoodData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(UserContext);

  const moodMap = {
    1: "😞",
    2: "😐",
    3: "🙂",
    4: "😊",
    5: "🤩",
  };

  useEffect(() => {
    fetchMoods();
  }, []);

  const fetchMoods = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/moods", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const formatted = res.data.map((m) => ({ date: m.date, mood: m.mood }));
      setMoodData(formatted);
    } catch (err) {
      console.error("Error fetching mood:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMoodUpdate = async (value) => {
    const today = new Date().toISOString().split("T")[0];
    try {
      await axios.post(
        "http://localhost:8000/api/moods",
        { date: today, mood: value },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      fetchMoods();
    } catch (err) {
      console.error("Error updating mood:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-green-50 via-yellow-50 to-pink-50">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold text-green-800">
          {user ? `Welcome back, ${user.name.split(" ")[0]} 👋` : "Welcome 👋"}
        </h2>
        <p className="text-gray-600 mt-2">
          Here’s your mental wellness snapshot for the week.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Positive Habit Tracker */}
        <div className="bg-gradient-to-tr from-green-200 to-green-400 text-green-900 shadow-lg hover:scale-105 hover:shadow-2xl transition-all rounded-2xl p-6">
          <h3 className="font-semibold text-lg mb-2">🌱 Positive Habit Tracker</h3>
          <p className="mb-4 text-sm opacity-90">
            Replace bad habits with good ones & grow every day 💪
          </p>
          <NavLink
            to="/breathing"
            className="inline-block bg-white text-green-700 text-sm font-medium px-6 py-2 rounded-full hover:bg-green-100 transition-colors"
          >
            Start Tracking
          </NavLink>
        </div>

        {/* Mood Tracker */}
        <div className="bg-gradient-to-tr from-yellow-200 to-yellow-400 text-yellow-900 shadow-lg hover:scale-105 hover:shadow-2xl transition-all rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <Smile size={18} />
            <h3 className="font-semibold text-lg">Mood Tracker</h3>
          </div>

          {loading ? (
            <p className="text-sm">Loading...</p>
          ) : moodData.length === 0 ? (
            <p className="text-sm">
              No mood data logged yet — click a mood below to start!
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={moodData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#fff5" />
                <XAxis dataKey="date" stroke="#fff" />
                <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} stroke="#fff" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="#fff"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#fff" }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}

          <div className="flex gap-2 mt-4 flex-wrap">
            {[1, 2, 3, 4, 5].map((val) => (
              <button
                key={val}
                onClick={() => handleMoodUpdate(val)}
                className="px-3 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/40 text-xl transition"
              >
                {moodMap[val]}
              </button>
            ))}
          </div>
          <p className="text-sm mt-2 opacity-90">Tap an emoji to log today’s mood.</p>
          <NavLink
            to="/moodtracker"
            className="inline-block mt-3 text-yellow-900 underline font-medium"
          >
            View Full Tracker →
          </NavLink>
        </div>

        {/* Self Assessment */}
        <div className="bg-gradient-to-tr from-purple-200 to-purple-400 text-purple-900 shadow-lg hover:scale-105 hover:shadow-2xl transition-all rounded-2xl p-6">
          <h3 className="font-semibold text-lg mb-2">📝 Self Assessment</h3>
          <p className="mb-4 text-sm opacity-90">
            Check your mental wellness with a quick test.
          </p>
          <NavLink
            to="/selfassestments"
            className="inline-block bg-white text-purple-700 text-sm font-medium px-6 py-2 rounded-full hover:bg-purple-100 transition-colors"
          >
            Click to Evaluate
          </NavLink>
        </div>

        {/* Next Appointment */}
        <div className="bg-gradient-to-tr from-pink-200 to-pink-400 text-pink-900 shadow-lg hover:scale-105 hover:shadow-2xl transition-all rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={18} />
            <h3 className="font-semibold text-lg">Next Appointment</h3>
          </div>
          <p className="mb-1">Counselor: Dr. Mehta</p>
          <p className="font-semibold">Tomorrow, 5:00 PM</p>
          <button className="mt-3 bg-white text-pink-600 text-sm font-medium px-6 py-2 rounded-full hover:bg-pink-100 transition-colors">
            Join Session
          </button>
        </div>

        {/* Community Hub */}
        <div className="bg-gradient-to-tr from-teal-200 to-cyan-400 text-teal-900 shadow-lg hover:scale-105 hover:shadow-2xl transition-all rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <Users size={18} />
            <h3 className="font-semibold text-lg">Community Hub</h3>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>“Coping with exam stress”</li>
            <li>“Meditation tips for beginners”</li>
            <li>“How I improved my sleep schedule”</li>
          </ul>
          <NavLink
            to="/community"
            className="inline-block mt-3 underline font-medium"
          >
            View More →
          </NavLink>
        </div>

        {/* Resources */}
        <div className="bg-gradient-to-tr from-fuchsia-200 to-purple-400 text-fuchsia-900 shadow-lg hover:scale-105 hover:shadow-2xl transition-all rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen size={18} />
            <h3 className="font-semibold text-lg">Resources</h3>
          </div>
          <p className="mb-3 text-sm opacity-90">
            Guided meditations, self-help articles, and videos.
          </p>
          <NavLink
            to="/resourcehub"
            className="inline-block bg-white text-purple-700 text-sm font-medium px-6 py-2 rounded-full hover:bg-purple-100 transition-colors"
          >
            Explore
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
