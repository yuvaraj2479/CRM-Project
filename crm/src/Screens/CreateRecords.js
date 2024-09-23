import React, { useState, useEffect } from "react";
import ResponsiveTable from "../Components/Tables/Tables";
import Navbar from "../Components/Layouts/NavBar";

const Records = () => {
 
  const columns = ['Name', 'Email', 'Role'];
  const data = [
    { Name: 'John Doe', Email: 'john@example.com', Role: 'Admin' },
    { Name: 'Jane Smith', Email: 'jane@example.com', Role: 'User' },
    { Name: 'Alice Johnson', Email: 'alice@example.com', Role: 'Editor' },
    // Add more data as needed
  ];


  const [formData, setFormData] = useState({
    fieldName: '',
    fieldValue: '',
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form Submitted:', formData);
   // Close the popup after submission

    setIsPopupOpen(false)
  };

  return (
    <div className="record-page">
      <Navbar/>
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Create Leads</h2>
            <form onSubmit={handleSubmit} >
              <div className="grid grid-cols-1 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                 Name
                </label>
                <input
                  type="text"
                  name="fieldName"
                  value={formData.fieldName}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                 Email
                </label>
                <input
                  type="text"
                  name="fieldValue"
                  value={formData.fieldValue}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="fieldValue"
                  value={formData.fieldValue}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Created Date
                </label>
                <input
                  type="text"
                  name="fieldValue"
                  value={formData.fieldValue}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 text-balck bg-gray-400 rounded-md px-4 hover:text-gray-700"
                  onClick={() => setIsPopupOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Create
                </button> 
              </div>
              </div>
            </form>
          </div>
        </div>
      )}
    
      <ResponsiveTable columns={columns} data={data} handleClick={() => setIsPopupOpen(!isPopupOpen)}/>
    </div>
  );
};

export default Records;
