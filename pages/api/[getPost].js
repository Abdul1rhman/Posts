import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";


export default async (req, res) => {
  if(req.method ==='GET' ){
    try {
      const client = await clientPromise;
      const db = client.db("posts");
      const { getPost } = req.query;
  
      const post = await db.collection("posts").findOne({
        _id: ObjectId(getPost), 
      });
  
      res.json(post);
    } catch (e) {
      console.error(e);
      throw new Error(e).message;
    }
  }

  else if(req.method === 'PUT'){
    try {
      const client = await clientPromise;
      const db = client.db("posts");
      const { getPost } = req.query;
      const { title, content } = req.body;
  
      const post = await db.collection("posts").updateOne(
        {
          _id: ObjectId(getPost),
        },
        {
          $set: {
            title: title,
            content: content,
          },
        }
      );
  
      res.json(post);
    } catch (e) {
      console.error(e);
      throw new Error(e).message;
    }
  }

  else if(req.method === 'DELETE'){
    try {
      const client = await clientPromise;
      const db = client.db("posts");
      const { getPost } = req.query;
      // const { title, content } = req.body;
  
      const post = await db.collection("posts").deleteOne({
        _id: ObjectId(getPost),
      });
  
      res.json(post);
    } catch (e) {
      console.error(e);
      throw new Error(e).message;
    }
  }
  
};