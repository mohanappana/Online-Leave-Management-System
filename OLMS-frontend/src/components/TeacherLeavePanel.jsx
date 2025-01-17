import React from 'react'
import ApplicationsTable from './ApplicationsTable'

const TeacherLeavePanel = () => {
    const headers = ['Leave ID','Student ID','From Date','To Date','Reason','Grant/Reject Leave'];
    const applicationDetails = [
        {
          id: 1,
          studentId:'N181061',
          fromDate: '2023-04-05',
          toDate: '2023-04-07',
          reason: 'To attend a marriage',
          status: 'Pending',    
        },
        {
          id: 2,
          studentId:'N180606',
          fromDate: '2023-05-01',
          toDate: '2023-05-03',
          reason: 'Medical emergency',
          status: 'Pending',
        },
      ];
  return (
    <div>
      <ApplicationsTable headers={headers} applicationDetails={applicationDetails} />
    </div>
  )
}

export default TeacherLeavePanel
