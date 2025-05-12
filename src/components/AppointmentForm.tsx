import React from 'react';
import { useState as reactUseState } from 'react';

const doctors = ['Dr. John Doe', 'Dr. Jane Smith', 'Dr. Robert Brown'];

const services: Record<string, string[]> = {
  'Dịch vụ làm đẹp': ['Cắt tỉa lông', 'Nhuộm lông', 'Làm đẹp tổng quát'],
  'Dịch vụ khám bệnh': ['Tiêm phòng', 'Khám tổng quát'],
};

// const [successMessage, setSuccessMessage] = useState(''); // State để lưu thông báo thành công

interface AppointmentFormProps {
  handleSubmit: (e: React.FormEvent) => void;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  newAppointment: any;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ handleSubmit, handleFormChange, newAppointment, setShowForm }) => {

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timeRange = e.target.value.split('-');
    const start_time = timeRange[0]?.trim() || '';
    const end_time = timeRange[1]?.trim() || '';
    handleFormChange({
      target: {
        name: 'start_time',
        value: start_time,
      }
    } as React.ChangeEvent<HTMLInputElement>);
    handleFormChange({
      target: {
        name: 'end_time',
        value: end_time,
      }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6 border border-gray-300">
      <div className="mb-4 flex gap-4">
        <div className="w-1/2">
          <label className="block text-lg font-medium text-gray-700">Họ tên</label>
          <input
            type="text"
            name="name"
            value={newAppointment.name}
            onChange={handleFormChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            required
          />
        </div>
        <div className="w-1/2">
          <label className="block text-lg font-medium text-gray-700">Số điện thoại</label>
          <input
            type="text"
            name="phone_number"
            value={newAppointment.phone_number}
            onChange={handleFormChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={newAppointment.email}
          onChange={handleFormChange}
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          required
        />
        <p className="text-sm text-gray-500">Vui lòng nhập email để nhận thông báo xác nhận.</p>
      </div>

      <div className="mb-4 flex gap-4">
        <div className="w-1/3">
          <label className="block text-lg font-medium text-gray-700">Ngày hẹn</label>
          <input
            type="date"
            name="date"
            value={newAppointment.date}
            onChange={handleFormChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            required
          />
        </div>
        <div className="w-1/3">
          <label className="block text-lg font-medium text-gray-700">Khung giờ</label>
          <input
            type="text"
            name="time_range"
            value={`${newAppointment.start_time} - ${newAppointment.end_time}`}
            onChange={handleTimeChange}
            placeholder="Giờ bắt đầu - Giờ kết thúc (VD: 09:00 - 10:00)"
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            required
          />
        </div>
        <div className="w-1/3">
          <label className="block text-lg font-medium text-gray-700">Bác sĩ</label>
          <select
            name="doctor"
            value={newAppointment.doctor}
            onChange={handleFormChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            required
          >
            <option value="">Chọn bác sĩ</option>
            {doctors.map((doctor, index) => (
              <option key={index} value={doctor}>{doctor}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium text-black">Dịch vụ</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Dịch vụ làm đẹp */}
          <div className="p-4 border border-gray-300 rounded-lg shadow-sm">
            <h4 className="font-semibold text-lg text-black text-center">Dịch vụ làm đẹp</h4>
            {services['Dịch vụ làm đẹp'].map((service, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="services"
                  value={service}
                  checked={newAppointment.services.includes(service)}
                  onChange={handleFormChange}
                  className="h-4 w-4 border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                <label className="text-gray-800">{service}</label>
              </div>
            ))}
          </div>

          {/* Dịch vụ khám bệnh */}
          <div className="p-4 border border-gray-300 rounded-lg shadow-sm">
            <h4 className="font-semibold text-lg text-black text-center">Dịch vụ khám bệnh</h4>
            {services['Dịch vụ khám bệnh'].map((service, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="services"
                  value={service}
                  checked={newAppointment.services.includes(service)}
                  onChange={handleFormChange}
                  className="h-4 w-4 border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                <label className="text-gray-800">{service}</label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700">Mô tả</label>
        <textarea
          name="description"
          value={newAppointment.description}
          onChange={handleFormChange}
          placeholder="Mô tả thêm về lịch hẹn"
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          required
        />
        <p className="text-sm text-gray-500">Cung cấp thêm thông tin nếu có yêu cầu đặc biệt.</p>
      </div>

      <div className="flex justify-end space-x-4">
        <button type="submit"  className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition duration-200">Thêm</button>
        <button type="button" onClick={() => setShowForm(false)} className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition duration-200">Hủy</button>
      </div> 
    </form>
  );
};


export default AppointmentForm;
// Removed duplicate useState function declaration

