import React from 'react';
import ApplicationsTable from './ApplicationsTable';

const StudentApplicationStatus = () => {
  const headers = ['Leave ID', 'From Date', 'To Date', 'Reason', 'Action', 'Status'];
  const applicationDetails = [
    {
      id: 1,
      fromDate: '2023-04-05',
      toDate: '2023-04-07',
      reason: 'To attend a marriage',
      status: 'Pending',
    },
    {
      id: 2,
      fromDate: '2023-05-01',
      toDate: '2023-05-03',
      reason: 'Medical hello',
      status: 'Pending',
    },
  ];

  return (
    <div>
      <ApplicationsTable headers={headers} applicationDetails={applicationDetails} />
    </div>
  );
};

export default StudentApplicationStatus;
