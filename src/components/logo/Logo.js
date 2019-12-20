import React from 'react';
import PropTypes from 'prop-types';

const Logo = ({size}) => {
  const primaryColor = '#' + process.env.REACT_APP_PRIMARY_COLOR;
  const secondaryColor = '#' + process.env.REACT_APP_BACKGROUND_COLOR;

  return (<svg width={size} height={size} viewBox="0 0 142 142" version="1.1">
    <rect id="logo" x="0" y="0" width="141.6" height="141.84" style={{fill: "none"}} />
    <clipPath id="_clip1">
      <rect x="0" y="0" width="141.6" height="141.84" />
    </clipPath>
    <g clipPath="url(#_clip1)">
      <path
        d="M8.567,11.28l124.466,0l8.567,14.824l-62.114,105.888l-1.19,0l-16.182,0l-62.114,-105.888l8.567,-14.824Z"
        style={{fill: primaryColor, stroke: secondaryColor, strokeWidth:"0.15px"}}
      />
      <path d="M70.8,57.36l39.12,22.586" style={{fill: "none", stroke: secondaryColor, strokeWidth: "2px"}} />
      <path d="M31.68,79.946l39.12,-22.586" style={{fill: "none", stroke: secondaryColor, strokeWidth: "1.97px", strokeLineJoin: "bevel"}} />
      <path d="M70.8,11.28l0,46.08" style={{fill: "none", stroke: secondaryColor, strokeWidth: "2px"}} />
    </g>
  </svg>);
};

Logo.propTypes = {
  size: PropTypes.string.isRequired
};

export default Logo;