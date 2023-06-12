import React from 'react';
import JSONData from './test.json';

function JSONDataDisplay() {
  const handleSubscribe = (className) => {
    console.log(`Subscribed to class: ${className}`);
    // Perform any additional logic here, such as updating the subscribed classes state
  };

  const DisplayData = JSONData.map((info) => {
    return (
      <tr key={info.name}>
        <td>{info.name}</td>
        <td>
 <button  onClick={() => handleSubscribe(info.name)}>Subscribe</button>
        </td>
      </tr>
    );
  });

  return (
    <div>
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
  );
}

export default JSONDataDisplay;
