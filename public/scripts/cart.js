$(document).ready(function(){
  
  let itemId= sessionStorage.getItem("productIdSelected");
 
  console.log(itemId);
  $("#txtid").val(itemId);
  $("#txtquantity").val("0");
 
   if(typeof(JSON) == 'object')
   {
       $.ajax({
           url: '/cart',
           type: 'GET',
           contentType: 'application/json',
           success: function(result)
                   {
                          var data =  result;
                          console.log ( JSON.stringify(data));
                          let output= data.id +","+ data.quntity;
                          for (index = 0; index < data.length; index++) {
                                               $("#cartlist").append($("<li>").text(data[index].id +" " +data[index].quantity ));
                        }

                   } ,
           error: function(err)
                   {
                       debugger;
                       console.log ('Something wrong!');
                   }
       });
   }
   else
   {
       alert('Something went wrong');
   }

});



var addToCart = function () {
  var pid = document.getElementById("txtid").value;
  var pquantity = document.getElementById("txtquantity").value;
  var item = {
    "id": pid,
    "quantity": pquantity,
  };
 
  $.ajax({
        url: '/cart',
        type: 'POST',
        data: JSON.stringify(item),
        contentType: 'application/json',
        success: function(result)
            {
                  console.log("added to session remotely");
          },
    error: function(err)
            {
               
                console.log (err);
            }
});

};

var removeFromCart = function () {
  var pname = document.getElementById("txtid").value;
  var pquant = document.getElementById("txtquantity").value;
 
 
};

