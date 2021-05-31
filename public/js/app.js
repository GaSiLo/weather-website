console.log('client side javascript file is loaded ')


//fetch is nnot type of javascript it is 
//a browser side 
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//   response.json().then((data)=>{
// console.log(data)
//   })  
// })
//here we use then(promises) to callback function to retur something

//we were able to fecth data from url and parse it to into 
//javascript object
// fetch('http://localhost:3000/weather?address=!').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)
//         }else{
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })
const weatherForm = document.querySelector('form')
const search=document.querySelector('input')
const messageone=document.querySelector('#message-1')
const messagetwo=document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
  const location=search.value

messageone.textContent='Loading...'
messagetwo.textContent= ''
  fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
        //    console.log(data.error)
    messageone.textContent=data.error    
    }else{
        
         //   console.log(data.location)
           // console.log(data.forecast)
        messageone.textContent=data.location
        messagetwo.textContent=data.forecast
        }
    })
})
  //console.log(location)
})