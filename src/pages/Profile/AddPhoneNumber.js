import React,{Component} from 'react';
import { icArrowUp ,icGrid, icLogOut, icPlus,icUserActive,icPhone} from '../../assets';
import { Navbar,Footer} from '../../component/molecules';
import {Link} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import './addPhoneNumber.css';

class AddPhoneNumber extends Component {

    state = {
        data : [],
        form:{
            phone:''
        }
    }

    componentDidMount()
    {
        var login = localStorage.getItem("login");
        if (login === 'true') {
              var dataLogin = JSON.parse(localStorage.getItem("dataLogin")).data[0];
              this.setState({data:dataLogin})    
        }
    }

    handleForm = (event) => {
        let  newForm  = this.state.form;
        newForm[event.target.name] = event.target.value;
        this.setState({
            newForm: newForm
        },
        ()=> {
          console.log(newForm);
        }
        )  
    }

    addNumber(id)
    {
        let value = '+62';
        let data = {
            phone : value + this.state.form.phone
        }
        data = qs.stringify(data);
        axios.patch(`https://zwallet-api-production.herokuapp.com/v1/profile/${id}`,data)
        .then(res => {
          console.log(res.data)
          if (res.data.success === true) {
                 this.props.history.push('/profile/manage-phone-number')
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
                                        <img src={icGrid} /> &nbsp; <span className="d-none d-md-inline">Dashboard</span>
                                    </a>
                                    </Link>
                                    <Link to="/transfer">
                                    <a href="receiver.html" className="ml-md-4 d-block transfer-pr text-center text-lg-left">
                                        <img src={icArrowUp} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Transfer</span>
                                    </a>
                                    </Link>
                                    <Link to="/top-up">
                                    <a href="top-up"  className="ml-md-4 d-block top-up-pr text-center text-lg-left" >
                                        <img src={icPlus} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Top Up</span>
                                    </a>
                                    </Link>
                                    <Link to="/profile">
                                    <a href="" className="ml-md-4 d-block profile-pr text-center text-lg-left">
                                        <div className="active-link"></div>
                                        <img src={icUserActive} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Profile</span>
                                    </a>
                                    </Link>
                                    </div>
                                    <a href="login.html" className="ml-md-4 d-block logout-rc text-center text-lg-left">
                                        <img src={icLogOut} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Logout</span>
                                    </a>
                                </div>
                            </div>
                            <div className="col-12 col-sm-9" id="area">

                            <div class="body-area-add-number"> 
                                <div class="row ">
                                    <div class="col-12">
                                        <h1>Manage Phone Number</h1>
                                        <p>You can only delete the phone number and then you must add another phone number.</p>

                                        <div align="center" class="change-phone">

                                            <div class="form-group phone col-lg-7">
                                                <input type="number" class="form-control border-top-0 border-left-0 border-right-0 rounded-0 " placeholder="Enter your phone number" name="phone" value={this.state.form.phone} onChange={this.handleForm} />
                                                <div class="icon-input">
                                                    <img src={icPhone} alt="" /> 
                                                    &nbsp;&nbsp;
                                                    <span>+62</span>
                                                </div>

                                            </div>

                                            <div class="form-button col-lg-7">
                                                <button class="btn btn-primary" type="submit" onClick={() => this.addNumber(this.state.data.id)}>Add Phone Number</button>
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
 
export default AddPhoneNumber;