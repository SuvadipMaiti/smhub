import PropTypes from 'prop-types';
import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";



const PageSpinner = ({ color = '#07bc0c' }) => {
  return (
    <ClipLoader
        className='spinner-position'
        color={color}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
  );
};

PageSpinner.propTypes = {
  color: PropTypes.oneOf([
    '#6d4ee9',
    '#07bc0c'
  ]),
};

export default PageSpinner;
