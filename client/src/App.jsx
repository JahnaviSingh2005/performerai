import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AddCandidate from './pages/AddCandidate';
import CandidateList from './pages/CandidateList';
import JobMatch from './pages/JobMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';

/**
 * Main application component — Employee Performance Analytics & Recommendation System.
 */
// Wrap layout with Auth checks to hide sidebar/navbar on login/signup
function AppLayout() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="flex min-h-screen bg-surface-950 w-full items-center justify-center p-8">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-surface-950 w-full">
      <Sidebar />
      <div className="flex-1 ml-64 w-[calc(100%-16rem)]">
        <Navbar />
        <main className="p-8">
          <Routes>
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/candidates" element={<ProtectedRoute><CandidateList /></ProtectedRoute>} />
            <Route path="/candidates/new" element={<ProtectedRoute><AddCandidate /></ProtectedRoute>} />
            <Route path="/match" element={<ProtectedRoute><JobMatch /></ProtectedRoute>} />
            <Route path="*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return <AppLayout />;
}
