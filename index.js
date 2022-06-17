const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const methodOverride=require('method-override');

const app=express();
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));

// mongoose.connect('mongodb://localhost:27017/shop', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log('Mongo Connection open');
//     })
//     .catch(err => {
//         console.log(err);
//     });

mongoose.connect('mongodb+srv://admin:3KuTyVfxSxBl5Zk1@cluster0.ynhy3.mongodb.net/?retryWrites=true&w=majority/shop', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Mongo Connection open');
    })
    .catch(err => {
        console.log(err);
    });

const itemFormat= new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type:String
    },
    rating:{
        type: Number
    }
})

const Item=mongoose.model('Items', itemFormat);

app.get('/home', async (req, res)=>{
    const data=await Item.find();
    res.render("home.ejs", {data});
});
app.get('/home/create', (req, res)=>{
    res.render("create.ejs");
});


app.get("/home/:id", async (req, res)=>{
    const {id}=req.params;
    const item=await Item.findById(id);
    res.render("details.ejs", {item});
});
app.post('/home', async (req, res)=>{
    const item= await new Item(req.body);
    await item.save();
    res.redirect('/home');
});

app.delete('/home/:id', async (req, res)=>{
    const {id}=req.params;
    await Item.findByIdAndDelete(id);
    res.redirect("/home");
});

app.listen(3000,()=>{
    console.log("Listening to port 3000");
}); 