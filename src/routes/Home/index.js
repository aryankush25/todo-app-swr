import React, { useState } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import AppContainer from '../../containers/AppContainer';
import TodoList from './TodoList';
import AddEditTodoDialog from './AddEditTodoDialog';
import { useGetTasksHook } from '../../services/hooks/tasksHooks';

const useStyles = makeStyles((theme) => ({
  floatingAddButton: {
    position: 'absolute',
    right: '25px',
    bottom: '25px'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1
  }
}));

const Home = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const { tasks, isLoading } = useGetTasksHook();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AppContainer>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress />
      </Backdrop>

      {!isLoading && tasks.length !== 0 && <TodoList todoList={tasks} />}

      {!isLoading && tasks.length === 0 && <div>No Todo Available</div>}

      <AddEditTodoDialog open={open} handleClose={handleClose} />

      <Fab
        className={classes.floatingAddButton}
        color="primary"
        aria-label="add"
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>
    </AppContainer>
  );
};

export default Home;
