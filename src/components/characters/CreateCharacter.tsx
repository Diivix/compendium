// @ts-check
import React, { useState, FormEvent } from 'react';
import { Button, TextField, Slider, Typography, MenuItem, Select, InputLabel } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import * as charactersApi from '../../api/characters';
import { ICharacterBase } from '../../models/ICharacter';
import { useSelector } from 'react-redux';
import { IState } from '../../models/IState';
import { isNull, isNullOrUndefined } from 'util';
import { getCharacterClassTypes } from '../../utils/common';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      width: '50%',
      zIndex: 1,
    },
    label: {
      marginTop: '30px',
    },
    button: {
      marginTop: theme.spacing(2),
      width: '100%',
    },
  })
);

export default () => {
  const classes = useStyles();
  const history = useHistory();
  const [name, setName] = useState('');
  const [classType, setClassType] = useState('');
  const [level, setLevel] = useState(1);
  const [description, setDescription] = useState('');
  const [nameInvalid, setNameInvalid] = useState(true);
  const [levelInvalid] = useState(false);
  const token = useSelector((state: IState) => {
    return state.token;
  });

  const classTypes = getCharacterClassTypes().map((x) => (
    <MenuItem key={x} value={x}>
      {x}
    </MenuItem>
  ));

  const handleSubmit = async (event: FormEvent) => {
    if (!isNull(token) && !nameInvalid && !levelInvalid) {
      const character: ICharacterBase = { name, classType, level, description };
      const newCharacter = await charactersApi.createCharacter({ token, character });
      console.log(JSON.stringify(newCharacter));
      if (!isNullOrUndefined(newCharacter)) history.push('/characters/' + newCharacter.id);
    }
  };

  return (
    <div className={classes.container}>
      <h1>Create a Character</h1>
      <form className={classes.form} noValidate autoComplete="off">
        <TextField
          id="name"
          name="name"
          label="Name"
          value={name}
          type="name"
          margin="normal"
          error={nameInvalid}
          onChange={(event) => {
            if (event.target.value === '') {
              setNameInvalid(true);
            } else {
              setNameInvalid(false);
            }
            setName(event.target.value);
          }}
        />
        <InputLabel id="classTypes-select-label" className={classes.label}>
          Class
        </InputLabel>
        <Select
          labelId="classTypes-select-label"
          id="classType-select"
          value={classType}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
            setClassType(event.target.value as string);
          }}
        >
          {classTypes}
        </Select>
        <Typography className={classes.label} id="discrete-slider-custom" gutterBottom>
          Level
        </Typography>
        <Slider
          value={level}
          aria-labelledby="input-slider"
          step={1}
          marks={true}
          min={1}
          max={20}
          valueLabelDisplay="auto"
          onChange={(event: any, newValue: number | number[]) => {
            if (Array.isArray(newValue)) {
              setLevel(newValue[0]);
            } else {
              setLevel(newValue);
            }
          }}
        />
        <TextField
          id="description"
          name="description"
          label="Description"
          value={description}
          type="description"
          margin="normal"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <Button
          id="submit"
          className={classes.button}
          variant="outlined"
          color="secondary"
          disabled={nameInvalid || levelInvalid}
          onClick={handleSubmit}
        >
          Create
        </Button>
      </form>
    </div>
  );
};
