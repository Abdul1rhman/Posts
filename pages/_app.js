
import 'bootstrap/dist/css/bootstrap.min.css';

import '../styles/main.css'
import Nav from '../components/Nav'
export default function App({ session,Component, pageProps }) {
  return (
  
  
  <>
  
  <Nav/>
  <Component {...pageProps} />
  
  </>
  
  )
}
