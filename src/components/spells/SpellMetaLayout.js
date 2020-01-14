// @ts-check
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LaunchIcon from '@material-ui/icons/Launch';
import { buildLevel } from '../../utils/spells';
import { upperFirst } from '../../utils/common';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    maxWidth: '210px'
  },
  gridItem: {
    border: '0.5px solid ' + theme.palette.primary.dark
  },
  title: {
    fontSize: '1rem',
  },
  header: {
    fontSize: '0.7rem',
    color: theme.palette.text.secondary,
  },
  secondaryHeader: {
    fontStyle: 'italic',
    fontSize: '0.85rem',
    color: '#' + process.env.REACT_APP_ACCENT_COLOR
  },
  content: {
    fontSize: '1rem'
  },
  secondaryContent: {
    fontStyle: 'italic',
    fontSize: '0.85rem'
  },
  button: {
    color: '#' + process.env.REACT_APP_ACCENT_COLOR
  }
}));

/**
 * @typedef {object} props - A spell.
 * @prop {number} id
 * @prop {string} name
 * @prop {string[]} classTypes
 * @prop {string[]} components
 * @prop {string} school
 * @prop {number} level
 * @prop {string} castingTime
 * @prop {string} range
 * @prop {string[]} materials
 * @prop {string} duration
 */
/** @type {props} */
export default props => {
  // @ts-ignore
  const classes = useStyles();
  const levelWithSchool = buildLevel(props.level, props.school, false);
  const components = props.components.map(component => upperFirst(component)).join(' • ');
  const classTypes = props.classTypes.map(clss => upperFirst(clss)).join(' • ');
  const castingTime = props.castingTime;
  const range = props.range;
  const duration = props.duration;

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {/* Row */}
        <Grid className={classes.gridItem} item xs={12}>
          <Typography className={classes.title}>{props.name}</Typography>
        </Grid>

        {/* Row */}
        <Grid className={classes.gridItem} item xs={12}>
          <Typography className={classes.secondaryHeader}>{levelWithSchool}</Typography>
        </Grid>

        {/* Row */}
        <Grid className={classes.gridItem} item xs={6}>
          <Typography variant="h6" className={classes.header} noWrap>CASTING TIME</Typography>
          <Typography className={classes.content}>{castingTime}</Typography>
        </Grid>
        <Grid className={classes.gridItem} item xs={6}>
          <Typography variant="h6" className={classes.header} noWrap>RANGE</Typography>
          <Typography className={classes.content}>{range}</Typography>
        </Grid>

        {/* Row */}
        <Grid className={classes.gridItem} item xs={6}>
          <Typography variant="h6" className={classes.header} noWrap>COMPONENTS</Typography>
          <Typography className={classes.content}>{components}</Typography>
        </Grid>
        <Grid className={classes.gridItem} item xs={6}>
          <Typography variant="h6" className={classes.header} noWrap>DURATION</Typography>
          <Typography className={classes.content}>{duration}</Typography>
        </Grid>

        {/* Row */}
        <Grid className={classes.gridItem} item xs={12}>
          <Typography className={classes.secondaryContent}>{classTypes}</Typography>
        </Grid>

        {/* Row */}
        <Grid className={classes.gridItem} item xs={12}>
          <Button color="primary" startIcon={<PersonAddIcon />}>Character</Button>
          <Button color="primary" startIcon={<LaunchIcon />}>Open</Button>
        </Grid>
      </Grid>
    </div>
  );
};
