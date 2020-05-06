const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');

const app=express()
const port=3000

let products=[{
    "id":"1",
    "name":"samsung",
    "manu_date":"2014-02-03",
    "exp_date":"2018-03-07",
},
{
    "id":"2",
    "name":"redmi",
    "manu_date":"2014-02-03",
    "exp_date":"2018-03-07",
},
{
     "id":"3",
     "name":"vivo",
    "manu_date":"2014-02-03",
    "exp_date":"2018-03-07",
}];

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//get the books.................................................
app.get('/product',(req,res)=>{
    res.json(products);
});

//post an addition book...........................................
app.post('/product',(req,res)=>{
    const product=req.body;

    //output the book to the console for debugging
    console.log(product);
    products.push(product);

    res.send('Product is added to the database');

});

//pull an specific book............................................
app.get('/product/:id',(req,res)=>{
    
    //reading isbn from url
    const id=req.params.id;
    
    //searching books for the isbn
    for(let product of products){
        if(product.id===id){
            res.json(product);
            return;
        }
    }

    //sending 404 when not found something is a good pattren
    res.status(404).send('Product not found...');
});

//Put (update) the content

app.put('/product/:id',(req,res)=>{
    
    //reading isbn from url
    const id=req.params.id;
    const newProduct=req.body;

    //remove item from the books array
    for(let i=0;i<products.length;i++){
        let product=products[i];

        if(product.id===id){
            products[i]=newProduct;
        }
    }

    //sending 404 when not found something is a good pattren
    res.status(404).send('Product is edited');
});

//Deleting the content..using filter option....(many ways to delete)............................................

app.delete('/product/:id',(req,res)=>{
   
    //reading isbn from URl
    const id=req.params.id;

    //remove item from book array
    products=products.filter(i=>{
        if(i.id !==id){
            return true;
        }
        return false;
    });

    //sending 404 when not found something is a good pattren
    res.send('product is deleted');
});

//..............................................................................................................

app.listen(port,()=>
 console.log(`Hello world listening on port ${port}!!!`));