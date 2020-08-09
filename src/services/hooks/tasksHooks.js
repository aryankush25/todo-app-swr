import { useState } from 'react';
import _ from 'lodash';
import useSWR from 'swr';
import { toast } from 'react-toastify';
import {
  getTasks,
  createTask,
  deleteTasks,
  updateTasks
} from '../taskServices';
import * as API from '../api/tasksApis';

export const useGetTasksHook = () => {
  const { data, error, mutate } = useSWR(API.getTasksEndPoint, getTasks, {
    shouldRetryOnError: false
  });

  console.log('data', data);

  return {
    tasks: _.get(data, 'data', []),
    isLoading: !error && !data,
    mutate
  };
};

export const useAddTasksHook = () => {
  const { tasks, mutate } = useGetTasksHook();
  const [isLoading, setIsLoading] = useState(false);

  const addTask = async (description, completed) => {
    try {
      setIsLoading(true);

      await createTask(API.updateTasksEndPoint, description, completed);

      await mutate();

      toast.success('Todo added successfully!');
    } catch (error) {
      toast.error('Unable to add todo');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    tasks,
    isLoading,
    addTask
  };
};

export const useDeleteTasksHook = () => {
  const { tasks, mutate } = useGetTasksHook();
  const [isLoading, setIsLoading] = useState(false);

  const deleteTask = async (taskId) => {
    try {
      setIsLoading(true);

      await deleteTasks(API.deleteTasksEndPoint, taskId);

      await mutate();

      toast.success('Todo deleted successfully!');
    } catch (error) {
      toast.error('Unable to delete todo');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    tasks,
    isLoading,
    deleteTask
  };
};

export const useUpdateTasksHook = () => {
  const { tasks, mutate } = useGetTasksHook();
  const [isLoading, setIsLoading] = useState(false);

  const updateTask = async (taskId, updatedObject) => {
    try {
      setIsLoading(true);

      const response = await updateTasks(
        API.updateTasksEndPoint,
        taskId,
        updatedObject
      );

      console.log({ response });

      await mutate();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return {
    tasks,
    isLoading,
    updateTask
  };
};
