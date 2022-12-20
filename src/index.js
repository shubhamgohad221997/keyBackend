const express = require("express")
const mongoose = require("mongoose")
const user = require("../Models/user.model")
const cors = require("cors")
const connect = require("../Connect/Connect")
const req = require("express/lib/request")
const PORT = process.env.PORT || 8000
mongoose.set('strictQuery', true)



const app = express()

app.use(express.json())

app.use(cors())

app.get("/",async(req,res)=>{
     try {
         let data=await user.find()
         res.send({data:data})
        
     } catch (error) {
        res.status(501).send(error.message)
     }
})




function makerandom(length){
      let res=''
      let characters='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      let n=characters.length
      for(let i=0;i<length;i++){
        res+=characters.charAt(Math.floor(Math.random()*n))
      }

      console.log(res)
      return res
}





app.post("/user",async(req,res)=>{
         let score=0
        const user2={...req.body,score}
      try {
          let data=await user.create(user2)
          res.send({message:`user created successfully you choose  ${user2.level} level` ,data:data})
        
      } catch (error) {
           res.status(401).send(error.message)
      }

     

})

app.get('/random',async(req,res)=>{
     
    try {
        let data=await user.find().sort({_id:-1}).limit(1)
         console.log("l",data[0].level)
           if(data[0].level=="low"){
                 let a=Math.floor(Math.random()*5)+1
                let ran=makerandom(a)
               res.send({word:ran})
           }
           if(data[0].level=="high"){
            let a=Math.floor(Math.random()*15)+9
                 let ran=makerandom(a)
                 res.send({word:ran})
           }
          if(data[0].level=='medium'){
            let a=Math.floor(Math.random()*10)+5
                  let ran=makerandom(a)
                  res.send({word:ran})
           }
 
          
    } catch (error) {
         res.status(501).send(error.message)
    }
 
 })


 app.post("/score",async(req,res)=>{
       try {
                let {name,score}=req.body
                let filter={name:name}

                let userscore=await user.find(filter).limit(1)
                console.log(userscore)
               let s2=userscore[0].score+=score
         


                let update={score:s2}
                let data2=await user.findOneAndUpdate(filter,update,{
                new:true
             })

             res.send({message:"data updated successfully",data:data2})
       } catch (error) {
        
       }
 })


// app.post("/list",async(req,res)=>{
     
//     const date = new Date();

//     let day = date.getDate();
//     let month = date.getMonth() + 1;
//     let year = date.getFullYear();
   
//     let postedAt = `${day}-${month}-${year}`
//       console.log(typeof(postedAt))
//     let list = {...req.body,postedAt}
//     console.log(list)
//     try {
//        const data = await List.create(list)
//        res.send({message:"Data added successfully",data:data})
//     } catch (error) {
//         res.status(501).send(error.message)
//     }
      
    
    
// })





// app.get("/list",async(req,res)=>{
     
//     const {page=1,limit=10,sort='asc',filter}=req.query
//     if(filter){
//         console.log(filter)
//         try {
//              let data=await List.find({role:filter}).sort({['postedAt']: sort==='asc' ? 1 : -1}).skip((page-1)*limit).limit(10)
//              res.send({data:data})
//         } catch (error) {
//             res.status(501).send(error.message)
//         }
//     }
//     else{

//         try {
//             const data=await List.find({})
//             .sort({['postedAt']: sort==='asc' ? 1 : -1})
//             .skip((page-1)*limit)
//             .limit(limit)
    
//             res.send({data:data})
//         } catch (error) {
//             res.status(501).send(error.message)
//         }
//     }
// })





app.listen(PORT, async () => {
    await connect()
    console.log(`Database Connected and app listening on port ${PORT}`)
})