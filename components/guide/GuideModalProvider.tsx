"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import GuideModal from "./GuideModal";

type GuideModalContextValue = {
  isOpen: boolean;
  openGuideModal: () => void;
  closeGuideModal: () => void;
};

const GuideModalContext = createContext<GuideModalContextValue | null>(null);

export function GuideModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openGuideModal = useCallback(() => setIsOpen(true), []);
  const closeGuideModal = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, openGuideModal, closeGuideModal }),
    [isOpen, openGuideModal, closeGuideModal]
  );

  return (
    <GuideModalContext.Provider value={value}>
      {children}
      <GuideModal isOpen={isOpen} onClose={closeGuideModal} />
    </GuideModalContext.Provider>
  );
}

export function useGuideModal() {
  const context = useContext(GuideModalContext);
  if (!context) {
    throw new Error("useGuideModal must be used within GuideModalProvider");
  }
  return context;
}
