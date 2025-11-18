const fs = require('fs');
const path = require('path');

// Load JSON data file
const filePath = path.join(__dirname, '../data/products.json');
let flowers = require('../data/products.json');  

// Helper function to save JSON back to file
function saveToFile() {
    fs.writeFileSync(filePath, JSON.stringify(flowers, null, 2));
}

//HTTP callback functions

exports.getAll=function (req, res){
    res.status(200).send(flowers);
};

exports.getById=function(req,res){
    const id = parseInt(req.params.flowerid);

    const flower = flowers.find(f => f.id === id);
    if (!flower) {
        return res.status(404).send({ message: "Flower not found" });
    }

    res.status(200).send(flower);
};

exports.insert=function(req, res){
    const data = req.body;
    console.log("POST - inserting flower:", data);
    flowers.push(data);
    saveToFile();
    res.status(201).send({ message: "Flower added", data });
};

exports.update=function(req,res){
    const id = parseInt(req.params.flowerid);
    const updatedData = req.body;
    console.log("PUT - updating flower:", updatedData);
    const index = flowers.findIndex(f => f.id === id);
    if (index === -1) {
        return res.status(404).send({ message: "Flower not found" });
    }

    // Update fields
    flowers[index] = { ...flowers[index], ...updatedData };
    saveToFile();

    res.status(200).send({ message: "Flower updated", data: flowers[index] });
};

exports.delete=function(req,res){
    const id = parseInt(req.params.flowerid);

    const index = flowers.findIndex(f => f.id === id);
    if (index === -1) {
        return res.status(404).send({ message: "Flower not found" });
    }

    const removed = flowers.splice(index, 1);
    saveToFile();

    res.status(200).send({ message: "Flower deleted", removed });
};