import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Dashboard from './routes/Dashboard';
import Dorms from './routes/Dorms';
import NotFound from './routes/NotFound';
import Heatmap from "./routes/Heatmap.tsx";

const App = () => {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dorms" element={<Dorms />} />
          <Route path="/heatmap" element={<Heatmap/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    </Router>
  );
};

export default App;
