import React from 'react';
import './App.css';
import { Header } from '../common/header';
import { Container, Typography, CssBaseline } from '@material-ui/core'
import { ApplicationForm } from '../applicationForm/ApplicationForm';
// import { BottomNavigation } from '@mui/material';
import { Footer } from '../common/footer'

function App() {
  return (
    <div className="App">
      <Header></Header>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="md">
          <Typography component="div" className='container'>
            <ApplicationForm></ApplicationForm>
          </Typography>

        </Container>
      </React.Fragment>
      <Footer></Footer>
    </div>
  );
}

export default App;
