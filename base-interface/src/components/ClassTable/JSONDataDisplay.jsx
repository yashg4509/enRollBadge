import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JSONData from './test.json';

function JSONDataDisplay() {
  const [searchTerm, setSearchTerm] = useState('');
  const [subscribedClasses, setSubscribedClasses] = useState([]);

  const handleSubscribe = (className) => {
    if (subscribedClasses.includes(className)) {
      toast.success(`Already subscribed to class: ${className}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
      return;
    }


    toast.success(`Subscribed to class: ${className}`, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
    });

    // Perform any additional logic here, such as updating the subscribed classes state
    setSubscribedClasses([...subscribedClasses, className]);
  };

  const handleUnsubscribe = (className) => {
    const updatedSubscribedClasses = subscribedClasses.filter((c) => c !== className);
    setSubscribedClasses(updatedSubscribedClasses);
    toast.error(`Unsubscribed from class: ${className}`, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
    });
  };

  const filteredData = JSONData.filter((info) =>
    info.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const DisplayData = filteredData.map((info) => {
    const isSubscribed = subscribedClasses.includes(info.name);

    return (
      <tr key={info.name}>
        <td>{info.name}</td>
        <td>
          {isSubscribed ? (
            <button className="btn btn-danger" onClick={() => handleUnsubscribe(info.name)}>
              Unsubscribe
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => handleSubscribe(info.name)}>
              Subscribe
            </button>
          )}
        </td>
      </tr>
    );
  });

  return (
    <div className="container text-center">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control my-4"
      />
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Class Name</th>
              <th>Subscribe/Unsubscribe</th>
            </tr>
          </thead>
          <tbody>{DisplayData}</tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
}

export default JSONDataDisplay;


// import React, { useState } from 'react';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import JSONData from './test.json';

// function JSONDataDisplay() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [subscribedClasses, setSubscribedClasses] = useState([]);

//   const handleSubscribe = (className) => {
//     if (subscribedClasses.includes(className)) {
//       toast.success('Already subscribed to this class', {
//         position: toast.POSITION.BOTTOM_RIGHT,
//         autoClose: 2000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: false,
//         draggable: false,
//       });
//       return;
//     } 

//     toast.success(`Subscribed to class: ${className}`, {
//         position: toast.POSITION.BOTTOM_RIGHT,
//         autoClose: 2000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: false,
//         draggable: false,
//       });
  

//     // Perform any additional logic here, such as updating the subscribed classes state
//     setSubscribedClasses([...subscribedClasses, className]);
//   };

//   const filteredData = JSONData.filter((info) =>
//     info.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const DisplayData = filteredData.map((info) => {
//     return (
//       <tr key={info.name}>
//         <td>{info.name}</td>
//         <td>
//           <button className="btn btn-primary" onClick={() => handleSubscribe(info.name)}>
//             Subscribe
//           </button>
//         </td>
//       </tr>
//     );
//   });

//   return (
//     <div className="container text-center">
//       <input
//         type="text"
//         placeholder="Search"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="form-control my-4"
//       />
//       <div className="table-responsive">
//         <table className="table table-striped">
//           <thead>
//             <tr>
//               <th>Class Name</th>
//               <th>Subscribe</th>
//             </tr>
//           </thead>
//           <tbody>{DisplayData}</tbody>
//         </table>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// }

// export default JSONDataDisplay;
