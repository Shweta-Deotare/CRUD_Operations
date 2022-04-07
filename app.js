const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const res = require('express/lib/response');

app.use(bodyParser.json()); // support parsing of json type post data
app.use(bodyParser.urlencoded({ extended: true }));//support parsing of application/x-www-form-urlencoded post data

app.get('/', (req, res) =>{
    
    res.send("hello from express 1.0  " + req.query.color1 + req.query.color2);
});

let user = [
    {firstName: 'Shweta',lastName: 'Deotare', Emailid: 'Shweta.@Deotare'},
    {firstName: 'Shrutika',lastName: 'Sawai', Emailid: 'Shrutika.@Sawai'},
    {firstName: 'Pulkit',lastName: 'Agarwal', Emailid: 'Pulkit.@Agarwal'},
    {firstName: 'hbcs',lastName: 'jGAYG', Emailid: 'HFIUREUEQ'}
];

app.get('/user', (req, res) =>{

   
    res.status(200).json(user);//method chaining

})

app.get('/user/:Emailid', (req, res) =>{

    let email = req.params.Emailid;
    var result = user.find(obj => {
        return obj.Emailid === email
      });
    if (result){
        
        res.status(200).json(result);
    } else {
        res.send("user does not exist");
    }
    
});

app.post('/user', (req, res) =>{
    try{
        
       user.push(req.body);
        console.log('req.body', req.body);

        res.sendStatus(200);

    }catch(error) {
        res.sendStatus(500);
    }
    
    
});

app.put('/user/:Emailid', (req, res) =>{
    
    const email = req.params.Emailid;
    
    var result = user.find(obj => {
        return obj.Emailid === email
    });
    

    const toBeAdded = req.body;
        
    
    
    if(result){
        
        Object.assign(result, toBeAdded);
        res.send(result);
    } else {
        res.send("user does not exist");
    }
    

});

app.delete('/user/:Emailid', (req, res) =>{
    const email = req.params.Emailid; //id that is to be deleted

    const index = user.map(e => e.Emailid).indexOf(email);
    console.log (index);

    if(user[index]){
        user.splice(index,1);
        res.send("user deleted");
         
        
    } else {
        res.send("user not found");

    }

     
});

app.listen(5000, () => {

    console.log('Server is up on PORT 5000');

})