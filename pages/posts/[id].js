import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function Postdet({post}) {
  const [title, settTitle]=useState(post.title)
   const [content, setContent] = useState(post.content);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (title && content) {
        try {
          let response = await fetch(`https://posts-sh.vercel.app/api/${post._id}`, {
            method: "PUT",
            body: JSON.stringify({
              title,
              content,
            }),
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
          });
          response = await response.json();
          setTitle("");
          setContent("");
          setError("");
          setMessage("Post added successfully");
        } catch (errorMessage) {
          setError(errorMessage);
        }
      } else {
        return setError("All fields are required");
      }
    };


  return (
    <div>
    
    
    <Container>
    <h1>Edit your Post</h1>
   <Form onSubmit={handleSubmit}>
   
    <Form.Group style={{marginTop:'20px'}}>
    <Form.Label style={{fontWeight:'bold'}}>Title</Form.Label>

      <Form.Control type="text"  value={title} onChange={e=>{settTitle(e.target.value)}}/>
    </Form.Group>
    
    <Form.Group style={{marginTop:'20px'}}>
    <Form.Label style={{fontWeight:'bold'}}>Content</Form.Label>

      <Form.Control type="text"  value={content} onChange={e=>{setContent(e.target.value)}}/>
     </Form.Group>
      <button className="btn btn-primary" style={{marginTop:'20px'}}>update</button>
   </Form>
   </Container>
    
    </div>
  )
}

export default Postdet

export async function getServerSideProps(context) {
const {params}=context


  try {
    let response = await fetch(`https://posts-sh.vercel.app/api/${params.id}`);
    let post = await response.json();

    return {
      props: { post: JSON.parse(JSON.stringify(post)) },
    };
  } catch (e) {
    console.error(e);
  }
}