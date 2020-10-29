import React,{useEffect} from 'react'
import {icBell } from '../../../assets';
import './navbar.css';
import axios from 'axios';
import qs from 'qs';
import {Link } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';

 const Navbar = ({hidden}) => {

    const dispacth = useDispatch();
    const stateGlobal = useSelector(state => state)
    console.log('dari stae: ',stateGlobal)
    useEffect(() => {
            var dataToken = JSON.parse(localStorage.getItem("token"));
            dataApi(dataToken);
    },[])
    
    const dataApi = (token) => {
        
        const headers = { headers: {'Authorization': `Bearer ${token.accessToken}`}}  
        let data = qs.stringify({token:token.accessToken});
        axios.post(`${process.env.REACT_APP_API}/profile/token`,data,headers)
        .then(res =>{
            dispacth({type:'SET_DATA',value:res.data.data[0]});

        }).catch(err => {
            console.error(err)
        });
    }
  if(hidden){
    return(
        <>
        </> 
    )
  }
  return (
    <>

                <nav className="navbar navbar-dashboard ">
                     <div className="container">
                        <a href="/dashboard" className="navbar-brand d-none d-md-block" >Zwallet</a>

                            <section className="profile justify-content-between">

                                    <div className="row justify-content-between">
                                        <div className="col-10">
                                            <div className="row">
                                                <div className="col-3">
                                                 <Link to="/profile">
                                                   <img alt="" src={process.env.REACT_APP_URL+stateGlobal.photo}  />
                                                </Link>

                                                </div>
                                                <div className="col-9 " >
                                                    <p className="profile-hello d-block d-md-none mb-0">&nbsp;Hello,</p>
                                                    <h4 className="profile-name mt-0">&nbsp;{stateGlobal.fullName}</h4>
                                                    <p className="phone-number d-none d-md-block">&nbsp;{stateGlobal.phone}</p>
                                
                                                </div>
                                            </div>
                                        </div>
                                   
                                    <div className="col-2 d-flex justify-content-end  ">
                                         <img alt="" className="mb-2" src={icBell} />
                                    </div>
                                </div>

                            </section>
                        
                    </div>
                
                </nav>     


    </>
  )
}

export default Navbar;
