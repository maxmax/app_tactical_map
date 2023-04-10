import React from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
// import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import { Provider } from 'mobx-react';
import { stores } from './stores/root-store';

// import Planet from './containers/Planet';
import AppMap from './containers/AppMap';
// import Edit from './components/Edit';
// for tests
// import AppFire from './containers/AppFire';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          padding: 0;
          margin: 0;
          width: 100%;
          // height: 100vh;
        }
      `,
    }
  }
});

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider { ...stores }>
        <Router>
          <Routes>
            <Route path="/" element={<AppMap/>}/>
            <Route path="/systems/:id" element={<AppMap/>}/>
            <Route path="/systems/:id/terrains/:id" element={<AppMap/>}/>
          </Routes>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
