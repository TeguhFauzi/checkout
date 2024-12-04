"use client";
import React from "react";
import "./globals.css";
import { PageProps } from "@/app/components";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <html>
    <body>
      <PageProps>{children}</PageProps>
    </body>
  </html>
);

export default Layout;
