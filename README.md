## Installation

* set up the `fullstack-todo-server` project and run it (it should run at localhost:4000)
* run `npm install`
* run `npm start`

## Project Structure

* `store.ts` - defines `createStore()` which creates a redux store. uses `reducer.ts` to import the reducer
* `reducer.ts` - defines all things related to the state and its reducer
* `index.tsx` - creates a store using `createStore()` and passes it to react-redux's <Provider> component. this connects the whole React app to the redux store
* `actions.ts` - defines all the action creators that we'd like to use for dispatching actions in React components.
we use `mapDispatchToProps` and wrap these action creators with a `dispatch` function
* `App.tsx` - this is the main component which you add all your components into
