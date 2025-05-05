"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FiDollarSign,
  FiPercent,
  FiCalendar,
  FiClock,
  FiType,
  FiRepeat,
  FiTrendingUp,
  FiInfo,
} from "react-icons/fi";

export default function EmiCalculator() {
  const [interestType, setInterestType] = useState<"flat" | "reducing">("flat");
  const [loanDate, setLoanDate] = useState(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date.toISOString().split("T")[0];
  });
  const [loanAmount, setLoanAmount] = useState<number>(40000);
  const [interestRate, setInterestRate] = useState<number>(13.5);
  const [tenureMonths, setTenureMonths] = useState<number>(11);
  const [emiPattern, setEmiPattern] = useState<"arrears" | "advance">(
    "arrears"
  );
  const [emi, setEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [irr, setIrr] = useState<number>(26.21);
  const [agreementValue, setAgreementValue] = useState<number>(45400);
  const [showResults, setShowResults] = useState(false);
  const [schedule, setSchedule] = useState<
    Array<{
      month: number;
      date: string;
      emi: number;
      balance: number;
    }>
  >([]);

  useEffect(() => {
    if (showResults) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [showResults]);

  const calculatePaymentDate = (start: string, months: number) => {
    const date = new Date(start);
    date.setMonth(date.getMonth() + months);
    return date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-");
  };

  const calculateEMI = () => {
    const principal = loanAmount;
    const rate = interestRate / 100;
    const time = tenureMonths;

    let calculatedEmi = 0;
    let calculatedTotalInterest = 0;
    let calculatedTotalPayment = 0;
    let newSchedule = [];

    if (interestType === "reducing") {
      const monthlyRate = rate / 12;
      const numerator =
        principal * monthlyRate * Math.pow(1 + monthlyRate, time);
      const denominator = Math.pow(1 + monthlyRate, time) - 1;
      calculatedEmi = numerator / denominator;

      let balance = principal;
      for (let i = 0; i < time; i++) {
        const interest = balance * monthlyRate;
        const principalComponent = calculatedEmi - interest;
        balance -= principalComponent;
        newSchedule.push({
          month: i + 1,
          date: calculatePaymentDate(
            loanDate,
            i + (emiPattern === "advance" ? 0 : 1)
          ),
          emi: calculatedEmi,
          balance: Math.max(balance, 0),
        });
      }
      calculatedTotalInterest = calculatedEmi * time - principal;
      calculatedTotalPayment = calculatedEmi * time;
    } else {
      calculatedTotalInterest = principal * rate;
      calculatedTotalPayment = principal + calculatedTotalInterest;
      calculatedEmi = calculatedTotalPayment / time;

      let balance = calculatedTotalPayment;
      for (let i = 0; i < time; i++) {
        balance -= calculatedEmi;
        newSchedule.push({
          month: i + 1,
          date: calculatePaymentDate(loanDate, i + 1),
          emi: calculatedEmi,
          balance: Math.max(balance, 0),
        });
      }
    }

    // Calculate derived values
    setIrr((calculatedTotalPayment / principal - 1) * 100);
    setAgreementValue(calculatedTotalPayment);

    setSchedule(newSchedule);
    setEmi(calculatedEmi);
    setTotalInterest(calculatedTotalInterest);
    setTotalPayment(calculatedTotalPayment);
    setShowResults(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Smart EMI Calculator
          </h1>
          <p className="text-gray-600">
            Calculate your monthly payments with advanced financial insights
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-2xl p-8 shadow-xl mb-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="relative">
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  <FiType className="inline mr-2 text-blue-500" />
                  Interest Type
                </label>
                <select
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  value={interestType}
                  onChange={(e) => setInterestType(e.target.value as any)}
                >
                  <option value="flat">Flat Rate</option>
                  <option value="reducing">Reducing Balance</option>
                </select>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  <FiCalendar className="inline mr-2 text-purple-500" />
                  Loan Start Date
                </label>
                <input
                  type="date"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  value={loanDate}
                  onChange={(e) => setLoanDate(e.target.value)}
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  <FiDollarSign className="inline mr-2 text-green-500" />
                  Loan Amount (₹)
                </label>
                <input
                  type="number"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="relative">
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  <FiPercent className="inline mr-2 text-red-500" />
                  Annual Interest Rate (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  <FiClock className="inline mr-2 text-orange-500" />
                  Loan Tenure (Months)
                </label>
                <input
                  type="number"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                  value={tenureMonths}
                  onChange={(e) => setTenureMonths(Number(e.target.value))}
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  <FiRepeat className="inline mr-2 text-pink-500" />
                  EMI Payment Pattern
                </label>
                <select
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all"
                  value={emiPattern}
                  onChange={(e) => setEmiPattern(e.target.value as any)}
                >
                  <option value="arrears">End of Month</option>
                  <option value="advance">Start of Month</option>
                </select>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={calculateEMI}
            className="mt-8 w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 px-8 rounded-xl font-semibold shadow-lg transition-all"
          >
            Calculate EMI Now
          </motion.button>
        </div>

        {showResults && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
          >
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                <div className="flex items-center mb-2">
                  <FiDollarSign className="text-blue-500 mr-2" />
                  <h3 className="font-semibold text-gray-700">Monthly EMI</h3>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  ₹{emi.toFixed(2)}
                </div>
              </div>

              <div className="bg-green-50 p-5 rounded-xl border border-green-100">
                <div className="flex items-center mb-2">
                  <FiTrendingUp className="text-green-500 mr-2" />
                  <h3 className="font-semibold text-gray-700">IRR %</h3>
                </div>
                <div className="text-2xl font-bold text-green-600">
                  {irr.toFixed(2)}%
                </div>
              </div>

              <div className="bg-purple-50 p-5 rounded-xl border border-purple-100">
                <div className="flex items-center mb-2">
                  <FiInfo className="text-purple-500 mr-2" />
                  <h3 className="font-semibold text-gray-700">
                    Agreement Value
                  </h3>
                </div>
                <div className="text-2xl font-bold text-purple-600">
                  ₹{agreementValue.toFixed(2)}
                </div>
              </div>

              <div className="bg-orange-50 p-5 rounded-xl border border-orange-100">
                <div className="flex items-center mb-2">
                  <FiClock className="text-orange-500 mr-2" />
                  <h3 className="font-semibold text-gray-700">
                    EMIs Remaining
                  </h3>
                </div>
                <div className="text-2xl font-bold text-orange-600">
                  {tenureMonths}
                </div>
              </div>
            </div>

            {/* Payment Schedule */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Payment Schedule Breakdown
              </h3>
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Month
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Payment Date
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        EMI Amount
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Remaining Balance
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {schedule.map((item, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-gray-600">
                          {item.month}
                        </td>
                        <td className="px-6 py-4 text-gray-600">{item.date}</td>
                        <td className="px-6 py-4 font-medium text-gray-700">
                          ₹{item.emi.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-700">
                          ₹{item.balance.toFixed(2)}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-50 p-5 rounded-xl border border-red-100">
                <div className="flex items-center mb-2">
                  <FiInfo className="text-red-500 mr-2" />
                  <h3 className="font-semibold text-gray-700">
                    Total Interest Payable
                  </h3>
                </div>
                <div className="text-2xl font-bold text-red-600">
                  ₹{totalInterest.toFixed(2)}
                </div>
              </div>

              <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100">
                <div className="flex items-center mb-2">
                  <FiDollarSign className="text-indigo-500 mr-2" />
                  <h3 className="font-semibold text-gray-700">Total Payment</h3>
                </div>
                <div className="text-2xl font-bold text-indigo-600">
                  ₹{totalPayment.toFixed(2)}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
