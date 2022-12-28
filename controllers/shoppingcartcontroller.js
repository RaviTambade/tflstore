// CRUD OPERATIONS Against session variable shoppingcart

exports.get= function(req, res){
    res.send(req.session.views.shoppingCart);
};

exports.getById= function(req, res){
   var itemId=req.params.itemdid;    
   // get product id
   var productId = itemId;
   var theItem;
   // iterate over each element in the array
   for (var i = 0; i < theShoppingCart.length; i++){
      // look for the entry with a matching `id` value
      if (req.session.views.shoppingCart[i].id == productId){
         // we found it , now hold it in theItem
         theItem=req.session.views.shoppingCart[i];
      }
   }
   console.log(req.session.views.shoppingCart);
   res.send(theItem);
};
 
exports.post=function(req, res){
    var data=req.body;
    req.session.views.shoppingCart.push(data);
    res.send("added");
};
 
exports.put=function (req, res){
       var itemId=req.params.itemdid;
       var data=req.body;
       
       // get product id to be updated
       var productId = data.id;
    
       // iterate over each element in the array
       for (var i = 0; i < theShoppingCart.length; i++){
          // look for the entry with a matching `id` value
          if (req.session.views.shoppingCart[i].id == productId){
             // we found it , now update with new data
             req.session.views.shoppingCart[i]=data;
          }
       }
       console.log(req.session.views.shoppingCart);
       res.send("item is updated into ShoppingCart...");
};
 
exports.delete=function (req, res){
    // get product id to be deleted
    var itemId=req.params.itemdid;
    var productId = 8;
   
    // iterate over each element in the session ShoppingCart
    for (var i = 0; i < req.session.views.shoppingCart.length; i++){
       // look for the entry with a matching `id` value
       if (req.session.views.shoppingCart[i].id == productId){
          // we found it
          req.session.views.shoppingCart.splice(i,1);
       }
    }
    console.log(req.session.views.shoppingCart);
    res.send("item  is removed from session shoppingcart" + itemId);
};