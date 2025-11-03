
"use client";
import Input from "@/components/inputs/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useState } from "react";

// Dummy Data
const SERVICES = [
  { id: "s1", name: "Therapy Session", durationMins: 60 },
  { id: "s2", name: "Career Counselling", durationMins: 45 },
  { id: "s3", name: "Exam Stress Management", durationMins: 30 },
];

const COUNSELLORS = [
  { id: "c1", name: "🌸 Dr. Aisha Sharma" },
  { id: "c2", name: "🌿 Prof. Rajiv Menon" },
  { id: "c3", name: "🌼 Dr. Kavita Iyer" },
];

// Utils
const pad2 = (n) => n.toString().padStart(2, "0");
function addMinutes(time, minsToAdd) {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + minsToAdd;
  const newH = Math.floor(total / 60);
  const newM = total % 60;
  return `${pad2(newH)}:${pad2(newM)}`;
}

export default function AppointmentBooking() {
  const [step, setStep] = useState(1);
  const [appointments, setAppointments] = useState([]);
  const [selectedCounsellor, setSelectedCounsellor] = useState(null);
  const [form, setForm] = useState({
    username: "",
    name: "",
    serviceId: "",
    date: "",
    time: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username || !form.name || !form.serviceId || !form.date || !form.time) {
      return alert("Please fill all fields");
    }
    const service = SERVICES.find((s) => s.id === form.serviceId);
    const appt = {
      id: crypto.randomUUID(),
      ...form,
      counsellorId: selectedCounsellor.id,
      counsellorName: selectedCounsellor.name,
      serviceName: service?.name,
      serviceDuration: service?.durationMins,
      createdAt: new Date().toISOString(),
    };
    setAppointments((prev) => [...prev, appt]);
    setForm({ username: "", name: "", serviceId: "", date: "", time: "" });
    setStep(3);
  };

  const removeAppointment = (id) =>
    setAppointments((prev) => prev.filter((a) => a.id !== id));

  const filteredAppointments = selectedCounsellor
    ? appointments.filter((a) => a.counsellorId === selectedCounsellor.id)
    : appointments;

  // gradient backgrounds for appointment cards
  const gradients = [
    "from-green-100 via-blue-50 to-green-200",
    "from-pink-100 via-purple-50 to-pink-200",
    "from-yellow-100 via-orange-50 to-yellow-200",
    "from-teal-100 via-cyan-50 to-teal-200",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-100 via-pink-50 to-green-100 animate-gradient">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.6),transparent_50%)]"></div>

      <Card className="w-full max-w-3xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
            🌈 Appointment Booking
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Step 1: Select Counsellor */}
          {step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {COUNSELLORS.map((c) => (
                <Button
                  key={c.id}
                  variant="outline"
                  className="h-28 text-lg font-semibold rounded-2xl shadow-md bg-gradient-to-br from-green-100 to-blue-100 hover:scale-105 hover:shadow-lg transition-all"
                  onClick={() => {
                    setSelectedCounsellor(c);
                    setStep(2);
                  }}
                >
                  {c.name}
                </Button>
              ))}
            </div>
          )}

          {/* Step 2: Booking Form */}
          {step === 2 && selectedCounsellor && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-semibold text-center mb-2 text-green-700">
                Book with {selectedCounsellor.name}
              </h2>
              <Input
                placeholder="Username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
              <Input
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <Select
                value={form.serviceId}
                onValueChange={(v) => setForm({ ...form, serviceId: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Service" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICES.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name} ({s.durationMins} mins)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
              <Input
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
              />
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-xl"
                  onClick={() => setStep(1)}
                >
                  ⬅ Back
                </Button>
                <Button className="bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-xl shadow-lg hover:opacity-90">
                  Confirm ✅
                </Button>
              </div>
            </form>
          )}

          {/* Step 3: Appointments */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-center text-indigo-600">
                📅 Your Appointments
              </h2>
              {filteredAppointments.length === 0 ? (
                <p className="text-center text-slate-600">
                  No appointments yet.
                </p>
              ) : (
                filteredAppointments.map((a, i) => (
                  <Card
                    key={a.id}
                    className={`p-4 flex justify-between items-center rounded-2xl shadow-md bg-gradient-to-r ${gradients[i % gradients.length]}`}
                  >
                    <div>
                      <p className="font-medium text-slate-800">
                        {a.time} - {addMinutes(a.time, a.serviceDuration)} (
                        {a.serviceName})
                      </p>
                      <p className="text-sm text-slate-700">
                        {a.username} ({a.name})
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="rounded-lg"
                      onClick={() => removeAppointment(a.id)}
                    >
                      Delete
                    </Button>
                  </Card>
                ))
              )}
              <Button
                className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-xl shadow-lg hover:opacity-90"
                onClick={() => setStep(1)}
              >
                ➕ Book Another
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
