import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SpinnerAdornment from '../../components/shared/SpinnerAdornment';
import {
  useAddTasksHook,
  useUpdateTasksHook
} from '../../services/hooks/tasksHooks';
import { isPresent } from '../../utils/helper';

const AddEditTodoDialog = ({
  open,
  handleClose,
  editModal = false,
  initialDescription = '',
  initialCompleted = false,
  taskId = null
}) => {
  const [description, setDescription] = useState(initialDescription);
  const [completed, setCompleted] = useState(initialCompleted);
  const { isLoading: isAddingTask, addTask } = useAddTasksHook();
  const { isLoading: isUpdatingTask, updateTask } = useUpdateTasksHook();

  const isLoading = isAddingTask || isUpdatingTask;

  useEffect(() => {
    if (editModal) {
      setDescription(initialDescription);
    }
  }, [editModal, initialDescription]);

  useEffect(() => {
    if (editModal) {
      setCompleted(initialCompleted);
    }
  }, [editModal, initialCompleted]);

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleChangeCompleted = () => {
    setCompleted(!completed);
  };

  const handleSave = async () => {
    if (editModal && isPresent(taskId)) {
      await updateTask(taskId, { description });
    } else {
      await addTask(description, completed);
    }

    handleClose();
  };

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="sm"
      aria-labelledby="form-dialog-title"
      onClose={() => !isLoading && handleClose()}
    >
      <DialogTitle id="form-dialog-title">
        {editModal ? 'Edit Todo' : 'Add Todo'}
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Please {editModal ? 'edit' : 'add'} Details of task.
        </DialogContentText>

        <TextField
          autoFocus
          margin="dense"
          variant="outlined"
          id="description"
          label="Description"
          type="text"
          fullWidth
          multiline
          rows={5}
          value={description}
          disabled={isLoading}
          onChange={handleChangeDescription}
        />

        {!editModal && (
          <FormControlLabel
            control={
              <Checkbox
                name="completed"
                checked={completed}
                disabled={isLoading}
                onChange={handleChangeCompleted}
              />
            }
            label="Completed"
          />
        )}
      </DialogContent>

      <DialogActions>
        <Button disabled={isLoading} onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button disabled={isLoading} onClick={handleSave} color="primary">
          Save
          {isLoading && <SpinnerAdornment />}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditTodoDialog;
