const DUMMY = 'haprev/dummy/DUMMY';

const initalState = {
    dummy:''
};

export default (state = initalState, action = {}) => {
  switch (action.type) {
    case DUMMY:
      return { ...state, status: 'dummy' };
    default:
      return state;
  }
};

export const dummy = () => async (dispatch) => ({
    type:DUMMY,
});
