import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Checkbox, CircularProgress, Container, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          'https://api.gyanibooks.com/library/get_dummy_notes'
        );
        setNotes(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
    <Container maxWidth="sm">
      <Typography variant="h3" align="center" gutterBottom>
        Dummy Notes
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <Typography variant="h5" mt={2} >{note.title}</Typography>
              
            </li>
          ))}
        </ul>
      )}
    </Container>
  </ThemeProvider>
  );
}

export default App;



