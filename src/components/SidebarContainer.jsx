import { useState, useEffect } from "react";

const SidebarContainer = ({ open, onClose, sidebarContent, mainContent }) => {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    setOpened(open);
  }, [open]);

  const close = () => {
    setOpened(false);
    onClose();
  }

  return (
    <div className="sidebar-container">
      {opened && (
        <div className="sidebar-left">
          <button onClick={close}>X</button>
          {sidebarContent}
        </div>
      )}
      <div className="sidebar-right">
        {mainContent}
      </div>
    </div>
  );
};

export default SidebarContainer;
