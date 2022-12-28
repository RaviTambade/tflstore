$(document).ready(function(){
  
    let btnId= sessionStorage.getItem("productIdSelected");
     if(typeof(JSON) == 'object')
     {
         $.ajax({
             url: '/products/'+btnId,
             type: 'GET',
             contentType: 'application/json',
             success: function(result)
                     {
                            var data =  result;
                            console.log ( JSON.stringify(data));
                            let output= data.id +","+ data.title;
                         
                            // data Binding
                            
                            $('#pId').text(data.id);
                            $('#pTitle').text(data.title);
                            $('#pDescription').text(data.description);
                            $('#pUnitprice').text(data.unitprice);
                            $("#imgProduct").attr("src",data.imageurl);
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
         alert('Chacha pls upgrade!');
     }
 
 });
 
 