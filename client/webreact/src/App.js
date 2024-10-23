import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
// import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import AuthRedirect from './components/AuthRedirect';
import Admin from './components/Admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthRedirect />}/>
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<Admin />} />
        </Route>

        <Route path="*" element={<h1>404 - Страница не найдена</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;