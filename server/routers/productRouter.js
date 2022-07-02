const express = require('express');
const data = require('../data.js');

const { Router } = require('express');
const productRouter = Router();

productRouter.get('/', (req, res) => {
    // console.log(data);
    res.send(data.products);
})

module.exports = productRouter;

