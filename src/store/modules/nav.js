const UPDATE_NAV = 'haprev/user/UPDATE_NAV'

const initalState = {
  header: {},
  status: '',
  screen: ''
}

export default (state = initalState, action = {}) => {
  switch (action.type) {
    case UPDATE_NAV:
      return { ...state, screen: action.payload }
    default:
      return state
  }
}

const updateNav = (screen) => ({
  type: UPDATE_NAV,
  payload: screen
})

export const updateNavScreen = (screen) => dispatch => {
  dispatch(updateNav(screen))
}
