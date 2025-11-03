
import React, { useState, useEffect } from "react";
import axios from "axios";

const moodOptions = [
  { emoji: "😊", color: "from-yellow-200 to-yellow-100" },
  { emoji: "😔", color: "from-blue-200 to-blue-100" },
  { emoji: "😤", color: "from-red-200 to-red-100" },
  { emoji: "😴", color: "from-purple-200 to-purple-100" },
  { emoji: "🤯", color: "from-pink-200 to-pink-100" },
];

export default function PeerForum() {
  const [threads, setThreads] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [mood, setMood] = useState("😊");
  const [anonymous, setAnonymous] = useState(true);

  // Fetch threads from backend
  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/api/forum/threads", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setThreads(res.data);
      } catch (err) {
        console.error("Failed to fetch threads:", err);
      }
    };
    fetchThreads();
  }, []);

  const addThread = async () => {
    if (!newPost.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:8000/api/forum/threads",
        { text: newPost, mood, anonymous },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setThreads([
        { ...res.data, comments: [], reactions: { like: 0, love: 0, hug: 0 } },
        ...threads,
      ]);
      setNewPost("");
    } catch (err) {
      console.error("Failed to create thread:", err);
    }
  };

  const addComment = async (threadId, text) => {
    if (!text.trim()) return;
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:8000/api/forum/${threadId}/comments`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setThreads(threads.map((t) => (t._id === threadId ? res.data : t)));
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };

  const addReaction = async (threadId, type) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:8000/api/forum/${threadId}/reactions`,
        { type },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setThreads(threads.map((t) => (t._id === threadId ? res.data : t)));
    } catch (err) {
      console.error("Failed to react:", err);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-green-50 via-yellow-50 to-pink-50">
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-3 space-y-6">
          <h2 className="text-2xl font-bold text-green-700">Peer Forum 🌿</h2>

          {/* Create Post */}
          <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 p-4 rounded-2xl shadow hover:shadow-lg transition-all">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-200"
            />
            <div className="flex justify-between items-center mt-2 flex-wrap gap-2">
              <select
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="border p-1 rounded-md"
              >
                {moodOptions.map((m) => (
                  <option key={m.emoji}>{m.emoji}</option>
                ))}
              </select>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={anonymous}
                  onChange={() => setAnonymous(!anonymous)}
                />
                <span>Post Anonymously</span>
              </label>

              <button
                onClick={addThread}
                className="bg-green-400 text-white px-4 py-2 rounded-xl hover:bg-green-500 transition-all"
              >
                Post
              </button>
            </div>
          </div>

          {/* Threads List */}
          {threads.map((thread) => {
            const moodObj = moodOptions.find((m) => m.emoji === thread.mood);
            return (
              <div
                key={thread._id}
                className={`p-4 rounded-2xl shadow hover:shadow-lg transition-all ${
                  moodObj ? `bg-gradient-to-br ${moodObj.color}` : "bg-white"
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xl">{thread.mood}</span>
                  <h3 className="font-semibold text-lg">{thread.text}</h3>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  Category: {thread.category || "general"} | By{" "}
                  {thread.anonymous ? "Anonymous" : thread.user?.name || "User"}
                </p>

                {/* Reactions */}
                <div className="flex space-x-3 mb-3 flex-wrap gap-2">
                  <button
                    onClick={() => addReaction(thread._id, "like")}
                    className="px-2 py-1 bg-white rounded-lg hover:bg-gray-100 transition-all"
                  >
                    👍 {thread.reactions?.like || 0}
                  </button>
                  <button
                    onClick={() => addReaction(thread._id, "love")}
                    className="px-2 py-1 bg-white rounded-lg hover:bg-gray-100 transition-all"
                  >
                    ❤ {thread.reactions?.love || 0}
                  </button>
                  <button
                    onClick={() => addReaction(thread._id, "hug")}
                    className="px-2 py-1 bg-white rounded-lg hover:bg-gray-100 transition-all"
                  >
                    🤗 {thread.reactions?.hug || 0}
                  </button>
                </div>

                {/* Comments */}
                <div className="mt-2">
                  <h4 className="font-semibold text-sm mb-1">Comments:</h4>
                  {thread.comments?.map((c, i) => (
                    <p key={c._id || i} className="text-sm text-gray-700 ml-2">
                      <span className="font-medium">{c.author || "User"}:</span>{" "}
                      {c.text}
                    </p>
                  ))}
                  <CommentBox threadId={thread._id} addComment={addComment} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidebar */}
        <div className="col-span-1 bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-2xl shadow space-y-4">
          <h3 className="text-lg font-semibold text-blue-700">Quick Help 🌸</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>📞 Helpline: 1800-123-456</li>
            <li>🧘 Guided Meditation</li>
            <li>
              📺{" "}
              <a
                href="https://youtube.com"
                className="text-blue-600 underline"
              >
                Wellness Videos
              </a>
            </li>
            <li>💡 Tip: “This forum is peer support, not medical advice.”</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Comment box component
function CommentBox({ threadId, addComment }) {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (comment.trim()) {
      addComment(threadId, comment);
      setComment("");
    }
  };

  return (
    <div className="flex mt-2 space-x-2">
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
        className="flex-grow border p-1 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-200"
      />
      <button
        onClick={handleSubmit}
        className="bg-green-400 text-white px-2 py-1 rounded-md text-sm hover:bg-green-500 transition-all"
      >
        Reply
      </button>
    </div>
  );
}
