// @ts-check
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Grid, Typography, Menu, MenuItem, Fade, ListItemIcon } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LaunchIcon from '@material-ui/icons/Launch';
import { buildLevel } from '../../utils/spells';
import { upperFirst } from '../../utils/common';
import { useHistory } from 'react-router-dom';
import { ISpell } from '../../models/ISpell';
import { isNull } from 'util';
import { SPELLS_PATH } from '../routes/PathConsts';
import { useSelector } from 'react-redux';
import { IState } from '../../models/IState';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      textAlign: 'center',
      maxWidth: '260px',
      minWidth: '260px',
    },
    gridItem: {
      border: '0.5px solid ' + theme.palette.primary.dark,
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
      color: '#' + process.env.REACT_APP_ACCENT_COLOR,
    },
    content: {
      fontSize: '1rem',
    },
    secondaryContent: {
      fontStyle: 'italic',
      fontSize: '0.85rem',
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'space-around'
    },
    button: {
      color: '#' + process.env.REACT_APP_ACCENT_COLOR,
    },
  })
);

interface IProps {
  spell: ISpell;
  showSimple: boolean;
  handleSpellAdd: (characterId: number, spellId: number) => void;
  handleSpellRemove: (characterId: number, spellId: number) => void;
}
export default function SpellMetaLayout(props: IProps) {
  const classes = useStyles();
  const history = useHistory();
  const characters = useSelector((state: IState) => {
    return state.characters;
  });

  const nameParsed = upperFirst(props.spell.name.toLowerCase());
  const levelWithSchool = buildLevel(props.spell.level, props.spell.school, false);
  const componentsParsed = props.spell.components.map((components) => upperFirst(components)).join(' • ');
  const classTypesParsed = props.spell.classTypes.map((clss) => upperFirst(clss)).join(' • ');
  const materialsParsed = props.spell.materials ? upperFirst(props.spell.materials.toLowerCase(), true) + '.' : null;

  const handleOpen = () => {
    history.push(SPELLS_PATH + '/' + props.spell.id);
  };

  // Character popup menu.
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleSpellAdd = (characterId: number, spellId: number) => {
    handleMenuClose();
    props.handleSpellAdd(characterId, spellId);
  }

  const handleSpellRemove = (characterId: number, spellId: number) => {
    handleMenuClose();
    props.handleSpellRemove(characterId, spellId);
  }

  const characterList = characters.map((character) => {
    const index = character.spells?.findIndex(spell => spell.id === props.spell.id)
    if (index === -1) {
      return (
        <MenuItem key={character.id} onClick={() => {handleSpellAdd(character.id, props.spell.id);}}>
          <ListItemIcon><AddCircleOutlineIcon fontSize="small" /></ListItemIcon>
          {character.name}
        </MenuItem>)
    }

    return (
      <MenuItem key={character.id} onClick={() => {handleSpellRemove(character.id, props.spell.id);}}>
        <ListItemIcon><DeleteIcon fontSize="small" /></ListItemIcon>
        {character.name}
      </MenuItem>)
  });

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {/* Row */}

        {props.showSimple ? null : (
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
          <Typography className={classes.content}>{props.spell.castingTime}</Typography>
        </Grid>
        <Grid className={classes.gridItem} item xs={6}>
          <Typography variant="h6" className={classes.header} noWrap>
            RANGE
          </Typography>
          <Typography className={classes.content}>{props.spell.range}</Typography>
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
          <Typography className={classes.content}>{props.spell.duration}</Typography>
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
        <Grid className={`${classes.gridItem} ${classes.buttonGroup}`} item xs={12}>
          <Button color="secondary" startIcon={<PersonAddIcon />} onClick={handleMenuOpen}>
            Character
          </Button>
          <Menu id="fade-menu" anchorEl={anchorEl} keepMounted open={openMenu} onClose={handleMenuClose} TransitionComponent={Fade}>
            {characterList}
          </Menu>

          {props.showSimple ? null : (
            <Button color="secondary" startIcon={<LaunchIcon />} onClick={() => handleOpen()}>
              Open
            </Button>
          )}
        </Grid>
      </Grid>
    </div>
  );
};
