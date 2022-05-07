import './App.css';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import { Routes, Route} from 'react-router-dom';
import Details from './components/Details';
import CreateDog from './components/CreateDog';

function App() {
  return (
    <div className="App">
      
      <Routes>

        <Route exact path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<Home/>} />
        <Route path='/dogs/:id'  element={<Details/>}/>
        <Route path='/dog' element={<CreateDog/>}/>

      </Routes>
      

    </div>
  );
}

export default App;
