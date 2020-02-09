// @ts-check
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Grid, Typography } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LaunchIcon from '@material-ui/icons/Launch';
import { buildLevel } from '../../utils/spells';
import { upperFirst } from '../../utils/common';
import { useHistory } from 'react-router-dom';
import { ISpell } from '../../models/ISpell';
import { isNull } from 'util';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
      fontSize: '1rem'
    },
    header: {
      fontSize: '0.7rem',
      color: theme.palette.text.secondary
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
  })
);

interface IProps {
  spell: ISpell,
  showSimple: boolean
};
export default ({ spell, showSimple = true }: IProps) => {
  const classes = useStyles();
  const history = useHistory();
  const nameParsed = upperFirst(spell.name.toLowerCase());
  const levelWithSchool = buildLevel(spell.level, spell.school, false);
  const componentsParsed = spell.components.map(components => upperFirst(components)).join(' • ');
  const classTypesParsed = spell.classTypes.map(clss => upperFirst(clss)).join(' • ');
  const materialsParsed = spell.materials ? upperFirst(spell.materials.toLowerCase(), true) + '.' : null;

  const handleOpen = () => {
    history.push('/spells/' + spell.id);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {/* Row */}

        {showSimple ? null : (
          <Grid className={classes.gridItem} item xs={12}>
            <Typography className={classes.title}>{nameParsed}</Typography>
          </Grid>
        )}

        {/* Row */}
        <Grid className={classes.gridItem} item xs={12}>
          <Typography className={classes.secondaryHeader}>{levelWithSchool}</Typography>
        </Grid>

        {/* Row */}
        <Grid className={classes.gridItem} item xs={6}>
          <Typography variant="h6" className={classes.header} noWrap>
            CASTING TIME
          </Typography>
          <Typography className={classes.content}>{spell.castingTime}</Typography>
        </Grid>
        <Grid className={classes.gridItem} item xs={6}>
          <Typography variant="h6" className={classes.header} noWrap>
            RANGE
          </Typography>
          <Typography className={classes.content}>{spell.range}</Typography>
        </Grid>

        {/* Row */}
        <Grid className={classes.gridItem} item xs={6}>
          <Typography variant="h6" className={classes.header} noWrap>
            COMPONENTS
          </Typography>
          <Typography className={classes.content}>{componentsParsed}</Typography>
        </Grid>
        <Grid className={classes.gridItem} item xs={6}>
          <Typography variant="h6" className={classes.header} noWrap>
            DURATION
          </Typography>
          <Typography className={classes.content}>{spell.duration}</Typography>
        </Grid>

        {/* Row */}
        {isNull(materialsParsed) ? null : (
          <Grid className={classes.gridItem} item xs={12}>
            <Typography className={classes.content}>{materialsParsed}</Typography>
          </Grid>
        )}

        {/* Row */}
        <Grid className={classes.gridItem} item xs={12}>
          <Typography className={classes.secondaryContent}>{classTypesParsed}</Typography>
        </Grid>

        {/* Row */}
        {showSimple ? null : (
          <Grid className={classes.gridItem} item xs={12}>
            <Button color="primary" startIcon={<PersonAddIcon />}>
              Character
            </Button>
            <Button color="primary" startIcon={<LaunchIcon />} onClick={() => handleOpen()}>
              Open
            </Button>
          </Grid>
        )}
      </Grid>
    </div>
  );
};
