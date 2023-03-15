import clientPromise from "../../lib/mongodb";
import item from '../../models/item'
export default async (req, res )=>{
try{

// const client = await clientPromise
// const db = await client.db("item")
// const { title, content,image} = req.body;
// let today = new Date();
// // let hour = today.getHours();





// const item = await db.collection("item").insertOne({
//     title,
//     content,
//     image
//   });
//   res.json(item);

const user = await item.create(req.body)
        res.status(201).json({ success: true, data: user })





}catch(e){
    console.error(e);
    throw new Error(e).message;
}


}