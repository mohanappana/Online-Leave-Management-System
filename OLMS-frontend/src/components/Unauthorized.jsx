import React from 'react'
import { Link } from 'react-router-dom'

const Unauthorized = () => {
  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold text-red-500">Unauthorized Access</h1>
      <p>You do not have permission to view this page.</p>
      <Link to="/" className="text-blue-500 hover:underline">
        Go back to Home
      </Link>
    </div>
  )
}

export default Unauthorized
