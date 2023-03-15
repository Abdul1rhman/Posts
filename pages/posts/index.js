import { useState } from "react"
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useSession, signIn, signOut } from "next-auth/react"


function Add() {

  const { data: session } = useSession()
  

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const [media,setMedia] = useState("")
    
    
    // const [email, setEmail]=useState('')
    
    
   
    
    const handleSubmit = async (e) => {
      

        e.preventDefault();
        const mediaUrl =  await imageUpload()
        if (title && content) {
          // const email=session.user.email
          try {
            let response = await fetch("https://posts-sh.vercel.app/api/addPost", {
              method: "POST",
              body: JSON.stringify({
                title,
                content,
                // email
                mediaUrl
                
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

      const imageUpload = async ()=>{
        const data =  new FormData()
        data.append('file',media)
        data.append('upload_preset',"hmj2zedt")
        data.append('cloud_name',"dsxaegep2")
        const res = await fetch("	https://api.cloudinary.com/v1_1/dsxaegep2/image/upload",{
          method:"POST",
          body:data
        })
        const res2  = await res.json()
        return res2.url
        console.log(res2.url)
   }


        // if(!session){
        //   return (
        //    <Container>
        //     <div className="sii">
        //         <h2 >You need to signin to Post :)</h2>
        //         <Button variant="dark" onClick={signIn}>Sign in</Button>
        //     </div>
        //     </Container>
        //   )
        // }
  
    return (
      
    <div>
<Container>
  
  <Form onSubmit={handleSubmit} >
      {/* {error ? <div className="alert-error">{error}</div> : null} 
       {message ? <div className="alert-message">{message}</div> : null} */}
      {message ? <Alert variant={'primary'} >{message}</Alert> : null}
      {error ? <Alert variant={'danger'} >{error}</Alert> : null}
      
      <Form.Group style={{marginTop:'20px'}}>
        <Form.Label style={{fontWeight:'bold'}}>Title</Form.Label>
      
        <Form.Control
          type= "text"
          placeholder= "Title of the post"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </Form.Group>

      <Form.Group style={{marginTop:'20px',marginBottom:'20px'}}>
        <Form.Label style={{fontWeight:'bold'}}>Content</Form.Label>
        <Form.Control
         as="textarea"
          name= "content"
          placeholder= "Content of the post"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          cols={20}
          rows={8}
        />
      </Form.Group>
      <Form.Control type="file" 
              accept="image/*"
              onChange={(e)=>setMedia(e.target.files[0])}
            />
      
      <Form.Group style={{marginTop:'20px'}}>
        <Button variant="dark" type="submit" className="submit_btn">
          Add Post
        </Button>
      </Form.Group>
      
      
    </Form>
    
    </Container>


    </div>
  )
}

export default Add