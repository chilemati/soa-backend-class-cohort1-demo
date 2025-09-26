const express = require("express");
const app = express();
const port = 8000;

//! middleware
app.use(express.json()) // allow json data from fe

// custom middleeares

function onlyAdmin (req,res,next) {
    const {role} = req.body;
    if(role==="Admin") {
        next();
    }else{
        res.json({
            status: false,
            msg: "unauthorized user"
        })
    }
}


//!  routes
app.get("/",(req,res)=> {
    res.json({status: true, msg: "Welcome to homepage!"})
})
app.get("/todo",(req,res)=> {
    res.json({status: true, data: []})
})
app.post("/todo",(req,res)=> {
    let body = req.body;
    res.json({status: true,msg: `new todo added`, data: body})
})
app.patch("/todo",(req,res)=> {
    let body = req.body;
    res.json({status: true,msg: `todo with id of ${body.id} was updated`, data: body})
})
app.delete("/todo",(req,res)=> {
    let body = req.body;
    res.json({status: true,msg: `todo with id of ${body.id} was deleted`, data: body})
})

// blog routes
app.get("/blog",(req,res)=> {
    res.json({status: true, data: []})
})
app.post("/blog",onlyAdmin,(req,res)=> {
    let body = req.body;
    res.json({status: true,msg: `new blog added`, data: body})
})
app.delete("/blog",onlyAdmin,(req,res)=> {
    let body = req.body;
    res.json({status: true,msg: ` blog deleted`, data: body})
})


//! invalid routes

app.use((req,res,next)=> {
    
    res.status(404).json({
        status: false,
        msg: "invalid route",
        method: req.method,
        url: req.originalUrl
    })
})


//! start server
app.listen(port,()=> {
    console.log(`Listening to request on http://localhost:${port}`)
})