import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AddEditTodoDialog = ({ open, handleClose, editModal = false }) => {
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleChangeCompleted = () => {
    setCompleted(!completed);
  };

  const handleSave = () => {
    console.log({ description, completed });
  };

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="sm"
      aria-labelledby="form-dialog-title"
      onClose={handleClose}
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
          onChange={handleChangeDescription}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={completed}
              onChange={handleChangeCompleted}
              name="completed"
            />
          }
          label="Completed"
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditTodoDialog;
