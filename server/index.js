const express = require('express');
const productRouter = require('./routers/productRouter.js');

const app = express();

app.use('/api/products', productRouter);

app.listen(5000, () => {
    console.log('Server at http://localhost:5000');
})
