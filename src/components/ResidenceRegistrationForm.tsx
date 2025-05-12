import React from 'react';

interface ResidenceRegistrationFormProps {
  handleResidenceSubmit: (e: React.FormEvent) => void;
  handleResidenceChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  residenceRegistration: any;
  setShowRegistrationForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResidenceRegistrationForm: React.FC<ResidenceRegistrationFormProps> = ({ handleResidenceSubmit, handleResidenceChange, residenceRegistration, setShowRegistrationForm }) => {
  return (
    <div className="mb-4 p-4 border border-black rounded">
      <h3 className="text-xl font-semibold mb-4 text-black">Đăng ký cư trú</h3>
      <form onSubmit={handleResidenceSubmit}>
        <div className="mb-4">
          <label className="block text-black">Họ tên</label>
          <input
            type="text"
            name="full_name"
            value={residenceRegistration.full_name}
            onChange={handleResidenceChange}
            className="w-full p-2 border border-black rounded text-black"
            required
          />
        </div>
        {/* Các trường khác cho form đăng ký cư trú */}
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded mr-2"
        >
          Đăng ký
        </button>
        <button
          type="button"
          onClick={() => setShowRegistrationForm(false)}
          className="bg-red-500 text-white p-2 rounded"
        >
          Hủy
        </button>
      </form>
    </div>
  );
};

export default ResidenceRegistrationForm;
