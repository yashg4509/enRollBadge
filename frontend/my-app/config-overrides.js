const path = require('path');

module.exports = function override(config) {
  // Add resolve fallback configuration
  config.resolve.fallback = {
    fs: false,
    path: false,
  };

  // Return the modified configuration
  return config;
};
