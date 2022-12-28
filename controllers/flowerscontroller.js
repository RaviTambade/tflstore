// CRUD OPERATIONS Againest flower collection from JSON file

var flowers=require('../data/products.json');

//HTTP callback functions

exports.getAll=function (req, res){
res.send(flowers);
};

exports.getById=function(req,res){
    var idFlower=req.params.flowerid-1;
    res.send(flowers[idFlower]);
};

exports.insert=function(req, res){
    var data=req.body;
    console.log(data);
    console.log("POST request is being processed...");
    //append this data to flowers array maintained in json file
};

exports.update=function(req,res){
    var data=req.body;
    console.log(data);
    console.log("PUT request is being processed...");
    //append this data to flowers array maintained in json file
};

exports.delete=function(req,res){
    var idFlower=req.params.flowerid-1;
    console.log("Item to deleted....." + idFlower);
    console.log("DELETE request is being processed...");
};
