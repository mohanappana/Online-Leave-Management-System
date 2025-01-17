import React, { useState } from 'react';
import PropTypes from 'prop-types';

import google from '../assets/hodpage/google-docs.png';

const ApplicationsTable = ({headers = [], applicationDetails = [] }) => {
  const [applications, setApplications] = useState(applicationDetails);


  const deleteApplication = (id) => {
    setApplications(applications.filter((app) => app.id !== id));
  };

  const toggleStatus = (id) => {
    setApplications(
      applications.map((app) =>
        app.id === id
          ? { ...app, status: app.status === 'Pending' ? 'Approved' : 'Pending' }
          : app
      )
    );
  };


  return (
    <div>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-studentleft via-studentcenter to-studentright min-h-44 flex relative">
        <div className="absolute top-10 left-20 flex justify-center items-center">
          <img className="w-16 h-auto mt-6" src={google} alt="docs" />
        </div>
        <div className="absolute top-20 left-40 font-bold text-4xl">Applications</div>
      </div>

      <table className="table-auto w-full">
        <thead className="bg-lightgray text-2xl">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-3 py-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-tbody text-center text-xl p-3">
            {(Object.keys(applicationDetails[0]).length === 5) ?
          applications.map((app) => (
            <tr key={app.id}>
              <td>{app.id}</td>
              <td>{app.fromDate}</td>
              <td>{app.toDate}</td>
              <td>{app.reason}</td>
              <td>
                <button
                  className="bg-red-600 text-white px-3 py-2 rounded"
                  onClick={() => deleteApplication(app.id)}
                >
                  Delete
                </button>
              </td>
              <td>
                <button
                  className={`mb-2 px-3 py-2 space-y-2 rounded text-white ${
                    app.status === 'Pending' ? 'bg-blue-400' : 'bg-green-600'
                  }`}
                  onClick={() => toggleStatus(app.id)}
                >
                  {app.status}
                </button>
              </td>
            </tr>
          )):
            applications.map((app) =>(
                <tr key={app.id}>
                    <td>{app.id}</td>
                    <td>{app.studentId}</td>
                    <td>{app.fromDate}</td>
                    <td>{app.toDate}</td>
                    <td>{app.reason}</td>
                    <td className='flex justify-evenly  text-white mt-3'>
                        <button className='bg-green-500 py-2 px-5 rounded-md '>Grant</button>
                        <button className='bg-red-600 py-2 px-5 rounded-md '>Deny</button>
                    </td>
                   
                </tr>
            
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

ApplicationsTable.propTypes = {
    headers: PropTypes.array.isRequired,
    applicationDetails: PropTypes.array.isRequired,
  };
  
export default ApplicationsTable;
