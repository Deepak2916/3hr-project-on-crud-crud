let ul=document.getElementById("ulExpense")
let form=document.getElementById("formId")
form.addEventListener('submit', addItem);
ul.addEventListener('click', removeItem);

let userId={}
let editId=0

function displayData(newItem,newItem2,newItem3){

  var li = document.createElement('li');
     var spam1=document.createElement('spam')
     spam1.appendChild(document.createTextNode(newItem))
     var spam2=document.createElement('spam')
     spam2.appendChild(document.createTextNode(newItem2))
     var spam3=document.createElement('spam')
     spam3.appendChild(document.createTextNode(newItem3))
     li.className = 'list-group-item';
     li.appendChild(spam1);
     li.appendChild(spam2)
     li.appendChild(spam3)
     var edit = document.createElement('button')
   
     var deleteBtn = document.createElement('button');
   
  edit.className="editbtn edit"
  deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
   
   edit.appendChild(document.createTextNode("edit expense"))
     deleteBtn.appendChild(document.createTextNode('delet expense'));
   
   
   li.appendChild(edit)
   li.appendChild(deleteBtn);
  ul.appendChild(li);

}
function addItem(e){
     e.preventDefault();
     var newItem3=document.getElementById("select").value
   
     var newItem = document.getElementById("amount").value;
     var newItem2=document.getElementById("description").value
    displayData(newItem,newItem2,newItem3)
     let obj={"amount":newItem,
   "description":newItem2,
   "select":newItem3
  }
  if(editId==0){
   axios.post(`https://crudcrud.com/api/d3948c125f454988aaaa33b68d7acd4e/myData`,obj)
   .then(res=>console.log(res))
   .catch(err=>console.log(err))
  }
  else{
    axios.put(`https://crudcrud.com/api/d3948c125f454988aaaa33b68d7acd4e/myData/${editId}`,obj)
   .then(res=>console.log(res))
   .catch(err=>console.log(err))
   editId=0
  }
  
    
   }

   window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/d3948c125f454988aaaa33b68d7acd4e/myData")
         .then((res)=> {
              // console.log(res)
              for(var i=0;i<res.data.length;i++){
                let amount=res.data[i]["amount"]
                let description=res.data[i]["description"]
                let select=res.data[i]["select"]
                   displayData(amount,description,select)
                   userId[amount]=res.data[i]["_id"]
              }
         })
         .catch((err)=>console.log(err))
})
   
   function removeItem(e){
        var li = e.target.parentElement;
        let n=li.children[0].textContent 
     if(e.target.classList.contains('edit')){
        let e=li.children[1].textContent
        let m=li.children[2].textContent
        console.log(n,e,m)
        document.getElementById("select").value=m
        document.getElementById("amount").value=n
        document.getElementById("description").value=e
        ul.removeChild(li);
        editId=userId[n]
     }
     else if(e.target.classList.contains('delete')){
       if(confirm('Are You Sure?')){
        let id=userId[n]
        axios.delete(`https://crudcrud.com/api/d3948c125f454988aaaa33b68d7acd4e/myData/${id}`)
        .then( (res)=>{
          for(var i=0;i<res.data.length;i++){
          let amount=res.data[i]["amount"]
        let description=res.data[i]["description"]
        let select=res.data[i]["select"]
           displayData(amount,description,select)}
          })
        .catch(err=>console.log(err))
         ul.removeChild(li);
       }
     }
   }
