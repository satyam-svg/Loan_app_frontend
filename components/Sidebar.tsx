"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Dashboard,
  Search,
  ReceiptLong,
  Update,
  Edit,
  BarChart,
  AccountCircle,
  Settings,
} from "@mui/icons-material";

type SidebarProps = { onItemClick?: () => void };

const menuItems = [
  { name: "Dashboard", icon: <Dashboard />, href: "/dashboard" },
  { name: "EMI Calculator", icon: <Search />, href: "/emi-calc" },
  { name: "Advanced Search", icon: <Search />, href: "/search" },
  { name: "Entries", icon: <ReceiptLong />, href: "/entries" },
  { name: "Receipts", icon: <ReceiptLong />, href: "/receipts" },
  { name: "Updates", icon: <Update />, href: "/updates" },
  { name: "Editor", icon: <Edit />, href: "/edit" },
  { name: "Analytics", icon: <BarChart />, href: "/reports" },
  { name: "Account", icon: <AccountCircle />, href: "/accounts" },
  { name: "Settings", icon: <Settings />, href: "/setup" },
];

export default function Sidebar({ onItemClick }: SidebarProps) {
  const pathname = usePathname();

  return (
    <nav className="h-full flex flex-col bg-white shadow-xl">
      {/* Logo Section */}
      <div className="p-6 mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          <span className="text-blue-600">Salon</span> Pro
        </h2>
      </div>

      {/* Menu Items */}
      <div className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <motion.div
              key={item.name}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.1 }}
            >
              <Link
                href={item.href}
                onClick={onItemClick}
                className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span
                  className={`text-xl ${
                    isActive ? "text-blue-500" : "text-gray-500"
                  }`}
                >
                  {item.icon}
                </span>
                <span className="font-medium">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full" />
                )}
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Profile Section */}
      <div className="border-t p-4 mt-auto">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <AccountCircle className="text-blue-600" />
          </div>
          <div>
            <p className="font-medium text-gray-800">John Doe</p>
            <p className="text-sm text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
