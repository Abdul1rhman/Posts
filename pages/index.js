import {useState} from 'react';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaRegEdit } from 'react-icons/fa';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { BsPatchPlus } from 'react-icons/bs';



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
               <p></p>
               
                <div className='but'>
              
               
                </div>
                <div className="text-muted mt-4 time">
                date: {item.today}
                
                
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



