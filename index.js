const express = require('express');

const students = require('./students')

const app = express();
app.use(express.json())

app.listen(3000, () => {
    console.log("Listening on port 3000");
});

// Get method
app.get('/', (req, res) => {
    res.send({ greet: 'hello world' })
})

// Get students data
app.get('/students', (req, res) => {
    res.json(students)
})

// create(post) student
app.post('/student', (req, res) => {
    if (!req.body.name) {
        res.status(400)
        return res.json({ error: 'name is required' })
    }

    if (!req.body.email) {
        res.status(400)
        return res.json({ error: 'email is required' })
    }

    if (!req.body.gender) {
        res.status(400)
        return res.json({ error: 'gender is required' })
    }
    const user = {
        id: students.length + 1,
        name: req.body.name && req.body.name,
        email: req.body.email && req.body.email,
        gender: req.body.gender && req.body.gender,
    }
    students.push(user)
    res.status(200)
    res.send("Student Added")
})

// Put method
app.put('/student/:id', (req, res) => {
    let id = req.params.id;
    let name = req.body.name;
    let email = req.body.email;
    let gender = req.body.gender;


    let index = students.findIndex((student) => {
        return (student.id == Number.parseInt(id));
    })

    if (index >= 0) {
        let std = students[index];
        std.name = name;
        std.email = email;
        std.gender = gender;
        res.status(200);
        res.json(std);
    }
    else {
        res.status(404)
    }

});

// Delete method
app.delete('/student/:id', (req, res) => {
    let id = req.params.id;

    let index = students.findIndex((student) => {
        return (student.id == Number.parseInt(id));
    })

    if (index >= 0) {
        students.splice(index, 1)
        res.status(200)
        res.json({ message: "successfully deleted" })
    }
    else {
        res.status(404)
    }
})