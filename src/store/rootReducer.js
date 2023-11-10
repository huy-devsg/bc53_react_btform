import { combineReducers } from 'redux'
import { studentReducer } from './slice'

export const rootReducer = combineReducers({
  studentForm: studentReducer,
})

// rootReducer = {
//     demoRedux: {
//         number: 10,
//         name: 'ABC',
//         age: 20,
//     }
// }
