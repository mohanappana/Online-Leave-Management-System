// // // src/components/LoginModal.jsx
// // import React, { useState } from 'react';

// // function LoginModal() {
// //   const [showModal, setShowModal] = useState(false);

// //   const handleOpenModal = () => {
// //     setShowModal(true);
// //   };

// //   const handleCloseModal = () => {
// //     setShowModal(false);
// //   };

// //   return (
// //     <div>
// //       <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleOpenModal}>
// //         Login
// //       </button>

// //       {showModal ? (
// //         <div className="fixed inset-0 z-10 overflow-y-auto">
// //           <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
// //             <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

// //             <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

// //             <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
// //               <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
// //                 <div className="sm:flex sm:items-start">
// //                   <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
// //                     {/* Add your icon here */}
// //                   </div>
// //                   <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
// //                     <h3 className="text-lg leading-6 font-medium text-gray-900">Login to Your Account</h3>
// //                     <div className="mt-2">
// //                       <input
// //                         type="text"
// //                         placeholder="Email"
// //                         className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
// //                       />
// //                       <input
// //                         type="password"
// //                         placeholder="Password"
// //                         className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //               <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
// //                 <button
// //                   type="button"
// //                   className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
// //                   onClick={handleCloseModal}
// //                 >
// //                   Close
// //                 </button>
// //                 <button
// //                   type="button"
// //                   className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
// //                 >
// //                   Login
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       ) : null}
// //     </div>
// //   );
// // }

// // export default LoginModal;

// import React from 'react';

// const LoginModal = ({ show, onClose }) => {
//   if (!show) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white p-6 rounded shadow-md w-1/2">
//       <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" > &times; </button>
//         <h2 className="text-2xl font-semibold mb-4">Login</h2>
//         <form>
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2" htmlFor="username">Username</label>
//             <input className="w-full px-3 py-2 border rounded" type="text" id="username" name="username" />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
//             <input className="w-full px-3 py-2 border rounded" type="password" id="password" name="password" />
//           </div>
//           <div className="flex justify-between items-center">
//             <button type="button" className="text-red-500" onClick={onClose}>Cancel</button>
//             <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginModal;

import React, { useState } from "react";
import Modal from "react-modal";

// Bind Modal to your root element

const LoginModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Functions to open and close the modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const onSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
    alert("Login successful!");
    closeModal();
  };

  return (
    <div>
      {/* Button to trigger modal */}
      <button
        onClick={openModal}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Open Login Modal
      </button>

      {/* Modal Component */}
      <Modal
        isOpen={modalIsOpen} // Controls whether modal is open
        onRequestClose={closeModal} // Triggered when clicking outside or pressing ESC
        style={{
          content: {
            width: "400px",
            height: "auto",
            margin: "auto",
            padding: "20px",
            borderRadius: "12px",
            backgroundColor: "white",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-xl bg-gray-200 rounded-full px-2 hover:bg-red-400 hover:text-white"
        >
          &times;
        </button>

        {/* Modal Content */}
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={onSubmit}>
          <label className="block text-sm font-medium mb-2">User ID</label>
          <input
            type="text"
            placeholder="Enter your User ID"
            className="block w-full border px-3 py-2 mb-4 rounded-lg"
            required
          />

          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="block w-full border px-3 py-2 mb-4 rounded-lg"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 w-full py-2 text-white rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default LoginModal;
