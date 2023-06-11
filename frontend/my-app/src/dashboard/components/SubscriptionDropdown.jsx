import React from 'react';

function SubscriptionDropdown({ subscriptions, onUnsubscribe }) {
  return (
    <div className="subscription-dropdown">
      <h2 className="subscription-title">My Subscriptions</h2>
      <ul className="subscription-list">
        {subscriptions.map((subscription) => (
          <li key={subscription.name} className="subscription-item">
            {subscription.name}
            <button className="unsubscribe-button" onClick={() => onUnsubscribe(subscription)}>
              Unsubscribe
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubscriptionDropdown;
