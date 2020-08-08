import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const CheckboxList = ({ todoList }) => {
  const [checked, setChecked] = useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Grid item xs={12} md={6}>
      <List>
        {todoList.map((value, index) => {
          const labelId = `checkbox-list-label-${index}`;

          return (
            <ListItem
              key={labelId}
              role={undefined}
              button
              onClick={() => console.log('Edit', index)}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={value.checked}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                  onClick={handleToggle(value)}
                />
              </ListItemIcon>

              <ListItemText
                id={labelId}
                primary={`Task ${index + 1}`}
                secondary={value.description}
              />

              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="comments">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </Grid>
  );
};

export default CheckboxList;
