import { useState, useEffect } from "react";
import { FiChevronLeft } from "react-icons/fi";

const SidebarContainer = ({ open, onClose, sidebarContent, mainContent, about }) => {
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
          {!about && <div className="close" onClick={close}>
            <FiChevronLeft />
          </div>}
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
