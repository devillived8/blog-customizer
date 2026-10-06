import { useEffect, type RefObject } from 'react';

type UseSidebarCloseParams = {
  sidebarRef: RefObject<HTMLElement | null>;
  isSidebarOpen: boolean;
  onClose: () => void;
};

export const useSidebarClose = ({
  sidebarRef,
  isSidebarOpen,
  onClose,
}: UseSidebarCloseParams): void => {
  useEffect(() => {
    if (!isSidebarOpen) return;

    const handleClickOutside = (event: MouseEvent): void => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [sidebarRef, isSidebarOpen, onClose]);
};
