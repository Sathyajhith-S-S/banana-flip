import React, { createContext, useContext, useState, FC, ReactNode } from "react";

// Define the type for the context value
interface PageStateContextProps {
  currentPage: number;
  increasePage: () => void;
  decreasePage: () => void;
}

// Create a context to manage the current page number
const PageStateContext = createContext<PageStateContextProps | undefined>(
  undefined
);

// Define the props type for PageStateManager to include children
interface PageStateManagerProps {
  children: ReactNode; // ReactNode is a type that can represent any valid React node
}

const PageStateProvider: FC<PageStateManagerProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const increasePage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const decreasePage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <PageStateContext.Provider
      value={{ currentPage, increasePage, decreasePage }}
    >
      {children}
    </PageStateContext.Provider>
  );
};

const usePageState = (): PageStateContextProps => {
  const context = useContext(PageStateContext);
  if (!context) {
    throw new Error("usePageState must be used within a PageStateManager");
  }
  return context;
};

export { PageStateProvider, usePageState };
