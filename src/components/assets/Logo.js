import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const Logo = ({ size, color, animate = false, duration = 6 }) => {
  const useStyles = makeStyles(() => ({
    pulse: {
      animation: '$pulse ' + duration + 's infinite'
    },
    section: {
      '&:hover': {
        fill: '#FFF',
        transition: '3s'
      }
    },
    sectionOne: {
      fill: color,
      animationDelay: '0s'
    },
    sectionTwo: {
      fill: color,
      animationDelay: duration * 0.33 + 's'
    },
    sectionThree: {
      fill: color,
      animationDelay: duration * 0.66 + 's'
    },
    '@keyframes pulse': {
      '0%': {
        fill: color
      },
      '33%': {
        fill: '#FFF'
      },
      '66%, 100%': {
        fill: color
      }
    }
  }));

  const classes = useStyles();
  const animateClass = animate ? classes.pulse : '';

  return (
    <svg width={size} height={size} viewBox="0 0 297 258" version="1.1">
      <rect id="Logo" x="0" y="0" width="296.904" height="257.661" style={{ fill: 'none' }} />
      <g id="Group">
        <path
          d="M0.544,23.559l13.132,-22.744l-13.132,22.744l65.105,112.858l78.385,-45.135l-0.172,-90.467l-130.186,0"
          className={`${animateClass} ${classes.section} ${classes.sectionOne}`}
        />
        <path
          d="M296.105,23.559l-13.132,-22.744l13.132,22.744l-65.105,112.858l-78.384,-45.135l0.171,-90.467l130.186,0"
          className={`${animateClass} ${classes.section} ${classes.sectionTwo}`}
        />
        <path
          d="M161.41,256.941l-26.263,0l26.263,0l65.185,-112.811l-78.28,-45.316l-78.261,45.383l65.093,112.744"
          className={`${animateClass} ${classes.section} ${classes.sectionThree}`}
        />
      </g>
    </svg>
  );
};

Logo.propTypes = {
  size: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  animate: PropTypes.bool,
  duration: PropTypes.number
};

export default Logo;
