import {useState} from 'react';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaRegEdit } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';



function Index({posts}) {
const [error, setError]=useState('')
  const handelDelete= async (id) => {

    try {
      let response = await fetch(`http://localhost:3000/api/${id}`, {
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


  return (
    <div className='home-cont'>
      <Container>
      <h1 className='home-head'>Recent Time Line</h1>

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
    
  }):<h1>there is no posts ??</h1>
}
      </Container>
      

    </div>
  )
}

export default Index

export async function getServerSideProps() {

  try {
    let response = await fetch('/api/getPosts');
    let posts = await response.json();

    return {
      props: { posts: JSON.parse(JSON.stringify(posts)) },
    };
  } catch (e) {
    console.error(e);
  }
}



