import React, { Fragment, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import SpinnerAdornment from '../../components/shared/SpinnerAdornment';
import AddEditTodoDialog from './AddEditTodoDialog';
import {
  useDeleteTasksHook,
  useUpdateTasksHook
} from '../../services/hooks/tasksHooks';

const useStyles = makeStyles(() => ({
  displayFlex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const CheckboxListElement = ({ labelId, value, index }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { isLoading: isDeletingTask, deleteTask } = useDeleteTasksHook();
  const { isLoading: isUpdatingTask, updateTask } = useUpdateTasksHook();

  const handleToggle = () => {
    updateTask(value._id, { completed: !value.completed });
  };

  const handleOnClickDelete = () => {
    deleteTask(value._id);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <AddEditTodoDialog
        editModal
        open={open}
        taskId={value._id}
        initialDescription={value.description}
        handleClose={handleClose}
      />

      <ListItem role={undefined} button onClick={handleToggle}>
        <ListItemIcon>
          <Box className={classes.displayFlex}>
            {!isUpdatingTask ? (
              <Checkbox
                edge="start"
                checked={value.completed}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            ) : (
              <SpinnerAdornment />
            )}
          </Box>
        </ListItemIcon>

        <ListItemText
          id={labelId}
          primary={`Task ${index + 1}`}
          secondary={value.description}
        />

        <ListItemSecondaryAction className={classes.displayFlex}>
          <Box>
            <IconButton aria-label="edit" onClick={handleClickOpen}>
              <EditIcon />
            </IconButton>
          </Box>

          <Box className={classes.displayFlex}>
            {!isDeletingTask ? (
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={handleOnClickDelete}
              >
                <DeleteIcon />
              </IconButton>
            ) : (
              <SpinnerAdornment />
            )}
          </Box>
        </ListItemSecondaryAction>
      </ListItem>
    </Fragment>
  );
};

const CheckboxList = ({ todoList }) => {
  return (
    <Grid item xs={12} md={6}>
      <List>
        {todoList.map((value, index) => {
          const labelId = `checkbox-list-label-${index}`;

          return (
            <CheckboxListElement
              key={labelId}
              labelId={labelId}
              value={value}
              index={index}
            />
          );
        })}
      </List>
    </Grid>
  );
};

export default CheckboxList;
