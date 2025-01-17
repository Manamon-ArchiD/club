const express = require('express');
const app = express();
const port = 3000

app.get('/', (req, res) => {

    const response = {
        message: 'Hello World',
        date: new Date()
    };

    res.send(response);
});

app.listen(port, () => {
    console.log('Server is running on port 3000');
});