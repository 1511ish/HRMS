import './App.css';
import { useState } from 'react';
import RegistrationPage from './components/auth/RegistrationPage/RegistrationPage';
import Dashboard from './components/dashboard/Dashboard';
import Logo from './components/ui/Logo/Logo.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      {/* {!isLoggedIn ? (
        <RegistrationPage onLoginSuccess={() => setIsLoggedIn(true)} />
      ) : (
        <Dashboard onLogout={() => setIsLoggedIn(false)} />
      )} */}
       <Dashboard/>
       {/* <RegistrationPage /> */}
    </div>
  );
}

export default App;
