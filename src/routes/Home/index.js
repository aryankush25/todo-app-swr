import React, { useState } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import AppContainer from '../../containers/AppContainer';
import TodoList from './TodoList';
import AddEditTodoDialog from './AddEditTodoDialog';

const fakeTodoList = [
  {
    completed: true,
    _id: '5ec2d41dc00f4900175dc818',
    description: 'Hello I need to complete this app today.',
    owner: '5ec2d0f6c00f4900175dc814',
    createdAt: '2020-05-18T18:29:49.750Z',
    updatedAt: '2020-06-18T19:44:47.230Z',
    __v: 0
  },
  {
    completed: false,
    _id: '5ec2d41dc00f4900175dc818',
    description: 'Hello I need to complete this app today.',
    owner: '5ec2d0f6c00f4900175dc814',
    createdAt: '2020-05-18T18:29:49.750Z',
    updatedAt: '2020-06-18T19:44:47.230Z',
    __v: 0
  },
  {
    completed: true,
    _id: '5ec2d41dc00f4900175dc818',
    description: 'Hello I need to complete this app today.',
    owner: '5ec2d0f6c00f4900175dc814',
    createdAt: '2020-05-18T18:29:49.750Z',
    updatedAt: '2020-06-18T19:44:47.230Z',
    __v: 0
  }
];

const useStyles = makeStyles(() => ({
  floatingAddButton: {
    position: 'absolute',
    right: '25px',
    bottom: '25px'
  }
}));

const Home = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AppContainer>
      <TodoList todoList={fakeTodoList} />

      <Fab
        className={classes.floatingAddButton}
        color="primary"
        aria-label="add"
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>

      <AddEditTodoDialog open={open} handleClose={handleClose} />
    </AppContainer>
  );
};

export default Home;
