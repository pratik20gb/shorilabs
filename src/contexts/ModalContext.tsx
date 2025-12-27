import { createContext, useContext, useState, ReactNode, useRef } from "react";

interface ModalContextType {
  isModalOpen: boolean;
  openModal: (onClose?: () => void) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeCallbackRef = useRef<(() => void) | null>(null);

  const openModal = (onClose?: () => void) => {
    setIsModalOpen(true);
    closeCallbackRef.current = onClose || null;
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (closeCallbackRef.current) {
      closeCallbackRef.current();
      closeCallbackRef.current = null;
    }
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

