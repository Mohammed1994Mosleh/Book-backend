'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');
const mongoose = require('mongoose');

const PORT = process.env.PORT;
const server = express();
server.use(cors());
server.use(express.json());
mongoose.connect('mongodb://localhost:27017/Books', { useNewUrlParser: true, useUnifiedTopology: true });


const Book = new mongoose.Schema({
    title: String,
    description:String,
    email :String
});

const booKModel = mongoose.model('Books', Book);

function bookCollection() {
    const moHammed = new booKModel({
        title:'Pawns in the Game' ,
        description:'Here is a true story of international intrigue, romances, corruption, graft, and political assassinations, the like of which has never been written before',
        email :"mohammed1994mosleh@gmail.com"
    })

    const ali = new booKModel({
        title: 'Industrial instrumentation',
       description:'sensor types and transducer',
       email :"Ali1994mosleh@gmail.com"
    })

    const ahmed = new booKModel({
        title: 'power system analysis',
        description:'power sysytem analysis and types',
        email :"Ahmed1994mosleh@gmail.com"
    })
    moHammed.save();
    ali.save();
    ahmed.save();
}
bookCollection(); 

server.get('/test', testHandler);
server.get('/books',bookHandler);
server.post('/books1',Addnewbook);
server.delete('/deleteBook/:booKid',deleteBook);
server.put('/updateBook/:bookId',UpdateHandler);

// deleteBook/${booKid}

//localhost:/books?bookName=bookName
function bookHandler(req,res){
    let bookName1=req.query.bookName;

console.log(bookName1);
    booKModel.find({email:bookName1},function(err,nameData){

        if(err) {
            console.log(err)
        } else{

            res.send(nameData)
        }
        
    })

}

async function Addnewbook(req,res){
    console.log('hi');
    let { title, description, email } = req.body;
    console.log(req.body);

    await booKModel.create({title,description,email});

    booKModel.find({email:email},function(err,updatedData){
        if(err){
            console.log('error in getting the data');
        }else {
            console.log(updatedData);
            res.send(updatedData)
        }
    }
    )

}

async function deleteBook(req,res){
console.log('hi');
    
    let bookDataID = req.params.booKid;
    let email= req.query.email;

    console.log(email);
    
    console.log(bookDataID);
    booKModel.remove({_id:bookDataID},(error,bookdata)=>{
   
   if(error){
    console.log('error in deleteing the data')

   }
   
        else{
    booKModel.find({email},function(err,upDateddata){
    if(err){
        console.log('error in getting the data')

    }else{
        console.log(upDateddata);
        res.send(upDateddata);
    }


    })

   }
})
}

async function UpdateHandler(req,res){
    let {email,title,description,id}=req.body;
    let objID = req.params.bookId;
    // console.log(req.body);
    booKModel.findOne({_id:objID},(error,bookData)=>{

        bookData.title=title;
        bookData.description=description;
        bookData.save()
        .then(()=>{
          booKModel.find({email:email},function(err,updatedData){
            if(err){
                console.log('error in getting the data');
            }else{
            console.log(updatedData);
            res.send(updatedData);
            }

          })



        }).catch(error=>{
            console.log('error in saving ')
        })




    })


}


function testHandler(req, res) {
    res.send('all good')
}



server.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`)
})














// seedDataCollection(); // npm start