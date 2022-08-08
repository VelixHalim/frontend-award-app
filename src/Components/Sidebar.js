import React, { useState } from 'react'
import { Filter, Menu, Star, X } from 'react-feather'
import { Link } from 'react-router-dom'
import { Row , Col, Container} from 'reactstrap'
import { SidebarData } from './SidebarData'

export default function Sidebar(props) {
  const handleFilter = props.handleFilter
  const [sidebar,setSidebar] =useState(false)
  console.log(sidebar)
  const showsidebar = ()=>{setSidebar(!sidebar)}
  return (
    <>
    <Container>
      <Row>
        <Col xs={12} md={12} sm={12}>
          <div className='navbar'>
            <Menu onClick={showsidebar}/>
            <h3>
              Awards
            </h3>
            <Filter onClick={()=>{handleFilter()}}/>
          </div>
          <nav className={sidebar?'nav-menu active':'nav-menu'}>
            <ul className='nav-menu-items' onClick={showsidebar}>
              <li className='navbar-toggle'>
                <Link to={'#'} className="menu-bars">
                  <X />
                </Link>
              </li>
              <li className='nav-text mb-2'>
                <Star size={100} color="yellow"/>  
              </li>
              <li className='nav-text '>
                <h3><b>Awards Menu</b></h3>  
              </li>
              {
                SidebarData.map((item,idx)=>{
                  return(
                    <li key={idx} className={item.cName}>
                      <Link to={item.path}>
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  )
                })
              }
            </ul>
          </nav>
        </Col>
        {/* {
          sidebar?(
            <Col xs={3} md={6} sm={6} className='close-bg' onClick={showsidebar}>
              <div className='close-bg' >

              </div>
            </Col>
          ):null
        } */}
      </Row>
      </Container>

    </>
  )
}

// <header className="header">
//           <div className='header-toggle'>
//             <Menu/>
//           </div>
//       </header>
//       <aside className='sidebar'>
//         <nav className='nav'>
//           <div>
//             <Link to={"/"} className="nav-logo">
//               <Star size={100} color="yellow" className='nav-logo-icon'/>
//               <span className='nav-logo-name'>Awards Menu</span>
//             </Link>
//             <div className='nav-list'>
//               <Link to={"/"} className="nav-logo">
//                 {/* <Star size={100} color="yellow" className='nav-logo-icon'/> */}
//                 <span className='nav-link-name'>Home</span>
//               </Link>
//               <Link to={"#"} className="nav-logo">
//                 {/* <Star size={100} color="yellow" className='nav-logo-icon'/> */}
//                 <span className='nav-link-name'>Cards</span>
//               </Link>
//               <Link to={"#"} className="nav-logo">
//                 {/* <Star size={100} color="yellow" className='nav-logo-icon'/> */}
//                 <span className='nav-link-name'>Profile</span>
//               </Link>
//               <Link to={"/"} className="nav-logo">
//                 {/* <Star size={100} color="yellow" className='nav-logo-icon'/> */}
//                 <span className='nav-link-name'>Logout</span>
//               </Link>
//             </div>
//           </div>
//         </nav>
//       </aside>

