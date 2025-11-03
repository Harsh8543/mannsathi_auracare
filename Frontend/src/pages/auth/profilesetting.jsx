
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Input from "@/components/inputs/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
        setFormData(res.data);
      } catch (err) {
        console.error("Profile fetch error:", err.response?.data || err.message);
        toast.error("Failed to fetch profile");
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "http://localhost:8000/api/user/profile",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfile(res.data);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Profile update error:", err.response?.data || err.message);
      toast.error("Failed to update profile");
    }
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-screen bg-green-50">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  const avatarUrl =
    profile.profilePic ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
      profile.name || "U"
    )}`;

  return (
    <div
      className="p-6 min-h-screen"
      style={{
        background: "linear-gradient(to bottom, #d9f0f0, #f0e5d9)", // soft peaceful background
      }}
    >
      <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-lg p-6 space-y-6">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Avatar className="w-24 h-24 border-4 border-green-300 shadow-lg">
            <AvatarImage src={avatarUrl} alt={profile.name} />
            <AvatarFallback>
              {profile.name ? profile.name.charAt(0).toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h2 className="text-3xl font-bold text-green-800">{profile.name}</h2>
            <p className="text-gray-700">{profile.bio || "-"}</p>
            <p className="text-gray-500 text-sm">{profile.email}</p>
            <p className="text-gray-500 text-sm">
              Height: {profile.height ?? "-"} cm | Weight: {profile.weight ?? "-"} kg
            </p>
            <p className="text-gray-500 text-sm">
              Category: {profile.psychCategory || "-"}
            </p>
            <Button
              className="mt-3 bg-green-200 text-green-800 hover:bg-green-300 hover:text-green-900"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Wellness Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl text-center" style={{ background: "#FFEFDB" }}>
            <h3 className="text-xl font-bold text-orange-700">🔥 {profile.streak ?? 0}</h3>
            <p className="text-gray-700">Day Streak</p>
          </div>
          <div className="p-4 rounded-xl text-center" style={{ background: "#D8F3DC" }}>
            <h3 className="text-xl font-bold text-green-700">{profile.wellnessPoints ?? 0}</h3>
            <p className="text-gray-700">Wellness Points</p>
          </div>
          <div className="p-4 rounded-xl text-center" style={{ background: "#FCE4EC" }}>
            <h3 className="text-xl font-bold text-pink-700">{profile.currentMood || "😊"}</h3>
            <p className="text-gray-700">Current Mood</p>
          </div>
        </div>

        {/* Edit Profile Modal */}
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-green-700">Edit Profile</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <Input
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                placeholder="Name"
              />
              <Input
                name="email"
                type="email"
                value={formData.email || ""}
                onChange={handleChange}
                placeholder="Email"
              />
              <Textarea
                name="bio"
                value={formData.bio || ""}
                onChange={handleChange}
                placeholder="Bio"
              />
              <Input
                name="height"
                type="number"
                value={formData.height || ""}
                onChange={handleChange}
                placeholder="Height (cm)"
              />
              <Input
                name="weight"
                type="number"
                value={formData.weight || ""}
                onChange={handleChange}
                placeholder="Weight (kg)"
              />
              <Input
                name="psychCategory"
                value={formData.psychCategory || ""}
                onChange={handleChange}
                placeholder="Psychology Category"
              />
            </div>

            <DialogFooter className="flex justify-end gap-3 mt-4">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
