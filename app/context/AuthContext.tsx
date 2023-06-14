"use client";

import { SessionProvider } from "next-auth/react";

interface AuthContextprops {
  children: React.ReactNode;
}

const AuthContext = ({ children }: AuthContextprops) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthContext;
