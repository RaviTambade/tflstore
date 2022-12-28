// import dependency module
var express=require('express');
var session =require('express-session');
var parseurl=require('parseurl');
var path=require('path');
var bodyParser=require('body-parser');

const app=express();
//configure HTTP pipeline 

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Session Memory Configuration
var sessionOptions={
   secret:"secret",
   resave:true,
   saveUninitialized:false
};
app.use(session(sessionOptions));

//Configure Interceptor for session Management
app.use(function(req, res,next){
   // define session variables
   if (!req.session.views) {
      req.session.views = {};
      req.session.views.shoppingCart=[];
   }

   var pathname=parseurl(req).pathname;
   // count the views
   req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;
   next();
})

var routes=require("./router");
routes(app);

var staticFolder=express.static(path.join(__dirname,"public"));
app.use(staticFolder);

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(8000);
console.log("ShoppingCart Web App is listening on port 8000");