const express = require("express");
const date = require(__dirname + "/date.js");

const app = express();

let items=[];
let workItems=[];

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.set("view engine","ejs");

app.get("/",function(req,res){
    
    const day = date.getDate();
        
    res.render("list",{typeOfList:day, newListItems: items});

});


app.post("/",function(req,res){

    if (req.body.list === "Work"){
        workItems.push(req.body.item);
        res.redirect("/work");
    } else {
        items.push(req.body.item);
        res.redirect("/");
    }
});

app.get("/work", function(req,res){
    res.render("list",{typeOfList:"Work List", newListItems: workItems});
});

app.get("/about",function(req,res){
    res.render("about");
});

app.listen(3000,function(){
    console.log("Server is working.");
});