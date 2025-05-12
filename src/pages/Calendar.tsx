import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

const doctors = ['Dr. John Doe', 'Dr. Jane Smith', 'Dr. Robert Brown'];

const services: Record<string, string[]> = {
  'Dịch vụ làm đẹp': ['Cắt tỉa lông', 'Nhuộm lông', 'Làm đẹp tổng quát'],
  'Dịch vụ khám bệnh': ['Tiêm phòng', 'Khám tổng quát'],
};

interface Appointment {
  title: string;
  notes: string;
  name: string;
  phone_number: string;
  email: string;
  date: string;
  start_time: string;
  end_time: string;
  doctor: string;
  services: string[];
  description: string;
  start: string;
  end: string;
}

const CalendarApp = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [newAppointment, setNewAppointment] = useState<Appointment>({
    title: '',
    notes: '',
    name: '',
    phone_number: '',
    email: '',
    date: '',
    start_time: '',
    end_time: '',
    doctor: '',
    services: [],
    description: '',
    start: '',
    end: ''
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Tạo newAppointment từ form input
    const newApp = {
      ...newAppointment,
      start: newAppointment.date + 'T' + newAppointment.start_time, // Chuyển thành định dạng ISO 8601
      end: newAppointment.date + 'T' + newAppointment.end_time, // Chuyển thành định dạng ISO 8601
    };

    // Thêm lịch hẹn vào state appointments
    setAppointments((prevAppointments) => {
      const updatedAppointments = [...prevAppointments, newApp];
      console.log('Updated Appointments:', updatedAppointments); // Kiểm tra dữ liệu
      return updatedAppointments;
    });

    // Đóng form
    setShowForm(false);
  };

  const handleDateClick = (info: any) => {
    // Mở form khi click vào ngày
    setNewAppointment((prev) => ({
      ...prev,
      date: info.dateStr,
      start: info.dateStr,
      end: info.dateStr,
    }));
    setShowForm(true);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}  // Thêm timeGridPlugin
      initialView="timeGridWeek"  // Chế độ xem theo tuần và giờ
      events={appointments.map((appointment) => ({
        title: `${appointment.title} - ${appointment.doctor}`, // Hiển thị tiêu đề và bác sĩ
        start: appointment.start,
        end: appointment.end,
        extendedProps: {
          services: appointment.services.join(', '), // Dịch vụ đã đăng ký
          phone: appointment.phone_number, // Số điện thoại
          email: appointment.email, // Email
          description: appointment.description, // Mô tả lịch hẹn
        }
      }))}
      dateClick={handleDateClick}  // Bắt sự kiện click vào ngày
    />

  );
};

export default CalendarApp;
