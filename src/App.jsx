import FeedbackList from "./components/FeedbackList";
import { Container, Typography } from "@mui/material";
import './App.css'

function App() {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, color: '#3E1E68', fontFamily: '"Open Sans", sans-serif', fontWeight: 500, fontSize: {xs: '30px', md: '40px'} }} align="center">
        Feedback App
      </Typography>
      <FeedbackList />
    </Container>
  );
}

export default App;
