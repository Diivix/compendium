// @ts-check
import React, { useState, useEffect } from 'react';
import { Button, TextField, Slider, Typography, MenuItem, Select, InputLabel } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { getCharacterClassTypes } from '../../utils/common';
import { ICharacterBase, ICharacter } from '../../models/ICharacter';
import { isUndefined } from 'util';

interface IProps {
  character?: ICharacter;
  submitButtonText: string;
  handleSubmit: (character: ICharacterBase) => void;
  handleCancel: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '20px 10px 0px 10px',
    },
    title: {
      width: '100%',
      marginLeft: '5%',
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
    buttonGroup: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'right',
    },
    button: {
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(2),
    },
  })
);

export default (props: IProps) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [classType, setClassType] = useState('');
  const [level, setLevel] = useState(1);
  const [description, setDescription] = useState('');
  const [nameInvalid, setNameInvalid] = useState(true);
  const [levelInvalid] = useState(false);

  const classTypes = getCharacterClassTypes().map((x) => (
    <MenuItem key={x} value={x}>
      {x}
    </MenuItem>
  ));

  const handleSubmit = () => {
    if (!nameInvalid && !levelInvalid) {
      const character: ICharacterBase = { name, classType, level, description };
      props.handleSubmit(character);
    }
  };

  useEffect(() => {
    if (!isUndefined(props.character)) {
      setName(props.character.name);
      setClassType(props.character.classType);
      setLevel(props.character.level);
      setDescription(props.character.description);
      setNameInvalid(false);
    }
  }, [props.character]);

  return (
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
      <div className={classes.buttonGroup}>
        <Button
          id="Cancel"
          className={classes.button}
          variant="text"
          color="secondary"
          onClick={props.handleCancel}
        >
          Cancel
        </Button>
        <Button
          id="submit"
          className={classes.button}
          variant="contained"
          color="secondary"
          disabled={nameInvalid || levelInvalid}
          onClick={handleSubmit}
        >
          {props.submitButtonText}
        </Button>
      </div>
    </form>
  );
};
