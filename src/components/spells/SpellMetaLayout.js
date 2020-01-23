// @ts-check
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LaunchIcon from '@material-ui/icons/Launch';
import { buildLevel } from '../../utils/spells';
import { upperFirst, isNullEmptyOrUndefined } from '../../utils/common';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    maxWidth: '260px',
    minWidth: '260px'
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
 * @prop {boolean} [showSimple]
 */
/** @type {props} */
export default ( { id, name, classTypes, components, school, level, castingTime, range, materials, duration, showSimple = true} ) => {
  // @ts-ignore
  const classes = useStyles();
  const history = useHistory();
  const nameParsed = upperFirst(String(name).toLowerCase())
  const levelWithSchool = buildLevel(level, school, false);
  const componentsParsed = components.map(component => upperFirst(component)).join(' • ');
  const classTypesParsed = classTypes.map(clss => upperFirst(clss)).join(' • ');
  const materialsParsed = upperFirst(String(materials).toLowerCase(), true) + '.';


  const handleOpen = () => {
    console.log("clicked");
    history.push('/spells/' + id);
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {/* Row */}

      { showSimple ? null : <Grid className={classes.gridItem} item xs={12}>
          <Typography className={classes.title}>{nameParsed}</Typography>
        </Grid>}

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
          <Typography className={classes.content}>{componentsParsed}</Typography>
        </Grid>
        <Grid className={classes.gridItem} item xs={6}>
          <Typography variant="h6" className={classes.header} noWrap>DURATION</Typography>
          <Typography className={classes.content}>{duration}</Typography>
        </Grid>

        {/* Row */}
        { isNullEmptyOrUndefined(materials) ? null : <Grid className={classes.gridItem} item xs={12}>
          <Typography className={classes.content}>{materialsParsed}</Typography>
        </Grid>}

        {/* Row */}
        <Grid className={classes.gridItem} item xs={12}>
          <Typography className={classes.secondaryContent}>{classTypesParsed}</Typography>
        </Grid>

        {/* Row */}
        { showSimple ? null : <Grid className={classes.gridItem} item xs={12}>
          <Button color="primary" startIcon={<PersonAddIcon />}>Character</Button>
          <Button color="primary" startIcon={<LaunchIcon />} onClick={() => handleOpen()}>Open</Button>
        </Grid>}
      </Grid>
    </div>
  );
};
