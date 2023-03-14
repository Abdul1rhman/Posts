import { useState } from "react"
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useSession, signIn, signOut } from "next-auth/react"

import React from 'react';
import ImageUploading from 'react-images-uploading';


function Add() {

  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const { data: session } = useSession()
  

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    
    
    // const [email, setEmail]=useState('')

    const onChange = (imageList, addUpdateIndex) => {
      // data for submit
      console.log(imageList, addUpdateIndex);
      setImages(imageList);
    };
    
    
   
    
    const handleSubmit = async (e) => {
      

        e.preventDefault();
        if (title && content) {
          const email=session.user.email
          try {
            let response = await fetch("https://posts-sh.vercel.app/api/addPost", {
              method: "POST",
              body: JSON.stringify({
                title,
                content,
                email,
                images
                
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


        if(!session){
          return (
           <Container>
            <div className="sii">
                <h2 >You need to signin to Post :)</h2>
                <Button variant="dark" onClick={signIn}>Sign in</Button>
            </div>
            </Container>
          )
        }
  
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

      <Form.Group style={{marginTop:'20px'}}>
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
      
      <Form.Group style={{marginTop:'20px'}}>
        <Button variant="dark" type="submit" className="submit_btn">
          Add Post
        </Button>
      </Form.Group>
    </Form>

    <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
          
        }) => (
          
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
                
              </div>
            ))}
          </div>
        )}
        
      </ImageUploading>
      
    
    </Container>


    </div>
  )
}

export default Add