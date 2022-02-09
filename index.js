const express = require('express');
const app = express();
const {sequelize: db, Produto, Usuario, Comandas} = require('./sequelize.js');
// var bodyParser = require('body-parser')
const cors = require('cors');

app.get('/', function(req,res) {
    res.send('seja bem-vindo.')
})

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

app.use(cors({
    origin: '*'
}));

app.post('/user', function(req,res) {
    var nome = req.body.nome
    var sobrenome = req.body.sobrenome
    console.log(nome + ' ' +sobrenome)
    if (nome == '' || sobrenome == '') {
        res.send(JSON.stringify({msg: false}))
        return
    }
    db.insertUser(nome,sobrenome);
    res.send(JSON.stringify({msg: true}));
})

app.post('/product', function(req,res) {
    var nome = req.body.nome
    var sobrenome = req.body.sobrenome
    console.log(nome + ' ' +sobrenome)
    if (nome == '' || sobrenome == '') {
        res.send(JSON.stringify({msg: false}))
        return
    }
    db.insertProduct(nome,sobrenome);
    res.send(JSON.stringify({msg: true}));
})

app.get('/users', function(req,res) {
    db.listItem(Usuario).then( (users) => {
        // console.log(users);
        res.send(users);
    })
})

app.get('/products', function(req,res) {
    db.listItem(Produto).then( (users) => {
        // console.log(users);
        res.send(users);
    })
})

app.post('/search', function(req,res) {
    var text = req.body.text
    // console.log(text)
    db.findItem(Usuario,text).then( (result) => {
        // console.log(result)
        res.send(result);
    })
})


app.post('/searchp', function(req,res) {
    var text = req.body.text
    // console.log(text)
    db.findItem(Produto,text).then( (result) => {
        // console.log(result)
        res.send(result);
    })
})

app.post('/deletec', function(req,res) {
    var id = req.body.id
    db.delItem(Usuario,id).then( (result) => {
        res.send(result);
    })
})

app.post('/deletep', function(req,res) {
    var id = req.body.id
    db.delItem(Produto,id).then( (result) => {
        res.send(result);
    })
})

app.post('/updatec', function(req,res) {
    var item = req.body
    db.updateClient(Usuario,item.id,item.nome,item.sobrenome).then( (result) => {
        res.send(result);
    })
})

app.post('/updatep', function(req,res) {
    var item = req.body
    db.updateProduct(Produto,item.id,item.nome,item.valor).then( (result) => {
        res.send(result);
    })
})

app.post('/insertc', function(req,res) {
    var item = req.body
    db.insertCommand(item.client_id)
    res.send(JSON.stringify({msg: true}))
})

app.post('/insertplist', function(req,res) {
    var item = req.body
    db.insertPList(item.id, JSON.stringify(item.list))
    .then(res.send(JSON.stringify({msg: 'ok'})))
})

app.get('/orders', function(req,res) {
    db.listOrders(Comandas).then( (result) => {
        res.send(result)
    })
})

app.post('/finishc', function(req,res) {
    var item = req.body
    db.finishOrder(item.id).then( (result) => {
        res.send(result)
    })
})

app.get('/dayorders', function(req,res) {
    db.dayOrders().then( (result) => {
        res.send(result)
    })
})

app.get('/weekorders', function(req,res) {
    db.weekOrders().then( (result) => {
        res.send(result)
    })
})

app.get('/monthlyorders', function(req,res) {
    db.monthlyOrders().then( (result) => {
        res.send(result)
    })
})

app.post('/customorders', function(req,res) {
    var item = req.body
    db.filterDayOrders(item.date).then( (result) => {
        res.send(result)
    })
})




app.listen(8081, function() {
    console.log('rodando em http://localhost:8080/')
})
