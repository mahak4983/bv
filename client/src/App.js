import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      hello
      <Router>

      <Routes>
          <Route exact path="https://nervous-pear-pumps.cyclic.app/login" element={<Login />} />
          <Route exact path="https://nervous-pear-pumps.cyclic.app/register" element={<Register />} />

      </Routes>
      </Router>
    </div>
  );
}

export default App;
 