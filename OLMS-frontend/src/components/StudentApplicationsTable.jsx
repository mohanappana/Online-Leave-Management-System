import React from 'react';
import PropTypes from 'prop-types';

const StudentApplicationsTable = ({ title, headers, applications, deleteApplication, isPending, loading }) => {
  return (
    <div className="mb-6">
      <h2 className={`text-2xl text-center font-bold my-5 ${isPending ? 'text-blue-600' : 'text-green-600'}`}>
        {title}
      </h2>
      {/* Added overflow-x-auto for horizontal scrolling on small screens */}
      <div className="overflow-x-auto px-4"> {/* Horizontal scrolling container */}
        <table className="min-w-full border border-gray-300">
          <thead className="bg-lightgray text-2xl">
            <tr>
              {/* Map headers to table columns */}
              {headers.map((header, index) => (
                <th key={index} className="px-3 py-2 border">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-tbody text-center text-xl p-3">
            {applications.map((application, index) => (
              <tr key={index} className="border-b border-gray-300">
                {/* Each td has a width of w-full on small screens to stack the content */}
                <td className="py-4 w-full md:w-auto">{application.leaveId}</td> {/* Added w-full on small screens */}
                <td className="py-4 w-full md:w-auto">{application.fromDate}</td> {/* Added w-full on small screens */}
                <td className="py-4 w-full md:w-auto">{application.toDate}</td> {/* Added w-full on small screens */}
                <td className="py-4 w-full md:w-auto">{application.leaveReason}</td> {/* Added w-full on small screens */}
                <td className="py-4 w-full md:w-auto">
                  <button
                    disabled={loading || (!isPending && application.leaveStatus === 'Rejected')}
                    className={`px-3 py-2 rounded text-white ${
                      loading ? 'bg-gray-400' :
                      application.leaveStatus === 'Rejected' ? 'bg-red-300' : 'bg-red-600'
                    }`}
                    onClick={() => deleteApplication(application.leaveId)}
                  >
                    {loading ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
                <td className="py-4 w-full md:w-auto">
                  <button
                    className={`px-3 py-2 rounded text-white ${
                      application.leaveStatus === 'Pending' ? 'bg-blue-400' : application.leaveStatus === 'Approved' ? 'bg-green-500' : 'bg-red-600'
                    }`}
                    disabled
                  >
                    {application.leaveStatus}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};



export default StudentApplicationsTable;
