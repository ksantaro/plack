import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export const SET_REDIRECT_COMPONENT = "SET_REDIRECT_COMPONENT";

export const setRedirectComponent = redirectLink => ({ //set the redirect component
  type: SET_REDIRECT_COMPONENT,
  payload: {redirectComponent: <Redirect to={redirectLink} />}
});

// export const RETURN_REDIRECT = "RETURN_REDIRECT";
// export const RETURN_REDIRECT_COMPONENT = "RETURN_REDIRECT_COMPONENT";
// export const RETURN_REDIRECT_FALSE = "RETURN_REDIRECT_FALSE";

// export const returnRedirectComponent = redirectComponent => ({
//   type: RETURN_REDIRECT_COMPONENT,
//   payload: {redirectComponent}
// });

// export const returnRedirect = redirect => { //redirect is a boolean
//   if(redirect) {
//     dispatch(returnRedirectComponent(<Redirect to={this.state.redirectLink} />)) 
//   }
// }