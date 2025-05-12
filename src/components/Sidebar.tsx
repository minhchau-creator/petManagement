import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Sidebar: React.FC = () => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // State để điều khiển sidebar thu gọn

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed); // Đổi trạng thái thu gọn của sidebar
  };

  return (
    <div className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}> {/* Áp dụng class 'collapsed' nếu sidebar thu gọn */}
      <button
        onClick={toggleSidebar}
        className={`toggle-btn ${isSidebarCollapsed ? 'collapsed-btn' : ''}`} // Thêm class cho nút khi sidebar thu gọn
      >
        {isSidebarCollapsed ? '►' : '◄'} {/* Nút sẽ thay đổi từ "►" sang "◄" */}
      </button>

      <h2 className={`${isSidebarCollapsed ? 'collapsed-title' : ''}`}>Trung tâm thú y</h2>
      <ul className="space-y-2">
        {/* Mục có submenu */}
        <li>
          <button
            onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
            className="w-full text-left px-4 py-2 rounded hover:bg-[#a1dfff] hover:text-black transition"
          >
            Danh sách lịch hẹn
          </button>

          {isSubMenuOpen && (
            <ul className="ml-4 mt-2 space-y-1">
              <li>
                <Link
                  to="/lich-hen/danh-sach"
                  className="block px-4 py-1 rounded hover:bg-[#a1dfff] hover:text-black transition"
                >
                  Danh sách lịch hẹn
                </Link>
              </li>
              <li>
                <Link
                  to="/lich-hen/giao-dien"
                  className="block px-4 py-1 rounded hover:bg-[#a1dfff] hover:text-black transition"
                >
                  Giao diện Lịch
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Mục khác */}
        <li>
          <Link
            to="/bao-cao"
            className="block px-4 py-2 rounded hover:bg-[#a1dfff] hover:text-black transition"
          >
            Báo cáo & thống kê
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
