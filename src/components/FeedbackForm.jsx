import { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";

const FeedbackForm = ({ fetchFeedbacks, editFeedback, setEditFeedback }) => {
  const [feedback, setFeedback] = useState({ name: "", message: "", rating: 1 });

  useEffect(() => {
    if (editFeedback) setFeedback(editFeedback);
  }, [editFeedback]);

  const handleChange = (e) => setFeedback({ ...feedback, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editFeedback) {
        await axios.put(`https://feedback-backend-gmve.onrender.com/api/feedbacks/${editFeedback._id}`, feedback);
        setEditFeedback(null);
      } else {
        await axios.post("https://feedback-backend-gmve.onrender.com/api/feedbacks", feedback);
      }
      setFeedback({ name: "", message: "", rating: 1 });
      fetchFeedbacks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <TextField
        label="Name"
        name="name"
        value={feedback.name}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2, backgroundColor: "#FDCFFA",  border: "1px solid #9B5DE0", borderRadius: '5px' }}
      />
      <TextField
        label="Message"
        name="message"
        value={feedback.message}
        onChange={handleChange}
        fullWidth
        multiline
        rows={3}
        required
        sx={{ mb: 2, backgroundColor: "#FDCFFA",  border: "1px solid #9B5DE0", borderRadius: '5px' }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: '20px'}}>
      <TextField
        label="Rating"
        name="rating"
        type="number"
        value={feedback.rating}
        onChange={handleChange}
        inputProps={{ min: 1, max: 5 }}
        required
        sx={{ mb: 2, backgroundColor: "#FDCFFA", border: "1px solid #9B5DE0", borderRadius: '5px' }}
      />
      <Button variant="contained" type="submit" sx={{ 
        backgroundColor: '#4E56C0', 
        padding: '5px', 
        width: '150px',
        height: '55px',
        fontSize: {xs: '18px', md: '24px'},
        }}>
        {editFeedback ? "Update" : "Submit"}
      </Button>
      </Box>
    </Box>
  );
};

export default FeedbackForm;
