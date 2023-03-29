// configuração inicial

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = 3000;

// forma de ler JSON / middlewares
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false}));

app.use(express.urlencoded({extended: true, }),);

app.use(express.json());

//rota inicial / endpoint
app.get('/', (req, res) =>{res.json("Bem vindo")});


// referencia de autenticação
//require('.controllers/authController')(app);

// entregar uma porta
//app.listen(3000);

const lista = [ 
  {
    "id": 1,
    "name": "Vanessa",
    "email": "vanessafernandes378@gmail.com",
    "password": "011217",

  }, 
    
  {
    "id": 2,
    "name": "Ruan",
    "email": "ruannsantos8@gmail.com",
    "password": "142536",

  },
   
  {   
    "id": 3,
    "name": "Amanda",
    "email": "amandafernandes009@gmail.com",
    "password": "000000",

    },
]

let nextId = 4

app.get('/lista', (req, res) => {
    res.status(200).send(lista);
  });
  
app.post('/lista', (req, res) => {
    const { name, email, password} = req.body;

    const cadastro = {
      id: nextId++,
      name,
      email,
      password,
    };
  
    lista.push(cadastro);
    res.status(201).send(cadastro);
});
  
app.put('/lista:id', (req, res) => {
  const id = parseInt(req.params.id);
  const listac = lista.find(i => i.id === id);

  if (!listac) {
    return res.status(400).send('Lista Inexistente');
  }
  listac.name = req.body.name || listac.name;
  listac.email = req.body.email || listac.email;
  listac.password = req.body.password || listac.password;

  res.status(200).send(listac);
  
});
 
app.patch('/lista:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itens = lista.find(lista => lista.id === id);

  if (!lista) {
    return res.status(404).send('Lista não encontrado');
  }

  if (req.body.name) {
    itens.name = req.body.name;
  }
  if (req.body.email) {
    itens.email = req.body.email;
  }
  if (req.body.password) {
    itens.password = req.body.password;
  }

  res.status(200).send(itens);

});


app.delete('/lista:id', (req, res) => {
  const id = parseInt(req.params.id);
  const indice = lista.findIndex(a => a.id === id);

  if (indice === -1) {
    return res.status(404).send('Usuario não encontrada');
  }

  lista.splice(indice, 1);
  res.status(204).send();
});


app.options('/lista', (req, res) => {
  res.setHeader('Allow', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.status(200).send();
});

app.head('/lista', (req, res) => {
    res.setHeader('Collection size', lista.length);
    res.status(200).send();
});
  
  app.listen(port, () => {
    console.log(`Executando porta: ${port}`);
  });