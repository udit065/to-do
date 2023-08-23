import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Homepage/Home';
import Login from './components/Login/Login';
import SignIn from './components/Signin/SignIn';
import CreateTodo from './components/CreateTodo/CreateTodo';
import TodoHome from './components/TodoHome/TodoHome';
import TodoDesc from './components/TodoDesc/TodoDesc';
import Edit from './components/Edit/Edit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/todohome' element={<TodoHome />} />
        <Route path='/createtodo' element={<CreateTodo />} />
        <Route path='/todohome/:id' element={<TodoDesc />} />
        <Route path='/todohome/edit/:id' element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
