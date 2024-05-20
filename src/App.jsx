import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Outlet, Route, Routes } from "react-router-dom";
import './App.css';
import Home from './Home';
import Find from './Find';
import Pet from './Pet';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route index path="/find" element={<Find />} />
        <Route index path="/pet/:id" element={<Pet />} />
        <Route index path="*" element={<Home />} />
      </Routes>
      <Outlet />
    </ThemeProvider>
  );
}