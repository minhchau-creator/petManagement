import React, { useState } from 'react';
import AppointmentRow from './AppointmentRow';
import AppointmentForm from './AppointmentForm'; // Import AppointmentForm

interface Props {
  data: any[];
}

const AppointmentTable: React.FC<Props> = ({ data }) => {
  const [appointments, setAppointments] = useState(data);

  const handleStatusChange = (index: number, status: string) => {
    const updatedAppointments = [...appointments];
    updatedAppointments[index].status = status; // Cập nhật trạng thái trong mảng
    setAppointments(updatedAppointments); // Cập nhật lại state
  };

  return (
    <table className="w-full table-auto border-collapse border border-gray-300 text-black">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-4 py-2">Khung giờ</th>
          <th className="border px-4 py-2">Ngày</th>
          <th className="border px-4 py-2">Tên khách hàng</th>
          <th className="border px-4 py-2">Điện thoại</th>
          <th className="border px-4 py-2">Email</th>
          <th className="border px-4 py-2">Bác sĩ</th>
          <th className="border px-4 py-2">Dịch vụ</th>
          <th className="border px-4 py-2">Mô tả</th>
          <th className="border px-4 py-2">Trạng thái</th>
          <th className="border px-4 py-2">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-blue-100 font-semibold">
          <td className="border px-4 py-2">08:00 - 09:00</td>
          <td className="border px-4 py-2">2025-05-08</td>
          <td className="border px-4 py-2">Nguyễn Văn A</td>
          <td className="border px-4 py-2">0123456789</td>
          <td className="border px-4 py-2">nguyenvana@example.com</td>
          <td className="border px-4 py-2">Dr. B</td>
          <td className="border px-4 py-2">Dịch vụ khám bệnh</td>
          <td className="border px-4 py-2"></td>
          <td className="border px-4 py-2">
            <select
              value="Xác nhận"
              className="border px-2 py-1 rounded"
            >
              <option value="Xác nhận">Xác nhận</option>
              <option value="Từ chối">Từ chối</option>
            </select>
          </td>
          <td className="border px-4 py-2">
            <button className="bg-blue-500 text-white px-2 py-1 rounded mr-1">Sửa</button>
            <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Xoá</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default AppointmentTable;
