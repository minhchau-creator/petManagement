// src/pages/DashboardPage.tsx
import React, { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Đăng ký các thành phần của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month'); // month, week, day
  
  // Dữ liệu giả cho các thông tin
  const data = {
    doctorsCount: 5,
    petsCount: {
      dogs: 50,
      cats: 30,
      birds: 15,
      rabbits: 8,
    },
    clientsCount: 100,
    servicesUsage: {
      'Khám tổng quát': { week: 30, month: 120, year: 1500 },
      'Tiêm phòng': { week: 20, month: 80, year: 1000 },
      'Làm đẹp': { week: 25, month: 100, year: 1200 },
      'Cắt tỉa': { week: 15, month: 60, year: 700 },
      'Nhuộm tóc': { week: 10, month: 40, year: 500 },
      'Cư trú': { week: 5, month: 20, year: 250 },
    },
    serviceRevenue: {
      'Khám tổng quát': { week: 1000, month: 4000, year: 48000 },
      'Tiêm phòng': { week: 800, month: 3200, year: 38000 },
      'Làm đẹp': { week: 1200, month: 4800, year: 57000 },
      'Cắt tỉa': { week: 600, month: 2400, year: 28000 },
      'Nhuộm tóc': { week: 500, month: 2000, year: 24000 },
      'Cư trú': { week: 300, month: 1200, year: 14000 },
    },
  };

  // Dữ liệu cho biểu đồ cột (sử dụng dịch vụ)
  const servicesUsageData = {
    labels: ['Khám tổng quát', 'Tiêm phòng', 'Làm đẹp', 'Cắt tỉa', 'Nhuộm tóc', 'Cư trú'],
    datasets: [
      {
        label: 'Sử dụng dịch vụ (Tuần)',
        data: Object.values(data.servicesUsage).map((service) => service.week),
        backgroundColor: 'rgba(76, 175, 80, 0.7)',
      },
      {
        label: 'Sử dụng dịch vụ (Tháng)',
        data: Object.values(data.servicesUsage).map((service) => service.month),
        backgroundColor: 'rgba(255, 152, 0, 0.7)',
      },
      {
        label: 'Sử dụng dịch vụ (Năm)',
        data: Object.values(data.servicesUsage).map((service) => service.year),
        backgroundColor: 'rgba(33, 150, 243, 0.7)',
      },
    ],
  };

  // Dữ liệu cho biểu đồ đường (doanh thu dịch vụ)
  const serviceRevenueData = {
    labels: ['Khám tổng quát', 'Tiêm phòng', 'Làm đẹp', 'Cắt tỉa', 'Nhuộm tóc', 'Cư trú'],
    datasets: [
      {
        label: 'Doanh thu dịch vụ (Tuần)',
        data: Object.values(data.serviceRevenue).map((service) => service.week),
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        borderWidth: 2,
        fill: true,
      },
      {
        label: 'Doanh thu dịch vụ (Tháng)',
        data: Object.values(data.serviceRevenue).map((service) => service.month),
        borderColor: '#FF9800',
        backgroundColor: 'rgba(255, 152, 0, 0.2)',
        borderWidth: 2,
        fill: true,
      },
      {
        label: 'Doanh thu dịch vụ (Năm)',
        data: Object.values(data.serviceRevenue).map((service) => service.year),
        borderColor: '#2196F3',
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const totalRevenue = Object.values(data.serviceRevenue).reduce((acc, service) => acc + service.year, 0);

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">Dashboard Overview</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-purple-500 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl text-black">Số lượng bác sĩ</h2>
          <p className="text-3xl font-bold">{data.doctorsCount}</p>
        </div>
        <div className="bg-orange-500 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl text-black">Số lượng pets</h2>
          <p className="text-2xl">Chó: {data.petsCount.dogs}</p>
          <p className="text-2xl">Mèo: {data.petsCount.cats}</p>
          <p className="text-2xl">Các thú cưng khác: {data.petsCount.birds + data.petsCount.rabbits}</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl text-black">Số lượng khách</h2>
          <p className="text-3xl font-bold">{data.clientsCount}</p>
        </div>
      </div>

      {/* Biểu đồ cột và Biểu đồ đường - Cùng một hàng */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Biểu đồ cột - Sử dụng dịch vụ */}
        <div className="p-6 bg-white rounded-lg shadow-lg chart-wrapper">
          <h2 className="text-2xl font-semibold mb-4 text-black">Sử dụng dịch vụ</h2>
          <Bar data={servicesUsageData} options={{ responsive: true }} />
        </div>

        {/* Biểu đồ đường - Doanh thu dịch vụ */}
        <div className="p-6 bg-white rounded-lg shadow-lg chart-wrapper">
          <h2 className="text-2xl font-semibold mb-4 text-black">Doanh thu dịch vụ</h2>
          <Line data={serviceRevenueData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Tổng doanh thu */}
      <div className="mb-8 p-6 bg-white text-black rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Tổng Doanh Thu</h2>
        <p className="text-4xl font-bold">{totalRevenue} VNĐ</p>
      </div>
    </div>
  );
};

export default DashboardPage;
