
import 'bootstrap/dist/css/bootstrap.min.css';
import { SessionProvider } from "next-auth/react"

import '../styles/main.css'
import Nav from '../components/Nav'
export default function App({ session,Component, pageProps }) {
  return (
  
  
  <>
  <SessionProvider session={session}>
  <Nav/>
  <Component {...pageProps} />
  </SessionProvider>
  </>
  
  )
}
