import {useState} from 'react';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaRegEdit } from 'react-icons/fa';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { BsPatchPlus } from 'react-icons/bs';
import ImageUploading from 'react-images-uploading';



function Index({posts}) {

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


  return (
    
      <Container>
      <div className='home-cont'> 
      <h1 className='home-head'>Recent Time Line</h1>

    {posts.length >0?
      posts.map(item=>{
        
        return(
          <div className='post-cont' key={item._id}>
            <div className='card-post'>
               <h2>{item.title}</h2>
               <p>{item.content}</p>
              
              { item.mediaUrl&&<div className='img-cont'>
                { item.mediaUrl&& <img src={item.mediaUrl} style={{width:'300px',borderRadius:'10px',}}/>}
              </div>}
              

               
               
           
                <div className='but'>
              
               
                </div>
                <div className="text-muted mt-4 time">
                date: {item.today}
                
                
                </div>  
                <div className='time-icon' style={{ color:'black',display:'flex', justifyContent:'end',alignItems:'center', gap:'10px',fontSize:'20px'}}>
                {/* <Link className="" style={{textDecoration:'none', color:'black',display:'flex', justifyContent:'end',alignItems:'center'}} href={`/posts/${item._id}`}><FaRegEdit/></Link> */}
                {/* <div style={{cursor:'pointer',display:'flex', justifyContent:'end',alignItems:'center',color:'red'}} className="  " onClick={e=>{handelDelete(item._id)}}><AiOutlineDelete/></div> */}
                </div>  
                

            </div>
            
          </div>
    )
    
  }):<h1 style={{textAlign:'center', paddingBottom:'200px',marginTop:'200px',}}>there is no posts &#128542;??</h1>
  
}      
        <Link className='add-post-but' style={{textDecoration:'none',color:'white'}} href="/posts"><BsPatchPlus style={{fontSize:'40px'}}/></Link>

      </div>

      
      </Container>
      
      

    
  )
}

export default Index

export async function getServerSideProps() {

  try {
    let response = await fetch('https://posts-sh.vercel.app/api/getPosts');
    let posts = await response.json();

    return {
      props: { posts: JSON.parse(JSON.stringify(posts)) },
    };
  } catch (e) {
    console.error(e);
  }
}



