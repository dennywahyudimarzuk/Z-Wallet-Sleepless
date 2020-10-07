import React, { Component} from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import {Dashboard,Home, Login, Register, Review, TopUp, Transfer,Amount, Success,Profile, PersonalInformation,ChangePassword,ChangePin, ManagePhoneNumber, Logout, CreatePin, RegisterSuccess} from '../pages';
import AddPhoneNumber from '../pages/Profile/AddPhoneNumber';
class Routing extends Component{

    render(){
        return(
            <BrowserRouter>
                    <>
                        <Route exact path="/"  component={Home} />
                        <Route path="/dashboard"  component={Dashboard} />
                        <Route exact path="/transfer" component={Transfer} />
                        <Route path="/transfer/amount/:id" component={Amount} />
                        <Route path="/transfer/review" component={Review} />
                        <Route path="/transfer/success" component={Success} />
                        <Route path="/top-up" component={TopUp} />
                        <Route exact path="/profile" component={Profile} />
                        <Route path="/profile/personal-information" component={PersonalInformation} />
                        <Route path="/profile/change-password" component={ChangePassword} />
                        <Route path="/profile/change-pin" component={ChangePin} />
                        <Route path="/profile/add-phone-number" component={AddPhoneNumber} />
                        <Route path="/profile/manage-phone-number" component={ManagePhoneNumber} />
                        <Route exact path="/auth" component={Login} />
                        <Route path="/auth/register" component={Register} />
                        <Route path="/auth/create-pin" component={CreatePin} />
                        <Route path="/auth/success" component={RegisterSuccess} />
                        <Route path="/auth/Logout" component={Logout} />

                    </>
            </BrowserRouter>
        )
    }
}

export default Routing;
