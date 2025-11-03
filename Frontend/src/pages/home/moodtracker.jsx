"use client";

import { UserContext } from "@/context/usercontext";
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

// Mood options with emoji and soft gradient colors
const moods = [
  { name: "Excited", emoji: "🤩", color: "from-yellow-300 to-yellow-200" },
  { name: "Happy", emoji: "😊", color: "from-green-300 to-green-200" },
  { name: "Calm", emoji: "😌", color: "from-blue-200 to-blue-100" },
  { name: "Surprised", emoji: "😮", color: "from-pink-200 to-pink-100" },
  { name: "Anxious", emoji: "😬", color: "from-orange-200 to-orange-100" },
  { name: "Sad", emoji: "😢", color: "from-indigo-300 to-indigo-200" },
  { name: "Angry", emoji: "😡", color: "from-red-300 to-red-200" },
  { name: "Tired", emoji: "🥱", color: "from-purple-200 to-purple-100" },
  { name: "Frustrated", emoji: "😤", color: "from-rose-200 to-rose-100" },
];

const getToday = () => {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};

const getMonthName = (month) =>
  new Date(2000, month, 1).toLocaleString("default", { month: "long" });

const habits = [
  { name: "sleep 8hrs" },
  { name: "meditate" },
  { name: "exercise" },
];

const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

const MoodTracker = () => {
  const { user } = useContext(UserContext);
  const [selectedMood, setSelectedMood] = useState(null);
  const [journal, setJournal] = useState({});
  const [entry, setEntry] = useState("");
  const [activeTab, setActiveTab] = useState("month");
  const [calendar, setCalendar] = useState({});
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [habitData, setHabitData] = useState({});
  const now = new Date();
  const [displayMonth, setDisplayMonth] = useState(now.getMonth());
  const [displayYear, setDisplayYear] = useState(now.getFullYear());
  const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();
  const today = getToday();

  const handleMoodSelect = async (mood) => {
    setSelectedMood(mood);
    const dateKey = `${displayYear}-${displayMonth + 1}-${now.getDate()}`;
    setCalendar((prev) => ({ ...prev, [dateKey]: mood }));

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8000/api/moods",
        { date: dateKey, mood },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {}
  };

  const handleAddEntry = () => {
    const dateKey = `${displayYear}-${displayMonth + 1}-${now.getDate()}`;
    if (entry.trim()) {
      setJournal((prev) => ({
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), entry],
      }));
      setEntry("");
    }
  };

  const handleHabit = (habit) => {
    setHabitData((prev) => ({
      ...prev,
      [habit]: prev[habit] === today ? null : today,
    }));
  };

  const getCurrentWeekDates = () => {
    const now = new Date();
    const monday = new Date(now);
    const day = now.getDay() === 0 ? 6 : now.getDay() - 1;
    monday.setDate(now.getDate() - day);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    });
  };

  const toggleHabitDay = (habit, dateKey) => {
    setHabitData((prev) => {
      const updated = {
        ...(prev[habit] || {}),
        [dateKey]: !(prev[habit] && prev[habit][dateKey]),
      };
      const weekDates = getCurrentWeekDates();
      const allDone = weekDates.every((d) => updated[d]);
      if (allDone) weekDates.forEach((d) => (updated[d] = false));
      return { ...prev, [habit]: updated };
    });
  };

  const changeMonth = (offset) => {
    let newMonth = displayMonth + offset;
    let newYear = displayYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    setDisplayMonth(newMonth);
    setDisplayYear(newYear);
  };

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/api/moods", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const moodsObj = {};
        res.data.forEach((m) => {
          moodsObj[m.date] = m.mood;
        });
        setCalendar(moodsObj);
      } catch (err) {}
    };
    fetchMoods();
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-start bg-gradient-to-br from-green-50 via-yellow-50 to-pink-50 p-6">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-green-800">
            DEAR {user?.name?.split(" ")[0] || "ADI"}! 🌸
          </h1>
          <p className="text-gray-700">How was your day?</p>
        </div>

        {/* Mood Selector */}
        <div className="grid grid-cols-3 gap-3">
          {moods.map((m) => (
            <button
              key={m.name}
              onClick={() => handleMoodSelect(m.name)}
              className={`flex flex-col items-center justify-center rounded-xl px-4 py-3 text-sm font-medium text-black shadow-md transform transition-all duration-200 hover:scale-105 bg-gradient-to-br ${m.color}`}
            >
              <span className="text-3xl">{m.emoji}</span>
              <span>{m.name}</span>
            </button>
          ))}
        </div>

        {/* Calendar & Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="flex justify-between mb-3 items-center">
            <span className="font-semibold text-green-700">MY CALENDAR</span>
            <div className="flex items-center gap-2">
              {activeTab === "month" && (
                <>
                  <button
                    onClick={() => changeMonth(-1)}
                    className="px-2 py-1 rounded-lg bg-green-100 hover:bg-green-200"
                  >
                    &lt;
                  </button>
                  <span className="font-semibold text-green-700">
                    {getMonthName(displayMonth)} {displayYear}
                  </span>
                  <button
                    onClick={() => changeMonth(1)}
                    className="px-2 py-1 rounded-lg bg-green-100 hover:bg-green-200"
                  >
                    &gt;
                  </button>
                </>
              )}
              {["month", "week", "graph"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-2 py-1 text-sm rounded-lg font-medium ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-green-200 to-yellow-200"
                      : "bg-green-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Month Calendar */}
          {activeTab === "month" && (
            <div className="grid grid-cols-7 gap-2 text-center">
              {[...Array(daysInMonth)].map((_, i) => {
                const dateKey = `${displayYear}-${displayMonth + 1}-${i + 1}`;
                const mood = calendar[dateKey];
                const moodObj = moods.find((m) => m.name === mood);
                return (
                  <div
                    key={i}
                    className={`p-2 rounded-xl border text-lg font-medium ${
                      moodObj
                        ? `bg-gradient-to-br ${moodObj.color}`
                        : "bg-green-50"
                    }`}
                  >
                    {moodObj ? moodObj.emoji : i + 1}
                  </div>
                );
              })}
            </div>
          )}

          {/* Week View */}
          {activeTab === "week" && (
            <div className="flex justify-between items-center px-2 py-4">
              {weekDays.map((d, idx) => {
                const date = new Date(now);
                const monday = new Date(date);
                const day = date.getDay() === 0 ? 6 : date.getDay() - 1;
                monday.setDate(date.getDate() - day + idx);
                const dateKey = `${monday.getFullYear()}-${
                  monday.getMonth() + 1
                }-${monday.getDate()}`;
                const mood = calendar[dateKey];
                const moodObj = moods.find((m) => m.name === mood);
                return (
                  <div
                    key={d}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl border text-lg ${
                      moodObj
                        ? `bg-gradient-to-br ${moodObj.color}`
                        : "bg-green-50"
                    }`}
                  >
                    {moodObj ? moodObj.emoji : d}
                  </div>
                );
              })}
            </div>
          )}

          {/* Graph View */}
          {activeTab === "graph" && (
            <div className="w-full h-48 flex items-end gap-2">
              {moods.map((m) => {
                const count = Object.values(calendar).filter(
                  (v) => v === m.name
                ).length;
                return (
                  <div key={m.name} className="flex flex-col items-center">
                    <div
                      className={`w-8 rounded-t-lg bg-gradient-to-br ${m.color} transition-all duration-300`}
                      style={{ height: `${count * 20}px` }}
                    />
                    <span className="text-xs mt-1">{m.emoji}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Journal */}
        <div className="bg-gradient-to-br from-yellow-50 to-pink-50 rounded-2xl shadow-lg p-4">
          <div className="mb-2 text-green-700 font-semibold">
            {new Date().toLocaleString("default", { month: "long", day: "numeric" })}
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {moods.map((m) => (
              <button
                key={m.name}
                onClick={() => handleMoodSelect(m.name)}
                className={`px-3 py-1 rounded-full text-sm border font-medium ${
                  selectedMood === m.name
                    ? `bg-gradient-to-br ${m.color}`
                    : "bg-green-50"
                }`}
              >
                {m.emoji} {m.name}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="what happened?"
            className="w-full border rounded-xl p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <button
            onClick={handleAddEntry}
            className="bg-gradient-to-r from-green-300 to-yellow-200 text-white px-4 py-2 rounded-xl shadow-md hover:scale-105 transition-transform"
          >
            +
          </button>
          <div className="mt-4 space-y-2">
            {(journal[today] || []).map((j, i) => (
              <div
                key={i}
                className="border-b py-2 text-gray-700 bg-green-50 rounded-md px-2"
              >
                {j}
              </div>
            ))}
          </div>
        </div>

        {/* Habit Tracker */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-4">
          <div className="font-bold mb-2 text-blue-700">TRACK OTHER HABITS</div>
          {habits.map((h) => (
            <div key={h.name} className="flex flex-col gap-2 mb-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setSelectedHabit(selectedHabit === h.name ? null : h.name)
                  }
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                    habitData[h.name] && habitData[h.name][getToday()]
                      ? "bg-blue-400 border-blue-500"
                      : "bg-blue-200"
                  }`}
                >
                  {habitData[h.name] && habitData[h.name][getToday()] && (
                    <span className="block w-3 h-3 bg-blue-600 rounded-full"></span>
                  )}
                </button>
                <span className="text-sm">{h.name}</span>
              </div>
              {selectedHabit === h.name && (
                <div className="flex gap-2 mt-2 ml-8 items-center">
                  {weekDays.map((label, idx) => {
                    const now = new Date();
                    const monday = new Date(now);
                    const day = now.getDay() === 0 ? 6 : now.getDay() - 1;
                    monday.setDate(now.getDate() - day + idx);
                    const dateKey = `${monday.getFullYear()}-${monday.getMonth() + 1}-${monday.getDate()}`;
                    const done =
                      habitData[h.name] && habitData[h.name][dateKey];
                    return (
                      <div key={label} className="flex flex-col items-center">
                        <button
                          onClick={() => toggleHabitDay(h.name, dateKey)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                            done
                              ? "bg-blue-400 border-blue-500"
                              : "bg-gray-200"
                          }`}
                          title={label}
                        >
                          {done && (
                            <span className="block w-3 h-3 bg-blue-600 rounded-full"></span>
                          )}
                        </button>
                        <span className="text-xs mt-1">{label}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
