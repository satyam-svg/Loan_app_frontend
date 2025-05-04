"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, User } from "react-feather";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 20,
        delay: 0.2,
      },
    },
    exit: {
      opacity: 0,
      x: -30,
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 20,
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          {/* Header */}
          <div className="flex justify-center gap-4 mb-6">
            <motion.button
              onClick={() => setIsLogin(true)}
              className={`text-lg font-semibold px-4 py-2 relative ${
                isLogin ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Login
              {isLogin && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 w-full h-1 bg-purple-600 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              )}
            </motion.button>

            <motion.button
              onClick={() => setIsLogin(false)}
              className={`text-lg font-semibold px-4 py-2 relative ${
                !isLogin ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Sign Up
              {!isLogin && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 w-full h-1 bg-purple-600 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              )}
            </motion.button>
          </div>

          {/* Scrollable Form Container */}
          <div className="max-h-[500px] overflow-y-auto px-2">
            <AnimatePresence mode="wait">
              <motion.form
                key={isLogin ? "login" : "signup"}
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-5"
              >
                {/* Name Field (Signup only) */}
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                  >
                    <label className="flex items-center gap-2 text-gray-700">
                      <User className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-medium">Full Name</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all placeholder-gray-400 text-sm"
                      placeholder="John Doe"
                    />
                  </motion.div>
                )}

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-700">
                    <Mail className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium">Email Address</span>
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all placeholder-gray-400 text-sm"
                    placeholder="name@company.com"
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-700">
                    <Lock className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium">Password</span>
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all placeholder-gray-400 text-sm"
                    placeholder="••••••••"
                  />
                </div>

                {/* Confirm Password (Signup only) */}
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                  >
                    <label className="flex items-center gap-2 text-gray-700">
                      <Lock className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-medium">
                        Confirm Password
                      </span>
                    </label>
                    <input
                      type="password"
                      className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all placeholder-gray-400 text-sm"
                      placeholder="••••••••"
                    />
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold text-sm shadow-md transition-colors"
                >
                  {isLogin ? "Login to Account" : "Create Account"}
                </motion.button>

                {/* Toggle Text */}
                <p className="text-center text-gray-600 mt-4 text-sm">
                  {isLogin
                    ? "Don't have an account?"
                    : "Already have an account?"}{" "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-purple-600 hover:text-purple-700 font-medium underline underline-offset-4"
                  >
                    {isLogin ? "Sign Up" : "Login"}
                  </button>
                </p>
              </motion.form>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthForm;
