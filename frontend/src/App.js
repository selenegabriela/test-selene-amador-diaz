import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddItemScreen from './screens/AddItemScreen';


function App() {
  return (
    <BrowserRouter>  
      <div className="App">
        <Routes>
          <Route exact path='/' element={<AddItemScreen />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
