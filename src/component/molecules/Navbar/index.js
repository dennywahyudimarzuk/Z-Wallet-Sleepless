import React,{useEffect, useState} from 'react'
import {icBell } from '../../../assets';
import './navbar.css';
import axios from 'axios';
import qs from 'qs';
import {Redirect } from 'react-router-dom';
import {useDispatch} from 'react-redux';

 const Navbar = () => {

    const [login,setLogin] = useState(false);
    const [dataUser,setDataUser] = useState({});
    const dispacth = useDispatch();

    useEffect(() => {
            var login = localStorage.getItem("login");
            var dataToken = JSON.parse(localStorage.getItem("token"));

            if(!login)
            {
                setLogin(true)
            }

            dataApi(dataToken);
    },[])
    
    const dataApi = (token) => {
        
        const headers = { headers: {'Authorization': `Bearer ${token.accessToken}`}}  
        let data = qs.stringify({token:token.accessToken});
        axios.post(`${process.env.REACT_APP_API}/profile/token`,data,headers)
        .then(res =>{
            // console.log('hasil dari axios',res.data)
            setDataUser(res.data.data[0])
            dispacth({type:'SET_DATA',value:res.data.data[0]});

        }).catch(err => {
            console.error(err)
        });
    }
  return (
    <>
                {
                  login && <Redirect to='/auth'/>
                }
            

                <nav className="navbar shadow-sm navbar-dashboard">
                     <div className="container">
                        <a href="/dashboard" className="navbar-brand" >Zwallet</a>

                            <section className="profile">
                                <div className="row">
                                    <div className="col-10">
                                        <div className="row">
                                            <div className="col-3">
                                            <img alt="" src={process.env.REACT_APP_URL+dataUser.photo}  />
                                            </div>
                                            <div className="col-9">
                                                <h4 className="profile-name mt-1">&nbsp;{dataUser.fullName}</h4>
                                                <p className="phone-number">&nbsp;{dataUser.phone}</p>
                            
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-2 d-flex justify-content-end ">
                                        <img alt="" className="mb-2" src={icBell} />
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
  )
}

export default Navbar;
