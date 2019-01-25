const express = require('express');
const bodyParser = require('body-parser');

const app= express();
app.use(bodyParser.json());

const database = {
    users: [
        {
            id: '123',
            name: "Sigmund",
            email: 'sigmund@gmail.com',
            password: 'LOL',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: "Sally",
            email: 'sally@gmail.com',
            password: 'bana',
            entries: 0,
            joined: new Date()
        }

    ]
}

app.get('/', (req,res)=>{
    res.send(database.users);
});

app.post('/signin', (req, res) => {
    if(req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password){
        res.json('sucess');
    }
    else{
        res.status(400).jason('error logging in');
    }
    res.json('signing')
});

app.post('/register', (req, res) => {
    const {email, name, password} = req.body;
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1]);
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    database.users.forEach(user => {
        if (user.id === id){
            return res.json(user);
        }
    })
    res.status(404).json('No such user');
});

app.post('/image', (req, res) => {
    const { id } = req.body;
    console.log(id);
    database.users.forEach(user => {
        if (user.id === id){
            user.entries++;
            return res.json(user.entries);
        }
    })
    res.status(404).json('No such user');
});

app.listen(3000, () => {
    console.log('app is running on port 3000');
});