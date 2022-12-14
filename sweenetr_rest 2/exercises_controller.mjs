import 'dotenv/config';
import * as exercises from './exercises_model.mjs';
import express from 'express';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

/**
 * Create a new exercise with the name, reps and date provided in the body
 */
app.post('/exercises', (req, res) => {
    try{
    let trueOrFalse = exercises.dataValidation(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
    try{
        if (trueOrFalse === true){
            exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
            .then(exercise => {
                res.status(201).json(exercise);
            })
            .catch(error => {
                console.error(error);
                res.status(400).json({ Error: 'Invalid Request'});
            })
        } else {
            console.error(error)
            res.status(400).json({Error: 'Invalid Request'})
        }
    }
    catch{
        console.error(error);
        res.status(400).json({ Error: 'Invalid Request'});
    }
    }
    catch{
        res.status(400).json({ Error: 'Invalid Request'});
    }
    
});

/*
 * Retrive the exercise corresponding to the ID provided in the URL.
 */
app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExerciseById(exerciseId)
    .then(exercise => {
        if (exercise !== null){
            res.json(exercise)
        } else {
            res.status(404).json({ Error: 'Resource Not Found'})
        }
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({ Error: 'Request Failed'})
    })
});

/**
 * Retrieve exercises. 
 * If the query parameters include a rep, then only the exercises for that rep are returned.
 * Otherwise, all exercises are returned.
 */
app.get('/exercises', (req, res) => {
    let filter = {};
    exercises.findExercises(filter, '', 0)
    .then(exercises => {
        res.status(200).json(exercises);
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({ Error: "Request Failed"})
    })
});

/**
 * Update the exercise whose id is provided in the path parameter and set
 * its name, reps and date to the values provided in the body.
 */
app.put('/exercises/:_id', (req, res) => {
    let trueOrFalse = exercises.dataValidation(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
    try{
        if (trueOrFalse === true){
            exercises.replaceExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
            .then(numUpdated => {
                if (numUpdated === 1){
                    res.status(200).json({_id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date});
                } else {
                    res.status(404).json({Error: 'Not Found'})
                }
            })
            .catch(error => {
                console.error(error);
                res.status(400).json({ Error: 'Invalid Request'});
            })
        } else {
            res.status(400).json({Error: 'Invalid Request'})
        }
    }
    catch{
        res.status(400).json({ Error: 'Invalid Request'});
    }    
});

/**
 * Delete the exercise whose id is provided in the query parameters
 */
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
    .then(deletedCount => {
        if (deletedCount === 1){
            res.status(204).send();
        } else {
            res.status(404).json({Error: 'Resource Not Found'})
        }
    })
    .catch(error => {
        console.error(error)
        res.send({Error: 'Request Failed'})
    })
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});