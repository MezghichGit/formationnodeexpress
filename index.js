const express = require('express');
const equipesData = require('./equipes.json');
const app = express();
app.use(express.json());
app.listen(82,()=>console.log("Hello ExpressJS"));

app.get('/equipes',(req,res)=>{
    //res.send("<h1 align=center>Liste des équipes!<h1>");
    res.status(200).json(equipesData);
});

app.get('/equipes/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const equipe = equipesData.find(equipe =>equipe.id===id);
    res.status(200).json(equipe);
});

app.post('/equipes',(req,res)=>{
    equipesData.push(req.body);
    res.status(200).json(equipesData);
});
