import Header from "@/components/layout/Header.jsx";
import React from "react";

function AppContainer() {
  return (
    <>
      <Header />
      <div className="min-h-screen grid gap-8 place-items-center font-mono bg-gray-900 mt-4">
        Home page
      </div>
    </>
  );
}

export default AppContainer;
