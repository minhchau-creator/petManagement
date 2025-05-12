import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import LichHenList from './pages/LichhenList';
import LichHenCalendar from './pages/Calendar';
import ReportPage from './pages/ReportPage'; // Import page báo cáo


function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 bg-gray-50 min-h-screen">
          <Routes>
            <Route path="/lich-hen/danh-sach" element={<LichHenList />} />
            <Route path="/lich-hen/giao-dien" element={<LichHenCalendar appointments={[]} />} />
            <Route path="/bao-cao" element={<ReportPage  />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
