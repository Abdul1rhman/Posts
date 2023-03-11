import React from "react";
import Link from "next/link";
import Container from 'react-bootstrap/Container';
import { signIn, signOut,useSession } from "next-auth/react";

export default function Nav() {
  const { data: session } = useSession()
  return (
    <nav>
      <Container>
      <div className="nav-cont">
        <h2><Link href='/' style={{textDecoration:'none',color:'#ffffff'}}>Posts </Link></h2>

        <ul>
          {/* <li><Link href='/posts' >Add Post </Link></li> */}
          {session&&<img src={session.user.image} style={{width:'35px', marginRight:'10px',borderRadius:'10px'}} />}
          {session&& <Link href={`/${session.user.email}`} style={{textDecoration:'none',color:'#ffffff',marginRight:'10px' }}>Your Posts</Link>}

          { session && <li onClick={signOut}>Log Out</li>}
          { !session && <li onClick={signIn}>Signin</li>}
        </ul>
      </div>
      

      </Container>
    </nav>
  );
}