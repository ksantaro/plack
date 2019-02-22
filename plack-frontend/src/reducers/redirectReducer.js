import * as RedirectActions from '../actions/redirectActions';

const initialState = {
  // redirect: false,
  redirectComponent: null,
}

export default function(state=initialState, action) {
  switch(action.type) {
    case RedirectActions.SET_REDIRECT_COMPONENT:
      return {
        ...state,
        redirectComponent: action.payload.redirectComponent,
      }
    default:
      return state;    
  }
}