import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Register from './pages/register';
import Login from './pages/login';
import Addjob from './pages/description';
import JobListing from './pages/jobListing';
import JobDetail from './pages/Jobdetails';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/jobs" />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addjob" element={<Addjob />} />
          <Route path="/jobs" element={<JobListing />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
