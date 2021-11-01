import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from './components/home';

function App() {
  return (
    <BrowserRouter>
        <Switch>
        
          <Route path="/" component={HomePage}/>
          
        </Switch>
      </BrowserRouter>
  );
}

export default App;
