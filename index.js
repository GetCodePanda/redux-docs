// ACTION FILE :
// ACTION CONSTANT:

const {combineReducers} = Redux;

const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';



const VisibilityFilter = {
    SHOW_ALL : 'SHOW_ALL',
    SHOW_COMPLETED:'SHOW_COMPLETED',
    SHOW_ACTIVE:'SHOW_ACTIVE'
};


// action creator ..[what are action to be perform or create to the required state ]

// action creator function for add todo an item ..
function addTodo(text){
    return {
        type:ADD_TODO,
        text
    }
}

// action creator function for toogle todo an item ..
function toggleTodo(index){
    return {
        type:'TOGGLE_TODO',
        index
    }
}


// action creator function for set the current filter to state of an todo item ...
function setVisibilityFilter(filter){
    return {
        type:SET_VISIBILITY_FILTER,
        filter
    }
}


// REDUCER

const {SHOW_ALL} = VisibilityFilter;


// visibility filter reducer ...
function visibilityFilter(state=SHOW_ALL , action){
    switch(action.type){
        case SET_VISIBILITY_FILTER:
            return action.filter
        default:
            return state
    }
}

// todos reducer ...
function todos(state = [], action){
    switch(action.type){
        case ADD_TODO:
            return [
                ...state,
                {
                    text:action.text,
                    completed:false
                }
            ]

        case TOGGLE_TODO:
            return state.map((todo,index)=>{
                if(index===action.index){
                    return Object.assign({} ,todo, {completed:!todo.completed})
                }
            return todo;
            })
        default:
            return state
    }
}


// root reducer ...
const todoApp = combineReducers({
    visibilityFilter,
    todos
});

// STORE
const {createStore} = Redux;
let store = createStore(todoApp);

// store has three main methods ..
// to get current state use getState()
// to change the state of the store , you need to  use the dispatch method in redux api ..
//  subcribe method is used to register or unregister state of the application...


console.log(store.getState());

let unsubscribe = store.subscribe(()=> console.log(store.getState()));

//Dispatch  some action ..

store.dispatch(addTodo('learn more about react'));


store.dispatch(addTodo('learn more about redux'));

store.dispatch(addTodo('learn more about rxjs'));

store.dispatch(toggleTodo(0));

store.dispatch(toggleTodo(1));

store.dispatch(setVisibilityFilter(VisibilityFilter.SHOW_COMPLETED))

store.dispatch(setVisibilityFilter(VisibilityFilter.SHOW_ACTIVE));

unsubscribe();
