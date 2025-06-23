import './App.css';
import { useState } from 'react';
import RegistrationPage from './components/auth/RegistrationPage/RegistrationPage';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      {!isLoggedIn ?
        (
          <RegistrationPage onLoginSuccess={() => setIsLoggedIn(true)} />
        ) :
        (
          <Dashboard onLogout={() => setIsLoggedIn(false)} />
        )}
    </div>
  );
}

export default App;
