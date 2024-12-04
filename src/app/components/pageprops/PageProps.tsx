import React from "react";
import { Nav, Sider } from "@/app/components";

export const PageProps: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <>
    <Nav />
    <div className="container">
      <Sider />
      <main className="main-content">{children}</main>
    </div>
  </>
);
