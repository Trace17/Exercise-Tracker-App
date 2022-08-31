import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddExercisePage from './pages/AddExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import {useState} from 'react'
import { Link } from 'react-router-dom';
import {MdCopyright} from 'react-icons/md';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <Router>
        <div className="App-header">
          <h1>Exercise Tracker</h1>
          <p>Track your workouts here!</p>
          <nav><p><Link to="/">Home Page</Link></p>
          <p><Link to="/add-exercise">Add Exercise Page</Link></p></nav>
          <Route path="/" exact>
            <HomePage setExerciseToEdit = {setExerciseToEdit}/>
          </Route>
          <Route path="/add-exercise">
            <AddExercisePage />
          </Route>
          <Route path="/edit-exercise">
            <EditExercisePage exerciseToEdit = {exerciseToEdit}/>
          </Route>
          </div>
          <footer> <MdCopyright></MdCopyright> 2022 Trace Sweeney </footer>
      </Router>
    </div>
  );
}

export default App;