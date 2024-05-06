const app = require('./app');

const db = require('./config/db');

const port = process.env.PORT || 3000;

app.get('/', (req, res)=>{
    res.send("Hello World");
})

app.listen(port, ()=>{
    console.log(`Server listening on port http://localhost:${port}`);
});


//* This is the entry point of the server