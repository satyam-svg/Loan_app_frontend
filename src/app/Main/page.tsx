"use client";

import { motion } from "framer-motion";
import {
  FiAlertCircle,
  FiDollarSign,
  FiFileText,
  FiCalendar,
  FiCreditCard,
  FiTrendingUp,
} from "react-icons/fi";
import { FaCar } from "react-icons/fa";

<FaCar size={24} />;

export default function HomePage() {
  const stats = [
    {
      title: "Vehicle Entry Pending",
      value: 3,
      icon: <FaCar className="w-6 h-6" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Overdue Loans",
      value: "1,527",
      icon: <FiAlertCircle className="w-6 h-6" />,
      color: "bg-red-100 text-red-600",
    },
    {
      title: "Registration No Pending",
      value: 70,
      icon: <FiFileText className="w-6 h-6" />,
      color: "bg-amber-100 text-amber-600",
    },
    {
      title: "DP Balance",
      value: "₹91,95,668.90",
      icon: <FiDollarSign className="w-6 h-6" />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Insurance Policy Pending",
      value: "4,257",
      icon: <FiCalendar className="w-6 h-6" />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Cheques in Clearing",
      value: "₹1,48,675.00",
      icon: <FiCreditCard className="w-6 h-6" />,
      color: "bg-cyan-100 text-cyan-600",
    },
    {
      title: "Balance EMI Amount",
      value: "₹42,78,41,145.00",
      icon: <FiTrendingUp className="w-6 h-6" />,
      color: "bg-indigo-100 text-indigo-600",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800">
          Financial Dashboard
        </h1>
        <p className="mt-2 text-gray-600">Real-time financial overview</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-800">
                  {stat.value}
                </p>
              </div>
              <div className={`rounded-lg p-3 ${stat.color}`}>{stat.icon}</div>
            </div>

            {/* Animated Trend Indicator */}
            <div className="mt-4">
              <motion.div
                className="flex items-center text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-green-500">↑ 2.3%</span>
                <span className="ml-2 text-gray-500">vs last month</span>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detailed Summary Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 bg-white rounded-xl shadow-sm p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Detailed Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <SummaryItem
              title="Account Number Not Received"
              value={24}
              color="bg-blue-100"
            />
            <SummaryItem
              title="NOCs To Be Given"
              value={251}
              color="bg-amber-100"
            />
            <SummaryItem
              title="Vehicle Invoice Pending"
              value={3397}
              color="bg-red-100"
            />
          </div>
          <div className="space-y-4">
            <SummaryItem
              title="NOCs Awaited"
              value={1019}
              color="bg-purple-100"
            />
            <SummaryItem
              title="Pending Documents"
              value={85}
              color="bg-green-100"
            />
            <SummaryItem
              title="Active Loans"
              value={1527}
              color="bg-cyan-100"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function SummaryItem({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <motion.div
      whileHover={{ x: 5 }}
      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
    >
      <span className="text-gray-600">{title}</span>
      <span
        className={`px-3 py-1 rounded-full ${color} text-gray-700 font-medium`}
      >
        {value.toLocaleString()}
      </span>
    </motion.div>
  );
}
