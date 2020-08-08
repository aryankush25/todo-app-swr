import React from 'react';
import AppContainer from '../../containers/AppContainer';
import TodoList from './TodoList';

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

const Home = () => {
  return (
    <AppContainer>
      <TodoList todoList={fakeTodoList} />
    </AppContainer>
  );
};

export default Home;
