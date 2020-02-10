/* eslint-disable no-use-before-define */

import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { ITagOptions } from '../../models/ITagOptions';

interface IProps {
  options: ITagOptions[];
  className?: string
  onClose: (selectedOptions: ITagOptions[]) => void;
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function TagMultiSelect(props: IProps) {
  return (
    <Autocomplete
      multiple
      id="tag-multi-select"
      loading={props.options.length === 0}
      options={props.options}
      disableCloseOnSelect
      getOptionLabel={(option: { title: any }) => option.title}
      renderOption={(option: { title: React.ReactNode }, { selected }: any) => (
        <React.Fragment>
          <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
          {option.title}
        </React.Fragment>
      )}
      className={props.className}
      renderInput={(params: any) => <TextField {...params} variant="outlined" label="Filters" fullWidth />}
      onChange={(event, value) => props.onClose(value)}
    />
  );
}
