import React, { useState } from 'react'

const Date = ({prepositon}) => {
    const [selectedDate, setSelectedDate] = useState('');

    return (
      <div className='ml-5'>
        <label htmlFor="date" className='font-bold block'>{prepositon}:</label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className='bg-yellow-100 p-2 border-b rounded-lg outline-blue-300'
        />
      </div>
    )
}

export default Date
