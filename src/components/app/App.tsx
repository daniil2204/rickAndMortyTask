import CharsPage from '../charsPage/CharsPage';
import CharPage from '../charPage/CharPage';
import SignUp from '../signUp/SignUp';
import Login from '../login/Login';
import Page404 from '../page404/page404';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.scss';

function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<CharsPage/>}/>
          <Route path='/signUp' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/char/:id' element={<CharPage/>}/>
          <Route path='*' element={<Page404/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
