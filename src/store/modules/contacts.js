import { getContactsFromService } from '../../services/services';

const REQUEST_CONTACTS = 'haprev/user/REQUEST_CONTACTS';
const RESPONSE_CONTACTS = 'haprev/user/RESPONSE_CONTACTS';

const initalState = {
  status: '',
  contacts: [],
};

export default (state = initalState, action = {}) => {
  switch (action.type) {
    case REQUEST_CONTACTS:
      return { ...state, status: 'request' };
    case RESPONSE_CONTACTS:
      return { ...state, status: '', contacts: action.contacts };

    default:
      return state;
  }
};

const requestCotacts = () => (
  {
    type: REQUEST_CONTACTS,
  }
);

const responseContacts = data => ({
  type: RESPONSE_CONTACTS,
  contacts: data,
});

export const getContacts = () => async (dispatch) => {
  dispatch(requestCotacts());
  const contacts = await getContactsFromService();
  dispatch(responseContacts(contacts));
};
