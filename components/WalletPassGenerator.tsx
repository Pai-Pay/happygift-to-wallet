"use client";

import { useState } from "react";

// Replace with your actual Lambda/API Gateway URL
const API_URL = "https://ckla150si3.execute-api.eu-central-1.amazonaws.com/happygift-to-wallet";

export default function WalletPassGenerator() {
  const [loading, setLoading] = useState(false);
  const [passUrl, setPassUrl] = useState<string | null>(null);

  // Form state matching the API requirements mentioned in the doc
  const [formData, setFormData] = useState({
    name: "Israel Israeli",
    balance: "150.00",
    serialNumber: "123456789",
    backgroundColor: "rgb(60, 60, 60)", // Default dark gray
    labelColor: "rgb(255, 255, 255)", // Default white
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPassUrl(null);

    try {
      // Sending POST request to the Lambda
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to generate pass");
      }

      const data = await response.json();

      // Assuming the API returns a JSON object with the S3 URL, e.g., { url: "..." }
      // Adjust 'data.url' if the key is different
      if (data.url) {
        setPassUrl(data.url);
      } else {
        console.error("URL not found in response", data);
      }
    } catch (error) {
      console.error("Error generating pass:", error);
      alert("Error generating pass. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-10 border border-gray-100">
        {/* Show form only when pass is not generated */}
        {!passUrl ? (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Wallet Pass Generator
              </h1>
              <p className="text-gray-500 text-sm">
                Create your personalized digital wallet pass
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl border-2 border-gray-200 p-3.5 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-gray-900 placeholder-gray-400"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Balance Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Balance
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₪</span>
              <input
                type="text"
                name="balance"
                value={formData.balance}
                onChange={handleChange}
                className="w-full rounded-xl border-2 border-gray-200 p-3.5 pl-10 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-gray-900 placeholder-gray-400"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          {/* Serial Number Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Serial Number
            </label>
            <input
              type="text"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleChange}
              className="w-full rounded-xl border-2 border-gray-200 p-3.5 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-gray-900 placeholder-gray-400 font-mono"
              placeholder="123456789"
              required
            />
          </div>

          {/* Background Color (RGB) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Background Color
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                name="backgroundColor"
                placeholder="rgb(60, 60, 60)"
                value={formData.backgroundColor}
                onChange={handleChange}
                className="flex-1 rounded-xl border-2 border-gray-200 p-3.5 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-gray-900 placeholder-gray-400 font-mono text-sm"
              />
              <div 
                className="w-14 h-14 rounded-xl border-2 border-gray-200 shadow-inner"
                style={{ backgroundColor: formData.backgroundColor }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl shadow-lg text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] mt-6"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Generating Pass...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Generate Pass
              </>
            )}
          </button>
        </form>
        </>
      ) : (
        /* Success View - Pass Card Takes Full Space */
        <div className="space-y-6">
          {/* Success Card */}
          <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4 animate-bounce">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              Pass Ready!
            </h2>
            <p className="text-green-700 mb-6">
              Your wallet pass has been generated successfully
            </p>

            <a
              href={passUrl}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-900 text-base font-semibold rounded-xl text-white bg-gray-900 hover:bg-gray-800 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
              </svg>
              Add to Apple Wallet
            </a>

            <p className="text-xs text-gray-600 mt-4 flex items-center justify-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Works best on iPhone or iPad
            </p>
          </div>

          {/* Reset Button */}
          <button
            onClick={() => setPassUrl(null)}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-base font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Create Another Pass
          </button>
        </div>
      )}
      </div>
    </main>
  );
}