import React, { useState, useEffect } from "react";
import axios from "axios";
import FeedbackItem from "./FeedbackItem";
import FeedbackForm from "./FeedbackForm";
import { Typography, CircularProgress, Box } from "@mui/material";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [editFeedback, setEditFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeedbacks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("https://feedback-backend-gmve.onrender.com");
      if (Array.isArray(res.data)) {
        setFeedbacks(res.data);
      } else {
        throw new Error("Server did not return an array");
      }
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
      setError(err.message || "Something went wrong while fetching feedbacks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleEdit = (feedback) => setEditFeedback(feedback);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://feedback-backend-gmve.onrender.com/${id}`);
      fetchFeedbacks();
    } catch (err) {
      console.error("Error deleting feedback:", err);
      setError(err.message || "Failed to delete feedback");
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" mt={4}>
        {error}
      </Typography>
    );
  }

  return (
    <Box>
      <FeedbackForm
        fetchFeedbacks={fetchFeedbacks}
        editFeedback={editFeedback}
        setEditFeedback={setEditFeedback}
      />
      {feedbacks.length === 0 ? (
        <Typography align="center">No feedbacks yet. Be the first to submit!</Typography>
      ) : (
        feedbacks.map((fb) => (
          <FeedbackItem
            key={fb._id}
            feedback={fb}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))
      )}
    </Box>
  );
};

export default FeedbackList;
