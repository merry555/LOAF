import { actionCreators as userActions } from "redux/modules/users";

// actions
//const LOGOUT = "LOGOUT";
const SET_FEED = "SET_FEED";
const SET_PROJECT = "SET_PROJECT";
const REGISTER_PROJECT = "REGISTER_PROJECT";
const SAVE_TOKEN = "SAVE_TOKEN";
const SET_MYCOMPLETED = "SET_MYCOMPLETED";
const SET_MYCONTINUOUS = "SET_MYCONTINUOUS";
const SET_SCORE = "SET_SCORE";
// action creators

function setFeed(feed) {
    return {
        type: SET_FEED,
        feed
    }
}

function setMyCompleted(mycompleted) {
    return {
        type: SET_MYCOMPLETED,
        mycompleted
    }
}

function setMyContinuous(mycontinuous) {
    return {
        type: SET_MYCONTINUOUS,
        mycontinuous
    }
}



/**
function logout() {
    return {
      type: LOGOUT
    }
}
 */

function setProject(projectId){
    return {
        type : SET_PROJECT,
        projectId
    }
}

function saveToken(token) {
    return {
      type : SAVE_TOKEN,
      token : token
    }
  }

function registerProject(loggedInUser){
    return {
        type: REGISTER_PROJECT,
        loggedInUser
    }
}

// api actions

function getFeed(){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        fetch("/projects/", {
            method: "GET",
            headers: {
                "Authorization" : `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(userActions.logout());
            }
            return response.json();
        })
        .then(json => dispatch(setFeed(json)))
    }
}


function getCompleted(){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        fetch("/projects/", {
            method: "GET",
            headers: {
                "Authorization" : `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(userActions.logout());
            }
            return response.json();
        })
        .then(json => dispatch(setMyCompleted(json)))
    }
}

function getContinuous(){
    return (dispatch, getState) => {
        const { user : { token } } = getState();
        fetch("/projects/", {
            method: "GET",
            headers: {
                "Authorization" : `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(userActions.logout());
            }
            return response.json();
        })
        .then(json => dispatch(setMyContinuous(json)))
    }
}



function getProject(projectId){
    return (dispatch, getState) => {
        const { users : { token }} = getState();
        fetch(`/projects/${projectId}/`, {
            headers: {
                Authorization : `JWT ${token}`
            }
        })
        .then(response => {
            if(response.status === 401){
                dispatch(userActions.logout());
            }
            return response.json();
        })
        .then(json => dispatch(setProject(projectId, json)));
    };
};

function createProject(file, title, caption, max_member, schedule, tags) {
    return function(dispatch, getState) {
        const { users: { token, loggedInUser }} = getState()
        fetch(`/projects/`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                Authorization : `JWT ${token}`
            },
            body : JSON.stringify({
                file, 
                title,
                caption,
                max_member, 
                schedule,
                tags
              })
            })
            .then(response => response.json())
            .then(json => {
              if(json.token) {
                dispatch(saveToken(json.token));
                dispatch(registerProject(loggedInUser));
              }
            })
            .catch(err => console.log(err));
          };
}

function submitScore(score) {
    
      
}


      
// initial state

const initialState = {
    isLoggedIn: localStorage.getItem("jwt") ? true : false,
    token : localStorage.getItem("jwt"),
    username: localStorage.getItem("username")
}

// reducer

function reducer(state= initialState, action) {
    switch(action.type){
        case SET_FEED:
            return applySetFeed(state, action);
        case SET_MYCOMPLETED:
            return applySetCompleted(state, action);
        case SET_MYCONTINUOUS: 
            return applySetContinuous(state, action);
        case SET_PROJECT:
            return applySetProject(state, action);
        case SET_SCORE:
            return applySetScore(state, action);
        case SAVE_TOKEN:
            return applySetToken(state, action);
        default:
            return state;
    }
}

// reducer functions

function applySetFeed(state, action){
    const { feed } = action;
    return {
        ...state,
        feed
    }
}

function applySetCompleted(state, action){
    const { mycompleted} = action;
    return {
        ...state,
        mycompleted
    }
}


function applySetContinuous(state, action) {
    const { mycontinuous } = action;
    return {
        ...state,
        mycontinuous
    }
}

//projectId에 댓글도 들어가 이씀
function applySetProject(state, action) {
    const { projectId } = action;
    return {
        ...state,
        projectId
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

  function applySetScore(state, action){
    const { projectId} = action;
    return {
        ...state,
        projectId
    }

  }
// exports

const actionCreators = {
    getFeed,
    getCompleted,
    getContinuous,
    getProject,
    createProject,
    submitScore,   
}

export { actionCreators };

export default reducer;