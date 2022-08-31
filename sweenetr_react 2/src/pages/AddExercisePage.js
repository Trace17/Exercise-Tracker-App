import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const AddExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');

    const history = useHistory()

    const addExercise = async () => {
        const newExercise = {name, reps, weight, unit, date};
        const response = await fetch('/Exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-type': 'application/json'
            }
        })
        if (response.status === 201){
            alert("Successfully Added The Exercise")
        }else {
            alert(`Failed To Add The Exercise. Status Code: ${response.status}`)
        }
        history.push('/');
    };

    return (
        <div>
            <h1>Add Exercise</h1>
            <input
                type="text"
                placeholder="Enter name here"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                placeholder="Enter reps here"
                onChange={e => setReps(e.target.value)} />
            <input
                type="number"
                placeholder="Enter weight here"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <select value = {unit} onChange={e => setUnit(e.target.value)}>
                <option value={"lbs"} > lbs</option>
                <option value={"kgs"} > kgs</option>
            </select>
            <input
                type="text"
                placeholder="Enter date here"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={addExercise}
            >Add</button>
        </div>
    );
}

export default AddExercisePage;