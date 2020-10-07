import React,{Component} from 'react';
import { icArrowUp ,icGrid, icLogOut, icPlus,icUserActive, icTrash} from '../../assets';
import { Navbar,Footer} from '../../component/molecules';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './managePhoneNumber.css';
import qs from 'qs';


class ManagePhoneNumber extends Component {

    state = {
        data:[],
        phone:'-'
    }

    componentDidMount()
    {
        var login = localStorage.getItem("login");
        if (login === 'true') {
              var dataLogin = JSON.parse(localStorage.getItem("dataLogin")).data[0];
              this.setState({data:dataLogin});
              if (dataLogin.phone === '-') {
                 this.props.history.push('/profile/add-phone-number')
              }  
        }


    }
    deleteNumber(id)
    {
        let data = {
            phone : this.state.phone
        }
        data = qs.stringify(data);
        axios.patch(`https://zwallet-api-production.herokuapp.com/v1/profile/${id}`,data)
        .then(res => {
          console.log(res.data)
          if (res.data.success === true) {
                 this.props.history.push('/profile/add-phone-number')
          }
        })
        .catch(err => {
          console.error(err)
        });
    }


    render() { 
        return ( 
            <>
                <Navbar/>
                    <div className="container content">
                        <div className="row">
                            <div className="col-3 bg-white shadow-lg sidebar_menu">
                              <div class="sidebar h-100 d-flex pb-5" style={{flexDirection: 'column'}}>
                                 <div style={{flex: 1}}>
                                   <Link to="/dashboard">
                                    <a href="/dashboard" className="ml-md-4 d-block dashboard-pr text-center text-lg-left">
                                        <img alt="" src={icGrid} /> &nbsp; <span className="d-none d-md-inline">Dashboard</span>
                                    </a>
                                    </Link>
                                    <Link to="/transfer">
                                    <a href="receiver.html" className="ml-md-4 d-block transfer-pr text-center text-lg-left">
                                        <img alt="" src={icArrowUp} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Transfer</span>
                                    </a>
                                    </Link>
                                    <Link to="/top-up">
                                    <a href="top-up"  className="ml-md-4 d-block top-up-pr text-center text-lg-left" >
                                        <img alt="" src={icPlus} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Top Up</span>
                                    </a>
                                    </Link>
                                    <Link to="/profile">
                                    <a href="" className="ml-md-4 d-block profile-pr text-center text-lg-left">
                                        <div className="active-link"></div>
                                        <img alt="" src={icUserActive} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Profile</span>
                                    </a>
                                    </Link>
                                    </div>
                                    <a href="/auth/logout" className="ml-md-4 d-block logout-rc text-center text-lg-left">
                                        <img alt="" src={icLogOut} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Logout</span>
                                    </a>
                                </div>
                            </div>
                            <div className="col-12 col-sm-9" id="area">

                                <div class="body-area-manage-number"> 
                                    <div class="row ">
                                        <div class="col-12">
                                            <h1>Manage Phone Number</h1>
                                            <p>You can only delete the phone number and then you must add another phone number.</p>

                                            <div class="primary-number">
                                                <span>Primary</span>
                                                <h2>{this.state.data.phone}</h2>
                                                <div className="delete-number" onClick={() => this.deleteNumber(this.state.data.id)}>
                                                    <img alt="" src={icTrash}/>
                                                </div>
                                            </div>
                                            

                                        </div>

                                    </div>
                                </div>               
 

                            </div>

                        </div>
                    </div>                                              
                <Footer/>
            </>
         );
    }
}
 
export default ManagePhoneNumber;