import React, { ReactNode } from "react";
const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={"container px-4 py-5 lg:py-8 mx-auto xl:px-5 max-w-screen-xl"}
    >
      {children}
    </div>
  );
};

export default Container;
