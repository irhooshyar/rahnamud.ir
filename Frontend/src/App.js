import { BrowserRouter, Routes , Route } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*<Route exact path="/login" component={Login} />*/}
        {/*<Route exact path="/register" component={Register} />*/}
        {/*<Route exact path="/forgot-password" component={ForgotPassword} />*/}
        {/*<Route exact path="/reset-password" component={ResetPassword} />*/}
        <Route path='/' element={<Home/>} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
