import React from 'react';

interface Props {
  appointment: any;
}

const AppointmentRow: React.FC<Props> = ({ appointment }) => {
  return (
    <tr>
        <td className="border px-4 py-2">{appointment.time}</td>
        <td className="border px-4 py-2">{appointment.name}</td>
        <td className="border px-4 py-2">{appointment.birth_year}</td>
        <td className="border px-4 py-2">{appointment.phone}</td>
        <td className="border px-4 py-2">{appointment.doctor}</td>
        <td className="border px-4 py-2">{appointment.category}</td>
        <td className="border px-4 py-2">{appointment.status}</td>
        <td className="border px-4 py-2 space-x-2">
            <button className="bg-blue-500 text-white px-2 py-1 rounded">Sửa</button>
            <button className="bg-red-500 text-white px-2 py-1 rounded">Xoá</button>
        </td>
    </tr>
  );
};

export default AppointmentRow;