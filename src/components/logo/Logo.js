import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const Logo = ({ size, fillColor, animate=false, duration=6 }) => {
  const useStyles = makeStyles(() => ({
    pulse: {
      opacity: 1,
      animation: '$pulse ' + duration + 's infinite'
    },
    sectionOne: {
      fill: fillColor,
      animationDelay: '0s'
    },
    sectionTwo: {
      fill: fillColor,
      animationDelay: (duration * 0.33) + 's'
    },
    sectionThree: {
      fill: fillColor,
      animationDelay: (duration * 0.66) + 's'
    },
    '@keyframes pulse': {
      '0%': {
        fill: fillColor
      },
      '33%': {
        fill: '#FFF'
      },
      '66%, 100%': {
        fill: fillColor
      }
    },
  }));

  const classes = useStyles();
  const pulseClass = animate ? classes.pulse : '';

  return (
    <svg width={size} height={size} viewBox="0 0 142 142" version="1.1">
      <rect id="logo" x="0" y="0" width="141" height="141" style={{ fill: 'none' }} />
      <g>
        <path d="M8.64,11.28l-8.64,14.88l31.2,53.04l38.64,-22.32l0,-45.6l-61.2,0Z" className={`${pulseClass} ${classes.sectionOne}`} />
        <path d="M132.96,11.28l8.64,14.88l-31.2,53.04l-38.64,-22.32l0,-45.6l61.2,0Z" className={`${pulseClass} ${classes.sectionTwo}`} />
        <path d="M32.16,80.88l38.64,-22.32l38.64,22.32l-30,51.112l-17.28,0l-30,-51.112Z" className={`${pulseClass} ${classes.sectionThree}`}
        />
      </g>
    </svg>
  );
};

Logo.propTypes = {
  size: PropTypes.string.isRequired,
  fillColor: PropTypes.string.isRequired,
  animate: PropTypes.bool,
  duration: PropTypes.number
};

export default Logo;
