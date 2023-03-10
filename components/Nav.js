import React from "react";
import Link from "next/link";
import Container from 'react-bootstrap/Container';

export default function Nav() {
  return (
    <nav>
      <Container>
      <div className="nav-cont">
        <h2><Link href='/' style={{textDecoration:'none',color:'#ffffff'}}>Posts </Link></h2>

        <ul>
          <li><Link href='/posts' >Add Post </Link></li>
        </ul>
      </div>
      

      </Container>
    </nav>
  );
}