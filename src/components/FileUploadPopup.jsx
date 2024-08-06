import React, { useState } from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';

const FileUploadPopup = ({ open, handleClose, handleSubmit }) => {
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // State to manage button disable

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  const handlePopupSubmit = async () => {
    if (file && !isSubmitting) {
      setIsSubmitting(true); // Disable the button
      await handleSubmit(file);
      setIsSubmitting(false); // Reset the button after submission is complete
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '400px' },
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 2,
          borderRadius: 2,
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Upload Your Proof of Purchase
        </Typography>
        <Button
          variant="outlined"
          component="label"
          fullWidth
          sx={{ mb: 2 }}
        >
          📁 Select Image
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
        </Button>
        {file && (
          <Box sx={{ textAlign: 'center' }}>
            <img src={URL.createObjectURL(file)} alt="Selected" style={{ maxWidth: '100%', borderRadius: '8px' }} />
          </Box>
        )}
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            color="primary"
            onClick={handlePopupSubmit}
            disabled={isSubmitting} // Disable button if submitting
          >
            Submit
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FileUploadPopup;
