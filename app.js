const express=require("express");
const body=require("body-parser");
 https=require("https");
const app=express();
const mongoose=require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/todolistDB",{useNewUrlParser:true});

app.use(body.urlencoded({extended:true}));

app.set('view engine', 'ejs');
app.use(express.static("public"));

//creting schema for data base
const itemSchema={
  name:String
};
const list=mongoose.model("item",itemSchema);
const item1=new list({name:"Learning JAVAFx"});
const item2=new list({name:"Making project web page"});
const item3=new list({name:"Practising mongoose"});

const defaultitems=[item1,item2,item3];

//adding item to collection


app.get("/",function(req,res){
    async function getlistitems() {
        // Inside getUser, we can await an async operation and interact with
        // foundUser as a normal, non-promise value...
        const foundlist = await list.find({});
        if(foundlist.length==0){
    
            list.insertMany(defaultitems);
            }
            var datetime = new Date();
        res.render("lists",{kindofday:datetime, newitemlist:foundlist});
    }
    getlistitems();
   
});

app.post("/",function(req,res){
    const item=new list({
        name:req.body.item
    });
    
    item.save();

    res.redirect("/");
});

app.post("/delete",function(req,res){
   const checkboxid=req.body.checkbox;

   async function dele(){
    list.findOneAndRemove(checkboxid);
 }
 dele();

});






app.listen(3000,function(){
    console.log("Server is running on port 3000");
});
