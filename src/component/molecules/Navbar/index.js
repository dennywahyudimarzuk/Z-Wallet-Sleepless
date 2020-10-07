import React,{Component} from 'react'
import { jhon,icBell } from '../../../assets';
import './navbar.css';
import {Link,Redirect } from 'react-router-dom';

class Navbar extends Component {

    state = {
        data:[],
        login:false
    }


    componentDidMount()
    {
        
            var login = localStorage.getItem("login");
            if (login === 'true') {
                  var dataLogin = JSON.parse(localStorage.getItem("dataLogin")).data[0];
                  this.setState({data:dataLogin})    
            }else{
                this.setState({login:true})   
            }

    }

    render() { 
        return ( 
            <>
                {
                  this.state.login && <Redirect to='/auth'/>
                }
            

                <nav className="navbar shadow-sm navbar-dashboard">
                     <div className="container">
                        <a href="/dashboard" className="navbar-brand">Zwallet</a>

                            <section className="profile">
                                <div className="row">
                                    <div className="col-10">
                                        <div className="row">
                                            <div className="col-3">
                                                <img src={jhon} />
                                            </div>
                                            <div className="col-9">
                                                <h4 className="profile-name mt-1">&nbsp;{this.state.data.fullName?this.state.data.fullName:'' }</h4>
                                                <p className="phone-number">&nbsp;{this.state.data.phone?this.state.data.phone:''}</p>
                            
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-2 d-flex justify-content-end ">
                                        <img className="mb-2" src={icBell} />
                                        <button className="navbar-toggle btn show bg-white d-inline d-sm-none" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                                            <svg className="mb-2 " width="20" height="20" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.6665 12.8332L15.4998 6.99984L9.6665 1.1665" stroke="#3A3D42" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M15.5 7H1.5" stroke="#3A3D42" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </button>      
                                    </div>
                                </div>

                            </section>
                        
                    </div>
                
                </nav>

            </>
         );
    }
}
 
export default Navbar;

