const express = require('express');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const {middlewares,authenticateUser} = require('./middlewares/middlewares');


const app = express();
const port = process.env.PORT || 2000;


middlewares.forEach((middleware) => app.use(middleware));

app.get('/',authenticateUser, (req, res) => {
    res.status(200).send('Welcome');
});
app.use('/user', userRoutes);


app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});