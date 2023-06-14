import React, { useState} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JSONData from './unique_classes.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useUserAuth } from '../../context/UserAuthContext';
import { filter } from 'lodash';
import axios from 'axios';

// import sgMail from '@sendgrid/mail';
import { useNavigate } from 'react-router-dom';

const apiLink = "161.35.126.134:8000";

function JSONDataDisplay() {
  const [searchTerm, setSearchTerm] = useState('');
  const [subscribedClasses, setSubscribedClasses] = useState([]);
  const [showSubscriptions, setShowSubscriptions] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  
  const { logOut, user } = useUserAuth();

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      setSubscribedClasses([]); // Clear subscribed classes when user logs out
    }
  }, [user]);

  React.useEffect(() => {
    if(user){
      console.log(user.email);
      callAPI(user.email);
    }
    //call API here
    //get the response from the API and call setSubscribedClasses with data.subscribed
  }, [user])


  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);
  
  async function callAPI(email) {
    try {
      const response = await fetch(`http://${apiLink}/getclasses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      if (!response.ok) {
        throw new Error("API call failed");
      }
  
      const data = await response.json();
      console.log("API response:", data);
      setSubscribedClasses(data.subscribed);
    } catch (error) {
      console.error("An error occurred during the API call:", error);
    }
  }
  


  const handleSubscribe = (className) => {

    if (!user) {
      navigate('/login'); // Redirect to the login page
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

    // const emailContent = `Subscribed to class: ${className}`;
    // const msg = {
    //   to: user.email,
    //   from: 'ysgupta@wisc.edu',
    //   subject: 'Subscription Confirmation',
    //   text: emailContent,
    // };
    // sgMail.send(msg)
    //   .then(() => console.log('Email sent'))
    //   .catch((error) => console.error(error));

    const updatedSubscribedClasses = [...subscribedClasses, className];
    setSubscribedClasses(updatedSubscribedClasses);

    const userData = {
      email: user.email,
      classes: updatedSubscribedClasses,
    };

    console.log('User Data:', userData);

  
    axios.post(`http://${apiLink}/signup`, userData)
      .then(response => {
        console.log('Subscription request sent successfully!');
        // Handle any success response if needed
      })
      .catch(error => {
        console.error('Error sending subscription request:', error);
        // Handle any error if needed
      });

  };

  const handleUnsubscribe = (className) => {

    if (!user) {
      navigate('/login'); // Redirect to the login page
      return;
    }
    
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

    const userData = {
      email: user.email,
      classes: updatedSubscribedClasses,
    };

    console.log('User Data:', userData);

  
    axios.post(`http://${apiLink}/signup`, userData)
      .then(response => {
        console.log('Subscription request sent successfully!');
        // Handle any success response if needed
      })
      .catch(error => {
        console.error('Error sending subscription request:', error);
        // Handle any error if needed
      });
  };

  const handleToggleSubscriptions = () => {
    setShowSubscriptions(!showSubscriptions);
  };

  const filteredData = filter(JSONData, (info) =>
  info.name.toLowerCase().includes(searchTerm.toLowerCase())
);
  const initialTableData = filteredData.filter((info) => !subscribedClasses.includes(info.name));

  const totalItems = initialTableData.length;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = initialTableData.slice(startIndex, endIndex);

  const subscribedTableData = filter(JSONData, (info) => subscribedClasses.includes(info.name));

  const DisplayData = itemsToDisplay.map((info) => {
    return (
      <tr key={info.name}>
        <td>{info.name}</td>
        <td>
          <button className="btn btn-success" onClick={() => handleSubscribe(info.name)}>
            Subscribe
          </button>
        </td>
      </tr>
    );
  });

  const SubscriptionsData = subscribedTableData.map((info) => {
    return (
      <tr key={info.name}>
        <td>{info.name}</td>
        <td>
          <button className="btn btn-danger" onClick={() => handleUnsubscribe(info.name)}>
            Unsubscribe
          </button>
        </td>
      </tr>
    );
  });

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleGoToPage = (event) => {
    const page = parseInt(event.target.value, 10);
    if (page && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };


  return (
    < div className="container text-center">
    <input
      type="text"
      placeholder="Search"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="form-control my-4"
      style={{ width: '400px', margin: '0 auto' }}
    />
  
  

      <div className="mb-4 d-flex align-items-center">
        <h2 className="my-0">My Subscriptions</h2>
        <button
          className="btn btn-link ml-2"
          onClick={handleToggleSubscriptions}
          aria-expanded={showSubscriptions}
        >
          <FontAwesomeIcon icon={showSubscriptions ? faChevronDown : faChevronRight} />
        </button>
      </div>

      {showSubscriptions && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Class Name</th>
                <th>Unsubscribe</th>
              </tr>
            </thead>
            <tbody>{SubscriptionsData}</tbody>
          </table>
        </div>
      )}

      <h2 className="my-3">List of Classes</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Class Name</th>
              <th>Subscribe</th>
            </tr>
          </thead>
          <tbody>{DisplayData}</tbody>
        </table>
      </div>

  
      <div className="pagination mt-4 d-flex justify-content-center align-items-center" style={{ paddingBottom: "20px" }}>
  <button
    disabled={currentPage === 1}
    onClick={() => handlePageChange(currentPage - 1)}
    className="btn btn-primary mr-2"
  >
    Previous
  </button>
  <span className="mx-2">
    Page {currentPage} of {totalPages}
  </span>
  <button
    disabled={currentPage === totalPages}
    onClick={() => handlePageChange(currentPage + 1)}
    className="btn btn-primary ml-2"
  >
    Next
  </button>
</div>


      {/* <div className="mt-3">
        <span>Go to page:</span>
        <input
          type="number"
          min="1"
          max={totalPages}
          value={currentPage}
          onChange={handleGoToPage}
          className="form-control d-inline-block ml-2"
          style={{ width: '80px' }}
        />
      </div> */}


      <ToastContainer />
    </div>
  );
}

export default JSONDataDisplay;


