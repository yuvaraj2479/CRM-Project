import React, { useState, useEffect } from "react";
import ResponsiveTable from "../Components/Tables/Tables";
import Navbar from "../Components/Layouts/NavBar";
import Utils from "../Components/Util/Utils";
import { useNavigate } from "react-router-dom";

const Records = () => {

  const columns = ['Name', 'Email', 'MobileNumber', 'LeadDate'];
  const [records, setRecords] = useState([]);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstname: '',
    email: '',
    mobilenumber: '',
  });

  const [errorvalues] = useState({
    firstname: '',
    email: '',
    mobilenumber: '',
    file: '',
  });

  const [errors, setErrors] = useState({});
  const [isSaveClick, setIsSaveClick] = useState(false);


  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('')

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  
  useEffect(() => {
    if (!currentUser) {
      navigate("/");  
    } else {
      const storedRecords = JSON.parse(sessionStorage.getItem(currentUser.createusername + '_records')) || [];
      setRecords(storedRecords);
    }
  }, []);

  const handleChange = (event) => {

    const { value, name, maxLength, } = event.target;
    let idRegex = /[^a-zA-Z ]+$/;



    switch (name) {
      case 'firstname':
        errorvalues.firstname = value;
        if (!idRegex.test(value)) {
          setFormData({ ...formData, [name]: value });
        }
        break;
      case 'email':
        errorvalues.email = value;
        setFormData({ ...formData, [name]: value });
        break;
      case 'mobilenumber':
        errorvalues.mobilenumber = value
        if (value.length <= Number(maxLength)) {
          setFormData({ ...formData, [name]: value });
        }
        break;
      default:
        setFormData({ ...formData, [name]: value });
        break;
    }
    if (isSaveClick) {
      setErrors(validation(errorvalues));
    }
  };

  const validation = () => {
    let errors = {};
    let emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (errorvalues.firstname === '') {
      errors.firstname = 'Name is required';
    }
    if (errorvalues.email === '') {
      errors.email = 'Email is required';
    } else if (!emailregex.test(errorvalues.email)) {
      errors.email = 'Email is invalid';
    }
    if (errorvalues.mobilenumber === '') {
      errors.mobilenumber = 'Mobile Number is required';
    }
    if (!errorvalues.file) {
      errors.file = 'File is required';
    }

    return errors;
  };



  const handleSubmit = (e) => {

  
    e.preventDefault()

    setIsSaveClick(true);
    var errorVal = validation(errorvalues);
    setErrors(errorVal);
    if (Object.keys(errorVal).length < 1) {

      let date = new Date()
      const newRecord = {
        Name: formData.firstname,
        Email: formData.email,
        MobileNumber: formData.mobilenumber,
        LeadDate: Utils.getDateFormat(date),
        file: file
      };

      const updatedRecords = [...records, newRecord];
      setRecords(updatedRecords);

     
      sessionStorage.setItem(currentUser.createusername + '_records', JSON.stringify(updatedRecords));
      setFormData({ ...formData, email: '', mobilenumber: '', firstname: '' })
      setIsPopupOpen(false)
    }

  };

  const hadlefileData = (e) => {
    const newWindow = window.open(' ', '_blank');
    newWindow.document.write(`
                  <html>
                    <body>
                      <iframe src="${e.file}" width="100%" height="100%"></iframe>
                    </body>
                  </html>
                `);
  }

  



  return (
    <div className="record-page">
      <Navbar />
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Create Leads</h2>
            <form onSubmit={handleSubmit} >
              <div className="grid grid-cols-1 gap-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={(e) => handleChange(e)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"

                  />

                  {errors.firstname && (
                    <span className=" text-red-500 text-tiny p-1">{errors.firstname}</span>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleChange(e)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"

                  />
                  {errors.email && (
                    <span className="text-red-500 text-tiny p-1">{errors.email}</span>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="mobilenumber"
                    value={formData.mobilenumber}
                    onChange={(e) => handleChange(e)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"

                    maxLength={10}
                    minLength={10}
                  />
                  {errors.mobilenumber && (
                    <span className="text-red-500 text-tiny p-1">{errors.mobilenumber}</span>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    File Upload <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    name="file"
                    value={formData.file}
                    accept="application/pdf"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    onChange={async (e) => {
                      const selectedFile = e.target.files[0];
                      setFileName(e.target.value)
                      errorvalues.file = e.target.value
                      if (isSaveClick) {
                        setErrors(validation(errorvalues));
                      }
                      if (selectedFile) {
                        const reader = new FileReader();
                        reader.readAsDataURL(selectedFile);
                        reader.onload = () => {

                          setFile(reader.result);

                        };
                      } else {
                        setFile(null);
                      }
                    }}

                  />
                  {errors.file && (
                    <span className="text-red-500 text-tiny p-1">{errors.file}</span>
                  )}
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="mr-2 text-balck bg-gray-400 rounded-md px-4 hover:text-gray-700"
                    onClick={() => {
                      setErrors({})
                      setIsPopupOpen(false)
                      setFormData({ ...formData, email: '', mobilenumber: '', firstname: '' })

                    }}
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

      <ResponsiveTable columns={columns} data={records} handleClick={() => setIsPopupOpen(!isPopupOpen)} handlefile={(e) => hadlefileData(e)}  setRecords={setRecords}/>
    </div>
  );
};

export default Records;
