import { useState } from 'react';
import _ from 'lodash';
import useSWR from 'swr';
import { toast } from 'react-toastify';
import { getTasks, createTask } from '../taskServices';
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

      const response = await createTask(
        API.createTaskEndPoint,
        description,
        completed
      );

      console.log({ response });

      mutate();

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
