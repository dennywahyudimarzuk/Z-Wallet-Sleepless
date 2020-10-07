import React,{Component} from 'react'
import { Link } from 'react-router-dom';
import { icSuccess, imDoublePhone } from '../../assets';
import './registerSuccess.css'
class RegisterSuccess extends Component {

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
                        <div class="success-information">
                            <div>
                            <img alt="" src={icSuccess} />

                                <h2>Your PIN Was Successfully Created</h2>
                                <p>
                                    Your PIN was successfully created and you can now access all the features in Zwallet. Login to your new account and start exploring!
                                </p>


                                    <div class="form-group">
                                        <div class="form-button col-xl-8">
                                            <Link to="/auth">
                                            <button class="btn btn-primary" type="submit" >Login Now</button>
                                            </Link>
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
 
export default RegisterSuccess;