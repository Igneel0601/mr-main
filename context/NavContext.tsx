"use client"

import React, { createContext, useContext, useState } from "react";

type NavContextType = {
  navHidden: boolean;
  setNavHidden: (v: boolean) => void;
  navHeight: number;
  setNavHeight: (h: number) => void;
};

const NavContext = createContext<NavContextType | undefined>(undefined);

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [navHidden, setNavHidden] = useState(false);
  const [navHeight, setNavHeight] = useState(80); // default height

  return (
    <NavContext.Provider value={{ navHidden, setNavHidden, navHeight, setNavHeight }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNavContext() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useNavContext must be used within a NavProvider");
  return ctx;
}

export default NavContext;
