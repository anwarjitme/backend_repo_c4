const express=require("express")
const {PostModel}=require("../model/postModel")
const postRouter=express.Router()

postRouter.get("/",async(req,res)=>{
          const device=req.query.device
          const device1 = req.query.device;
          const device2 = req.query.device;
try{
          if(device1&&device2){
const posts = await PostModel.find({$and:[{device:device1},{device:device2}] });
res.send(posts).status(200);
          }else if(device){
         const posts = await PostModel.find({device:device});
         res.send(posts).status(200);           
          }else{
              const posts = await PostModel.find();
              res.send(posts).status(200);         
          }

}catch(err){
console.log({"error":`${err}`})
}
})
postRouter.get("/top", async (req, res) => {
 
  try {
  
  } catch (err) {
    console.log({ error: `${err}` });
  }
});
postRouter.post("/add", async (req, res) => {
          const data=req.body
  try {
    const new_one = new PostModel(data);
   await new_one.save()
    res.send("new data added successfully")
  } catch (err) {
    console.log({ error: `${err}` });
  }
});
postRouter.patch("/update/:id", async (req, res) => {
  const data = req.body;
  const id=req.params.id
  
  try {

   await PostModel.findByIdAndUpdate({"_id":id},data)
    res.send(" data updated successfully");
  } catch (err) {
    console.log({ error: `${err}` });
  }
});
postRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await PostModel.findByIdAndDelete({ "_id": id });
    res.send(" data deleted successfully");
  } catch (err) {
    console.log({ error: `${err}` });
  }
});







module.exports={
          postRouter
}
