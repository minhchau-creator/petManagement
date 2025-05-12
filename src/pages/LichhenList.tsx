import React, { useEffect, useState } from 'react';
import AppointmentForm from '../components/AppointmentForm';
import ResidenceRegistrationForm from '../components/ResidenceRegistrationForm';
import AppointmentTable from '../components/AppointmentTable';

const LichHenList: React.FC = () => {
  const [appointments, setAppointments] = useState<{
    name: string;
    date: string;
    start_time: string;
    end_time: string;
    phone_number: string;
    email: string;
    doctor: string;
    services: string[];
    description: string;
  }[]>([]);

  const [showForm, setShowForm] = useState(false); // State để hiển thị form lịch hẹn
  const [showRegistrationForm, setShowRegistrationForm] = useState(false); // State để hiển thị form đăng ký cư trú

  const [newAppointment, setNewAppointment] = useState<{
    name: string;
    date: string;
    start_time: string;
    end_time: string;
    phone_number: string;
    email: string;
    doctor: string;
    services: string[];
    description: string;
  }>({
    name: '',
    date: '',
    start_time: '',
    end_time: '',
    phone_number: '',
    email: '',
    doctor: '',
    services: [],
    description: '',
  });

  const [residenceRegistration, setResidenceRegistration] = useState<{
    full_name: string;
    phone_number: string;
    address: string;
    email: string;
    staffId: string;
    numPet: number;
    checkin_date: string;
    checkout_date: string;
    roomID: string;
    caution: string;
  }>({
    full_name: '',
    phone_number: '',
    address: '',
    email: '',
    staffId: '',
    numPet: 1,
    checkin_date: '',
    checkout_date: '',
    roomID: '',
    caution: '',
  });

  useEffect(() => {
    fetch('http://localhost:3001/api/appointments')
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((err) => console.error('Lỗi khi lấy dữ liệu:', err));
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      const { checked } = e.target;
      if (checked) {
        setNewAppointment((prev) => ({
          ...prev,
          services: [...prev.services, value],
        }));
      } else {
        setNewAppointment((prev) => ({
          ...prev,
          services: prev.services.filter((service) => service !== value),
        }));
      }
    } else {
      setNewAppointment((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleResidenceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResidenceRegistration((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const [start_time, end_time] = newAppointment.start_time.split('-').map((time) => time.trim());
    fetch('http://localhost:3001/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...newAppointment,
        start_time,
        end_time,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAppointments((prev) => [...prev, data]);
        setShowForm(false);
        setNewAppointment({
          name: '',
          date: '',
          start_time: '',
          end_time: '',
          phone_number: '',
          email: '',
          doctor: '',
          services: [],
          description: '',
        });
      })
      .catch((err) => console.error('Lỗi khi thêm lịch hẹn:', err));
  };

  const handleResidenceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Residence registration submitted:', residenceRegistration);
    setResidenceRegistration({
      full_name: '',
      phone_number: '',
      address: '',
      email: '',
      staffId: '',
      numPet: 1,
      checkin_date: '',
      checkout_date: '',
      roomID: '',
      caution: '',
    });
    setShowRegistrationForm(false);
  };

  // Hàm xử lý logic mở/đóng form
  const handleOpenAppointmentForm = () => {
    if (showRegistrationForm) {
      setShowRegistrationForm(false); // Đóng form "Đăng ký cư trú" nếu nó đang mở
    }
    setShowForm(!showForm); // Đóng form "Thêm lịch hẹn" nếu nó đang mở, ngược lại mở form "Thêm lịch hẹn"
  };

  const handleOpenResidenceForm = () => {
    if (showForm) {
      setShowForm(false); // Đóng form "Thêm lịch hẹn" nếu nó đang mở
    }
    setShowRegistrationForm(!showRegistrationForm); // Đóng form "Đăng ký cư trú" nếu nó đang mở, ngược lại mở form "Đăng ký cư trú"
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-black">Danh sách lịch hẹn</h2>
      
      {/* Button để mở form "Thêm lịch hẹn" */}
      <button
        className="bg-blue-500 text-white p-2 rounded mb-4"
        onClick={handleOpenAppointmentForm} // Gọi hàm mở/đóng form lịch hẹn
      >
        Thêm lịch hẹn
      </button>

      {/* Button để mở form "Đăng ký cư trú" */}
      <button
        className="bg-green-500 text-white p-2 rounded mb-4 ml-2"
        onClick={handleOpenResidenceForm} // Gọi hàm mở/đóng form đăng ký cư trú
      >
        Đăng ký cư trú
      </button>

      {/* Hiển thị form "Thêm lịch hẹn" */}
      {showForm && (
        <AppointmentForm
          handleSubmit={handleSubmit}
          handleFormChange={handleFormChange}
          newAppointment={newAppointment}
          setShowForm={setShowForm}
        />
      )}

      {/* Hiển thị form "Đăng ký cư trú" */}
      {showRegistrationForm && (
        <ResidenceRegistrationForm
          handleResidenceSubmit={handleResidenceSubmit}
          handleResidenceChange={handleResidenceChange}
          residenceRegistration={residenceRegistration}
          setShowRegistrationForm={setShowRegistrationForm}
        />
      )}

      <AppointmentTable data={appointments} />
    </div>
  );
};

export default LichHenList;
