import React,{Component} from 'react'
import { icEyeCrossed, icLock, icMail, icPerson, imDoublePhone,icLockActive,icMailActive,icPersonActive} from '../../assets';
import './register.css';
import axios from 'axios';
import qs from 'qs';
class Register extends Component {
    state = {
        icUsername:icPerson,
        icMail:icMail,
        icPassword:icLock,
        usernameClick:{},
        mailClick:{},
        passClick:{},
        btn:{},
        form : {
            email :'',
            password: '',
            fullName:'',
            userName:'',

        },
        show:false
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


    onRegister()
    {

        let data = {
           
                email :this.state.form.email,
                password:this.state.form.password ,
                fullName:this.state.form.userName,
                userName:this.state.form.userName,
                address:'jakarta',
                birth:'Jakarta',
                phone:'-'
            
        }

        //  console.log(data)
         data = qs.stringify(data);

        axios.post(`${process.env.REACT_APP_API}/profile`,data)
        .then(res =>{
          console.log(res.data)
        //   if (res.data.status !== 'error') {
             this.props.history.push('/auth/create-pin')
        //   }
  
        }).catch(err => {
          console.error(err)
        });
    }


    showPassword()
    {
        if (this.state.show === false) {
            this.setState({
                show:true
            })
        }else{
            this.setState({
                show:false
            })
        }

    }

    uiUsername()
    {

        this.setState({
            icUsername:icPersonActive,
            usernameClick:{border:'1.6px solid #6379F4'}
        })
    }
    uiEmail()
    {

        this.setState({
            icMail:icMailActive,
            mailClick:{border:'1.6px solid #6379F4'}
        })
    }
    uiPassword()
    {
        this.setState({
            btn:{backgroundColor:'#6379F4',color:'white'},
            icPassword:icLockActive,
            passClick:{border:'1.6px solid #6379F4'}
        })
    }



    render() { 
        return ( 
            <>
              <div class="row">
                    <div class="col-md-6 information p-2 p-sm-5">
                        <div class="container">
                            <div class="logo">
                                <h1 class="ml-4">Zwallet</h1>
                            </div>
                            <div class="image">
                                <img alt="" src={imDoublePhone} class="img-fluid" />
                            </div>
                            <div class="description ml-4">
                                <h2>App that Covering Banking Needs.</h2>
                                <p>Zwallet is an application that focussing in banking needs for all users
                                    in the world. Always updated and always following world trends.
                                    5000+ users registered in Zwallet everyday with  worldwide<br/>
                                    users coverage.</p>
                                
                            </div>
                    </div>
                    </div>
                    <div class="col-md-6">
                        <div class="sign-up-container">
                            <div class="sign-up">
                                <h2>Start Accessing Banking Needs
                                    With All Devices and All Platforms
                                    With 30.000+ Users</h2>
                                <p>Transfering money is eassier than ever, you can access 
                                    Zwallet wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</p>


                                    <div class="form-group">

                                        <div class="form-group username col-lg-8">
                                            <input type="text" style={this.state.usernameClick} onClick={() => this.uiUsername()} class="form-control border-top-0 border-left-0 border-right-0 rounded-0 " placeholder="Enter your username" value={this.state.form.userName} name="userName" onChange={this.handleForm} />
                                            <div class="icon-input">
                                                <img alt="" src={this.state.icUsername} />
                                            </div>
                                        </div>
                                        <div class="form-group email col-lg-8">
                                            <input type="email" autocomplete="off" style={this.state.mailClick} onClick={() => this.uiEmail()} class="form-control border-top-0 border-left-0 border-right-0 rounded-0 " placeholder="Enter your e-mail" value={this.state.form.email} name="email" onChange={this.handleForm} />
                                            <div class="icon-input">
                                                <img alt="" src={this.state.icMail} />
                                            </div>
                                        </div>
                                        <div class="form-group password col-lg-8">
                                            <input type={this.state.show ? "text" : "password"} style={this.state.passClick} onClick={() => this.uiPassword()} class="form-control border-top-0 border-left-0 border-right-0 rounded-0 " placeholder="Enter your password"  value={this.state.form.password} name="password" onChange={this.handleForm} />
                                            <div class="icon-input">
                                                <img alt="" src={this.state.icPassword} />
                                            </div>
                                            <div class="eye-crossed" onClick={() => this.showPassword()} style={{cursor:'pointer'}}>
                                                <img alt="" src={icEyeCrossed} />
                                            </div>
                                        </div>

                                        <div class="form-button col-lg-8">
                                            <button class="btn btn-primary" style={this.state.btn} type="submit" onClick={() => this.onRegister()} >Sign Up</button>
                                        </div>
                                        <div class="sign-in text-center col-lg-8">
                                            <p>Already have an account? Let’s <a href="/auth">Login</a></p>
                                        </div>
                        
                                    </div>
                            </div>
                    </div>
                    </div>
                </div>
            </>
         );
    }
}
 
export default Register;