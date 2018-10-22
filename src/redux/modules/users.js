// import { AsyncStorage } from "react-native"

//actions
const SET_PROFILE = "SET_PROFILE";
const REGISTER_PROFILE = "REGISTER_PROFILE";
const SAVE_TOKEN = "SAVE_TOKEN";
const LOGOUT = "LOGOUT";
const SET_USERNAME = "SET_USERNAME";
const SET_USERFEED = "SET_USERFEED";
const SET_PROJECTUSERFEED = "SET_PROJECTUSERFEED";

//action creators
function setUserFeed(feed){
  return {
    type: SET_USERFEED,
    feed
  };
}

function setProjectUserFeed(feed){
  return {
    type: SET_PROJECTUSERFEED,
    feed
  };
}

function saveToken(token) {
  return {
    type : SAVE_TOKEN,
    token : token
  }
}

function logout() {
  return {
    type: LOGOUT
  }
}

function setProfile(loggedInUser){
  return {
    type : SET_PROFILE,
    loggedInUser
  }
}

function setUsername(username) {
  return {
    type: SET_USERNAME,
    username
  };
}

function registerProfile(loggedInUser) {
  return {
    type: REGISTER_PROFILE,
    loggedInUser
  }
}

//API actions
function getUserFeed(){//전체 프로젝트 가져오기
  return (dispatch, getState) => {
      const { users : { token } } = getState();
      fetch("/users/explore/", {
          method: "GET",
          headers: {
              "Authorization" : `JWT ${token}`
          }
      })
      .then(response => {
          if(response.status === 401){
              dispatch(logout());
          }
          return response.json();
      })
      .then(json => dispatch(setUserFeed(json)))
  }
}


//프로젝트 별 추천 사용자 
function getProjectUserFeed(){
  return (dispatch, getState) => {
      const { users : { token } } = getState();
      fetch("/users/", {
          method: "GET",
          headers: {
              "Authorization" : `JWT ${token}`
          }
      })
      .then(response => {
          if(response.status === 401){
              dispatch(logout());
          }
          return response.json();
      })
      .then(json => dispatch(setProjectUserFeed(json)))
  }
}

function facebookLogin(access_token) {
  return dispatch => {
    fetch("/users/login/facebook/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        access_token
      })
    })
      .then(response => response.json())
      .then(json => {
        if(json.token){
          dispatch(saveToken(json.token))
        }
      })
      .catch(err => console.log(err));
  };
}

function usernameLogin(username, password) {
  return function(dispatch) {
    fetch("/rest-auth/login/", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        username,
        password,
      })
    })
    .then(response => response.json())
    .then(json => {
      if(json.token) {
        dispatch(saveToken(json.token))
        dispatch(setUsername(username));
      }
    })
    .catch(err => console.log(err));
  }
}

function createAccount(username,email, name, password1, password2) {
  return function(dispatch) {
    fetch("/rest-auth/registration/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body : JSON.stringify({
        username,
        name,
        email,
        password1,
        password2,
      })
    })
    .then(response => response.json())
    .then(json => {
      if(json.token) {
        dispatch(saveToken(json.token));
        dispatch(setUsername(username));
      }
    })
    .catch(err => console.log(err));
  }
}

function getProfile(){
  return (dispatch, getState) => {
    const { users: { token, username }} = getState()

    fetch(`/users/${username}/`, {
      method: "GET",
      headers: {
        Authorization : `JWT ${token}`
      }
    })
    .then(response => {
      if(response.status === 401){
        dispatch(logout());
      }
      return response.json();
    })
    .then(json => {
      dispatch(setProfile(json));
    })
    .catch(err => console.log(err));
  };
}


function createStudy(project_name, info, term, url, file) {
  return (dispatch, getState) => {
    const { users: { token, username, loggedInUser }} = getState()
    fetch(`/users/${username}/`,{
      method: "POST",
      headers: {
        Authorization : `JWT ${token}`,
        "Content-Type" : "multipart/form-data"
      },
      body : JSON.stringify({
        project_name,
        info,
        term,
        url,
        file
      })
    })
    .then(response => response.json())
    .then(json => {
      if(json.token) {
        dispatch(saveToken(json.token));
        dispatch(registerProfile(loggedInUser));
      }
    })
    .catch(err => console.log(err));    
  };
}


function createProfile(profile_image, address, school, major, website, bio, tags) {
  return (dispatch, getState) => {
    const { users: { token, username, loggedInUser }} = getState()

    var profile_image = new FormData();
    var fileField = document.querySelector("input[type='file']");

    profile_image.append('username', 'abc123');
    profile_image.append('avatar', fileField.files[0]);

    fetch(`/users/${username}/`,{
      method: "POST",
      body : JSON.stringify({
        profile_image,
        address,
        school,
        major,
        website,
        bio,
        tags
      }),
      headers: {
        Authorization : `JWT ${token}`,
        "Content-Type" : "application/json"
      },
    })
    .then(response => response.json())
    .then(json => {
      if(json.token) {
        dispatch(saveToken(json.token));
        dispatch(registerProfile(loggedInUser));
      }
    })
    .catch(err => console.log(err));    
  };
}
//initial state
const initialState = {

    isLoggedIn: AsyncStorage.getItem("jwt") ? true : false,
    token : AsyncStorage.getItem("jwt"),
    username: AsyncStorage.getItem("username")
};

//reducer
function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_USERFEED:
          return applySetUserFeed(state,action);
        case SAVE_TOKEN:
          return applySetToken(state, action); 
        case LOGOUT : 
          return applyLogout(state, action);
        case SET_PROFILE:
          return applySetProfile(state, action); 
        case SET_USERNAME:
          return applySetUsername(state, action);   
        default: 
          return state;
    }
}

//reducer functions
function applySetUserFeed(state, action){
  const { feed } = action;
  return {
      ...state,
      feed
  }
}

function applySetToken(state, action) {
  const { token } = action;
  localStorage.setItem("jwt", token);
  return {
    ...state,
    isLoggedIn : true,
    token
  }
}

function applyLogout(state, action) {
  localStorage.removeItem("jwt");
  localStorage.removeItem("username");
  return {
    isLoggedIn : false
  }
}

function applySetProfile(state, action) {
  const { loggedInUser } = action;
  return {
    ...state,
    loggedInUser
  };
}

function applySetUsername(state, action) {
  const { username } = action;
  localStorage.setItem("username", username);
  return {
    ...state,
    username
  };
}

//exports
const actionCreators = {
    facebookLogin,
    usernameLogin,
    createAccount,
    logout,
    getProfile,
    setUsername,
    createProfile,
    getUserFeed,
    getProjectUserFeed
};


export { actionCreators } ;

//reducer export
export default reducer;