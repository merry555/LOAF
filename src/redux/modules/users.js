// import { AsyncStorage } from "react-native"

//actions
const SET_PROFILE = "SET_PROFILE";
const REGISTER_PROFILE = "REGISTER_PROFILE";
const SAVE_TOKEN = "SAVE_TOKEN";
const API_URL = "http://172.20.10.10:8000/";
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const SET_USER = "SET_USER";

const SET_USERNAME = "SET_USERNAME";
const SET_USERFEED = "SET_USERFEED";
const SET_PROJECTUSERFEED = "SET_PROJECTUSERFEED";

//action creators

function setLogIn(token) {
  return {
    type: LOG_IN,
    token
  }
}

function setUser(user) {
  return {
    type: SET_USER,
    user
  }
}

function logout() {
  return { type: LOG_OUT };
}

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
function login(username, password) {
  return dispatch => {
    return fetch(`${API_URL}/rest-auth/login/`, {  //API_URL 백앤드 URL
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(response => response.json())
      .then(json => {
        if (json.user && json.token) {
          dispatch(setLogIn(json.token));
          dispatch(setUser(json.user));
          return true;
        } else {
          return false;
        }
      });
  };
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

function getOwnProfile() { //개인 프로필
  return (dispatch, getState) => {
    const { user: { token, profile: { username } } } = getState();
    fetch(`${API_URL}/users/${username}/`, {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(logOut());
        } else {
          return response.json();
        }
      })
      .then(json => dispatch(setUser(json)));
  };
}

function getProfile(username) { // 유저 프로필
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    return fetch(`${API_URL}/users/${username}/`, {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(logOut());
        } else {
          return response.json();
        }
      })
      .then(json => json);
  };
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

    isLoggedIn: false
    
};

//reducer
function reducer(state = initialState, action) {
    switch (action.type) {
        case LOG_IN:
          return applyLogin(state, action);
        case SET_USER:
          return applySetUser(state, action);
        case SET_USERFEED:
          return applySetUserFeed(state,action);
        case LOG_OUT : 
          return applyLogOut(state, action);
        case SET_PROFILE:
          return applySetProfile(state, action); 
        case SET_USERNAME:
          return applySetUsername(state, action);   
        default: 
          return state;
    }
}

//reducer functions
function applyLogin(state, action) {
  const { token } = action;
  return {
    ...state,
    isLoggedIn: true,
    token
  };
}

function applySetUser(state, action) {
  const { user } = action;
  return {
    ...state,
    profile: user
  }
} 

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

function applyLogOut(state, action) {
  AsyncStorage.clear();
  return {
    ...state,
    isLoggedIn: false,
    token: ""
  };
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
    login,
    facebookLogin,
    createAccount,
    logout,
    getProfile,
    getOwnProfile,
    setUsername,
    createProfile,
    getUserFeed,
    getProjectUserFeed
};


export { actionCreators } ;

//reducer export
export default reducer;