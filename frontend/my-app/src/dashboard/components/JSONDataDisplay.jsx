import React, { useState} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JSONData from './unique_classes.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useUserAuth } from '../../context/UserAuthContext';
import { filter } from 'lodash';

// import sgMail from '@sendgrid/mail';
import { useNavigate } from 'react-router-dom';


function JSONDataDisplay() {
  const [searchTerm, setSearchTerm] = useState('');
  const [subscribedClasses, setSubscribedClasses] = useState([]);
  const [showSubscriptions, setShowSubscriptions] = useState(true);

  const { logOut, user } = useUserAuth();

  const navigate = useNavigate();

  const handleSubscribe = (className) => {

    if (!user) {
      navigate('/login'); // Redirect to the login page
      return;
    }
  
  
    // if (subscribedClasses.includes(className)) {
    //   toast.success(`Already subscribed to class: ${className}`, {
    //     position: toast.POSITION.BOTTOM_RIGHT,
    //     autoClose: 2000,
    //     hideProgressBar: true,
    //     closeOnClick: true,
    //     pauseOnHover: false,
    //     draggable: false,
    //   });
    //   return;
    // }

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
  };

  const handleToggleSubscriptions = () => {
    setShowSubscriptions(!showSubscriptions);
  };

  const filteredData = filter(JSONData, (info) =>
  info.name.toLowerCase().includes(searchTerm.toLowerCase())
);
  const initialTableData = filteredData.filter((info) => !subscribedClasses.includes(info.name));

  const subscribedTableData = filteredData.filter((info) => subscribedClasses.includes(info.name));

  const DisplayData = initialTableData.map((info) => {
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
          <FontAwesomeIcon icon={showSubscriptions ? faChevronUp : faChevronDown} />
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

      <ToastContainer />
    </div>
  );
}

export default JSONDataDisplay;


