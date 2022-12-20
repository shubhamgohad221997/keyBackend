const express = require("express")
const mongoose = require("mongoose")
const user = require("../Models/user.model")
const cors = require("cors")
const connect = require("../Connect/Connect")
const req = require("express/lib/request")
const PORT = process.env.PORT || 8080
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






app.listen(PORT, async () => {
    await connect()
    console.log(`Database Connected and app listening on port ${PORT}`)
})