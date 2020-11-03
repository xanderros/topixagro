import {createStore, applyMiddleware} from 'redux'
import Immutable from 'immutable'
import cartApp from './reducers'

const saveStateToLocalStorage = store => next => action => {
    let result = next(action)
    localStorage.setItem('state', JSON.stringify(store.getState().toJS()))
    return result
}

let localStorageState = localStorage.getItem('state')
let initialState = undefined
if (localStorageState) initialState = Immutable.fromJS(JSON.parse(localStorageState))

export default createStore(
    cartApp,
    initialState,
    applyMiddleware(saveStateToLocalStorage)
)