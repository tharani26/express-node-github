const express=require('express')
const bodyParser=require('body-parser');
const cors=require('cors');

const app=express()
const port=3000

let books=[
    {
    "isbn":"123",
    "title":"Javascript, second edi",
    "author":"marijn",
    "publish_date":"2014-07-09",
    "publisher":"no startch press",
    "numOfPages":567,
},

{
    "isbn":"456",
    "title":"advanced Javascript, second edi",
    "author":"marijn 1",
    "publish_date":"2014-07-09",
    "publisher":"no startch press",
    "numOfPages":567,
},

{
    "isbn":"789",
    "title":"concepts Javascript, second edi",
    "author":"marijn 2",
    "publish_date":"2014-07-09",
    "publisher":"no startch press",
    "numOfPages":567,
}
];

app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/book',(req,res)=>{
    res.json(books);
});
app.post('/book',(req,res)=>{
    const book=req.body;
    console.log(book);
    books.push(book);
    res.send('Book is added to the database');
});


app.get('/book/:isbn',(req,res)=>{
    const isbn=req.params.isbn;

    for(let book of books){
        if (book.isbn===isbn){
            res.json(book);
            return ;
        }
    }
    res.status(404).send('Book not found');
});

app.put('/book/:isbn',(req,res)=>{
    const isbn=req.params.isbn;
    const newBook=req.body;

    for(let i=0;i<books.length;i++){
        let book=books[i]
        if(book.isbn===isbn){
            books[i]=newBook;
        }
    }
    res.send('book is edited');
});
 app.delete('/book/:isbn',(req,res)=>{
     //reading isbn from the url
     const isbn=req.params.isbn;
     //removing items from the book array
     books=books.filter(i=>{
         if(i.isbn !==isbn){
             return true;
         }
         return false;
     });
    res.send('Book is edited');
 });


app.listen(port,()=>
console.log(`Hello world listening on port ${port}!`)
)