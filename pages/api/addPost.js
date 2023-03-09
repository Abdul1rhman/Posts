import clientPromise from "../../lib/mongodb";

export default async (req, res )=>{
try{

const client = await clientPromise
const db = await client.db("posts")
const { title, content } = req.body;
let today = new Date();
// let hour = today.getHours();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
const yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;

const time = new Date();
const hour= time.toLocaleString('en-sa', { hour: 'numeric', minute: 'numeric', hour12: true })




const post = await db.collection("posts").insertOne({
    title,
    content,
    today,
    hour
  });
  res.json(post);





}catch(e){
    console.error(e);
    throw new Error(e).message;
}


}