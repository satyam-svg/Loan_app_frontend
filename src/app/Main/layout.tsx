"use client";

import { useState } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { IconButton, Drawer, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../../../components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");
  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  return (
    <html lang="en" className="h-full">
      <head>
        <title>Salon Management Pro</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="h-full bg-gray-50">
        <AppRouterCacheProvider>
          {/* Mobile Header */}
          {isMobile && (
            <header className="sticky top-0 bg-white shadow-sm z-50">
              <div className="flex items-center p-4">
                <IconButton
                  onClick={toggleDrawer}
                  className="text-gray-600 hover:bg-gray-100"
                >
                  <MenuIcon />
                </IconButton>
                <h1 className="text-xl font-semibold ml-2 text-gray-800">
                  Salon Dashboard
                </h1>
              </div>
            </header>
          )}

          {/* Desktop Sidebar */}
          <div className="hidden md:block fixed left-0 top-0 h-full w-64">
            <Sidebar />
          </div>

          {/* Mobile Drawer */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={toggleDrawer}
            ModalProps={{ keepMounted: true }}
            PaperProps={{
              className: "w-64",
              style: {
                top: isMobile ? "64px" : "0",
                height: isMobile ? "calc(100% - 64px)" : "100%",
              },
            }}
          >
            <Sidebar onItemClick={toggleDrawer} />
          </Drawer>

          {/* Main Content */}
          <main
            className={`md:ml-64 transition-spacing duration-200 ${
              isMobile ? "pt-16" : ""
            }`}
          >
            <div className="p-6 max-w-7xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm p-6">
                {children}
              </div>
            </div>
          </main>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
