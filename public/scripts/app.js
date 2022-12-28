$(document).ready(function(){
     
    if(typeof(JSON) == 'object')
    {          
        $.ajax({
            url: '/products',
            type: 'GET',
            contentType: 'application/json',
            success: function(result)
                    {
                        var rows = '';
                        for (index = 0; index < result.length; index++) {
                            var data =  result[index];
                            rows = rows  + '<tr>' + '<td>'+ data.id + '</td>' + '<td>'+ data.title + '</td>'   + '<td>' + '<input type="button"  id="'+data.id+'" value="CLICK ME" onclick= "onSelect(this.id)"/>'   +'</td>' +'</tr>' + '<tr>' + '<td> <img src="'+ data.imageurl + '" width="100" height="100"/></td>'   +'</tr>';
                        } 
                        $('#myTable').append(rows);
                    },
            error: function(err)
                    {
                        console.log('Something wrong!');
                    }
        });
    }
    else
    {
        console.log('Problem with JSON object data');
    }

});


function onSelect (btnId){

console.log("button select..." + btnId);
sessionStorage.setItem("productIdSelected",btnId);
window.location.href = '/details.html';
return false;
}
