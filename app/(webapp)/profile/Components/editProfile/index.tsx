import React from "react";

interface EditProfileProps {
  formData: {
    name: string;
    username: string;
    role: string;
    phone?: string;
    bio?: string;
    description?: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSave: () => void;
  onCancel: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({
  formData,
  onChange,
  onSave,
  onCancel,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={onChange}
        className="border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Name"
      />
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={onChange}
        className="border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Username"
      />
      <input
        type="text"
        name="role"
        value={formData.role}
        onChange={onChange}
        className="border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Role"
      />
      <input
        type="text"
        name="phone"
        value={formData.phone || ""}
        onChange={onChange}
        className="border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Phone"
      />
      <textarea
        name="bio"
        value={formData.bio || ""}
        onChange={onChange}
        className="border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Bio"
      />
      <textarea
        name="description"
        value={formData.description || ""}
        onChange={onChange}
        className="border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Description"
      />
      <div className="flex gap-4">
        <button
          onClick={onSave}
          className="bg-primary-600 text-white p-3 rounded-lg hover:bg-primary-700 transition duration-200"
        >
          Update
        </button>
        <button
          onClick={onCancel}
          className="bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
