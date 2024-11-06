import { ANCHOR, Drawer as BaseDrawer } from 'baseui/drawer';
import { ReactNode } from 'react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const Drawer = ({ isOpen, onClose, children }: DrawerProps) => {
  return (
    <BaseDrawer
      isOpen={isOpen}
      autoFocus
      onClose={onClose}
      anchor={ANCHOR.bottom}
      overrides={{
        Root: {
          style: {
            'z-index': 100,
          },
        },
        DrawerContainer: {
          style: {
            height: '280px',
          },
        },
        DrawerBody: {
          style: {
            'max-width': '343px',
            margin: '32px auto',
          },
        },
        Close: {
          style: {
            display: 'none',
          },
        },
      }}
    >
      {children}
    </BaseDrawer>
  );
};

export default Drawer;
