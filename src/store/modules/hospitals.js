import { GetHospitalsFromService } from '../../services/services';

const REQUEST_HOSPITALS = 'haprev/user/REQUEST_HOSPITALS';
const RESPONSE_HOSPITALS = 'haprev/user/RESPONSE_HOSPITALS';

const initalState = {
  status: '',
  hospitals: [],
};

export default (state = initalState, action = {}) => {
  switch (action.type) {
    case REQUEST_HOSPITALS:
      return { ...state, status: 'request' };
    case RESPONSE_HOSPITALS:
      return { ...state, status: '', hospitals: action.hospitals };

    default:
      return state;
  }
};

const requestHospitals = () => (
  {
    type: REQUEST_HOSPITALS,
  }
);

const responseHospitals = data => ({
  type: RESPONSE_HOSPITALS,
  hospitals: data,
});

export const getHospitals = () => async (dispatch) => {
  dispatch(requestHospitals());
  const hospitals = await GetHospitalsFromService();
  dispatch(responseHospitals(hospitals));
};
