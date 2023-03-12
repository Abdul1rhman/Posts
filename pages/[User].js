import {useState} from 'react';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaRegEdit } from 'react-icons/fa';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { BsPatchPlus } from 'react-icons/bs';
import { useSession } from "next-auth/react";



function User({posts}) {
  const { data: session } = useSession()

const [error, setError]=useState('')
  const handelDelete= async (id) => {

    try {
      let response = await fetch(`https://posts-sh.vercel.app/api/${id}`, {
        method: "DELETE",
        // headers: {
        //   Accept:
        //   "Content-Type": "application/json",
        // },
      });
      response = await response.json();
      
      setMessage("Post DELETED successfully");
    } catch (errorMessage) {
      setError(errorMessage);
    }

  }

  if(!session){
    return (
     <Container>
      <div className="sii">
          <h2 >You need to signin to Post :)</h2>
          <Button variant="dark" onClick={() => signIn()}>Sign in</Button>
      </div>
      </Container>
    )
  }


  return (
    
      <Container>

      <div className='acc'>
      <div className='acc-img'>
      {session&&<img src={session.user.image} style={{width:'100px', marginRight:'10px',borderRadius:'20px'}} />}
      {session&& <p>{session.user.name}</p>}
      {session&& <p className='em'>{session.user.email}</p>}
      </div>
      

      <div className='acc-info'>
      
        <p>Posts: {posts.length}</p>
      </div>
      </div>
      <div className='home-cont'> 
      <h3 style={{padding:'10px'}}>Your Posts:</h3>

    {posts.length >0?
      posts.map(item=>{
        return(
          <div className='post-cont' key={item._id}>
            <div className='card'>
               <h2>{item.title}</h2>
               <p>{item.content}</p>
               <p></p>
               
                <div className='but'>
              
                
                </div>
                <Card.Footer className="text-muted mt-4 time">
                date: {item.today}- hour: {item.hour} 
                <div style={{ color:'black',display:'flex', justifyContent:'end',alignItems:'center', gap:'10px',fontSize:'20px'}}>
                <Link className="" style={{textDecoration:'none', color:'black',display:'flex', justifyContent:'end',alignItems:'center'}} href={`/posts/${item._id}`}><FaRegEdit/></Link>
                <div style={{cursor:'pointer',display:'flex', justifyContent:'end',alignItems:'center',color:'red'}} className="  " onClick={e=>{handelDelete(item._id)}}><AiOutlineDelete/></div>
                </div>
                
                </Card.Footer>  
                

            </div>
            
          </div>
    )
    
  }):<h1 style={{textAlign:'center', paddingBottom:'200px',marginTop:'200px',}}>there is no posts &#128542;??</h1>
}      

      </div>
      </Container>
      
      

    
  )
}

export default User

export async function getServerSideProps(context) {
  const {params}=context
  try {
    let response = await fetch(`https://posts-sh.vercel.app/api/users/${params.User}`);
    let posts = await response.json();

    return {
      props: { posts: JSON.parse(JSON.stringify(posts)) },
    };
  } catch (e) {
    console.error(e);
  }
}



