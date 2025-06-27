import React, { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setError("");
    setMessage("");
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("⚠️ Please select a file before uploading.");
      return;
    }

    const supportedTypes = ["audio/mpeg", "audio/wav", "audio/x-m4a", "audio/mp4", "audio/mp3"];
    if (!supportedTypes.includes(file.type)) {
      setError("❌ Unsupported file format. Please upload .mp3, .wav, or .m4a files.");
      return;
    }

    const formData = new FormData();
    formData.append("audio", file);

    try {
      setLoading(true);

      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/process-audio`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Server Response:", res.data);

      // ✅ Updated condition and response handling
      if (!res.data || !res.data.text) {
        setError("❌ Transcription failed. Please try again.");
        setMessage("");
      } else {
        setMessage(res.data.text);
        setError("");
      }
    } catch (err) {
      console.error("❌ API Error:", err);
      setError("❌ Transcription failed due to server error.");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };
   
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">🎤 Upload Audio File</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          onChange={handleFileChange}
          accept="audio/*"
          className="border border-gray-300 rounded px-3 py-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-2 px-4 rounded hover:from-blue-600 hover:to-indigo-600 transition disabled:opacity-50"
        >
          {loading ? "⏳ Uploading..." : "🚀 Upload & Transcribe"}
        </button>
      </form>

      {error && (
        <p className="mt-4 text-red-700 bg-red-100 border border-red-300 px-4 py-2 rounded text-center">
          {error}
        </p>
      )}

      {message && (
        <p className="mt-6 bg-gray-100 p-4 rounded text-gray-800 text-lg font-medium">
          📄 Transcription: {message}
        </p>
      )}
    </div>
  );
};

export default Upload;
