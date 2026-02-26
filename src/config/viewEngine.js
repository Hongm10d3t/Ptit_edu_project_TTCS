
const path = require('path')
const express = require('express')
const configViewEngine = (app) => {
    app.set('views', path.join('./src', 'views')) // ý nghĩa: tìm kiếm các file ejs trong thư mục views
    app.set('view engine', 'ejs')
    app.use(express.static(path.join('./src', 'public')))
}

module.exports = configViewEngine;