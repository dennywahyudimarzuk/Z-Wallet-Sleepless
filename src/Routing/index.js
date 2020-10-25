import React, { Component} from 'react';
import {BrowserRouter,Switch} from 'react-router-dom';
import {Dashboard,Home, Login, Register, Review, TopUp, Transfer,Amount, Success,Profile, PersonalInformation,ChangePassword,ChangePin, ManagePhoneNumber, Logout, CreatePin, RegisterSuccess, Admin, NotFound, ForgotPassword, NewPassword, History, Detail} from '../pages';
import AddPhoneNumber from '../pages/Profile/AddPhoneNumber';
import { PrivateRoute, PublicRoute } from "./AccessRoute";
class Routing extends Component{

    render(){
        return(
            <BrowserRouter>
                    <Switch>
                        <PublicRoute component={Home} restricted={false} path='/' exact />
                        <PrivateRoute  path="/dashboard" component={Dashboard} />
                        <PrivateRoute  path="/history" component={History} />
                        <PrivateRoute  path="/detail" component={Detail} />
                        <PrivateRoute  path="/transfer" component={Transfer} exact />
                        <PrivateRoute  path="/transfer/amount/:id" component={Amount} />
                        <PrivateRoute  path="/transfer/review" component={Review} />
                        <PrivateRoute  path="/transfer/success" component={Success} />
                        <PrivateRoute  path="/top-up" component={TopUp}  />
                        <PrivateRoute  exact path="/profile" component={Profile} />
                        <PrivateRoute  path="/profile/personal-information" component={PersonalInformation} />
                        <PrivateRoute  path="/profile/change-password" component={ChangePassword} />
                        <PrivateRoute  path="/profile/change-pin" component={ChangePin}  />
                        <PrivateRoute  path="/profile/add-phone-number" component={AddPhoneNumber}  />
                        <PrivateRoute  path="/profile/manage-phone-number" component={ManagePhoneNumber}  />
                        <PrivateRoute  path="/profile/manage-phone-number" component={ManagePhoneNumber}  />
                        <PrivateRoute  path="/admin" component={Admin} admin="admin" />
                        <PublicRoute   component={Login} restricted={true} path='/auth'exact  />
                        <PublicRoute   component={ForgotPassword} restricted={true} path='/auth/forgot-password'  />
                        <PublicRoute   component={NewPassword} restricted={true} path='/auth/new-password'  />
                        <PublicRoute   path="/auth/register" component={Register}  />
                        <PublicRoute   path="/auth/create-pin" component={CreatePin}  />
                        <PublicRoute   path="/auth/success" component={RegisterSuccess} />
                        <PublicRoute   path="/auth/Logout" component={Logout} />
                        <PublicRoute   component={NotFound} restricted={false} path='*'  />

                    </Switch>
            </BrowserRouter>
        )
    }
}

export default Routing;

                 