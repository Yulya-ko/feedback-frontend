import { Card, CardContent, Typography, Button, Box } from "@mui/material";

const FeedbackItem = ({ feedback, handleEdit, handleDelete }) => (
  <Card sx={{ mb: 2 }}>
    <CardContent>
      <Typography variant="h6">{feedback.name} ⭐ {feedback.rating}</Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>{feedback.message}</Typography>
      <Box>
        <Button size="small" variant="outlined" onClick={() => handleEdit(feedback)} sx={{ mr: 1 }}>
          Edit
        </Button>
        <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(feedback._id)}>
          Delete
        </Button>
      </Box>
    </CardContent>
  </Card>
);

export default FeedbackItem;
