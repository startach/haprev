
const DELAY = 200;

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

export const getUserData = async (uid) => {
  await timeout(DELAY);
  return ({
    uid,
    first: 'dan',
    last: 'shamir',
    avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAy-AAAAJDQ2NDI3ZTFlLWE1YzAtNDBjOC1iMzJhLTVkYTQxN2MzNjdmMQ.jpg',
  });
};

export const getContactsFromService = async () => {
  await timeout(DELAY);
  return ([
    { name: 'abrham moshe', tel: '054-1234567', email: 'aaa@aaa.com' },
    { name: 'yitzchak avino', tel: '054-1234567', email: 'b@gmail.com' },
    { name: 'yakov israeli', tel: '054-1234567', email: 'zzzz.vvvv@walla.co.il' },
  ]);
};

export const GetHospitalsFromService = async () => {
  await timeout(DELAY);
  return ([
    { id: 1, name: 'אסותא אשדוד', pictureUrl: 'https://firebasestorage.googleapis.com/v0/b/happrev.appspot.com/o/Layer%2025.jpg?alt=media&token=da5592af-8eaa-472b-a255-3d4fdca0f13a', region: 'דרום', city: 'אשדוד' },
    { id: 2, name: 'איכילוב', pictureUrl: 'https://firebasestorage.googleapis.com/v0/b/happrev.appspot.com/o/Layer%2025.jpg?alt=media&token=da5592af-8eaa-472b-a255-3d4fdca0f13a', region: 'מרכז', city: 'תל אביב' },
    { id: 3, name: 'ביילינסון', pictureUrl: 'https://firebasestorage.googleapis.com/v0/b/happrev.appspot.com/o/Layer%2025.jpg?alt=media&token=da5592af-8eaa-472b-a255-3d4fdca0f13a', region: 'מרכז', city: 'פתח תקווה' },
    { id: 4, name: 'תל השומר', pictureUrl: 'https://firebasestorage.googleapis.com/v0/b/happrev.appspot.com/o/Layer%2025.jpg?alt=media&token=da5592af-8eaa-472b-a255-3d4fdca0f13a', region: 'מרכז', city: 'רמת גן' },
    { id: 5, name: 'רמבם', pictureUrl: 'https://firebasestorage.googleapis.com/v0/b/happrev.appspot.com/o/Layer%2025.jpg?alt=media&token=da5592af-8eaa-472b-a255-3d4fdca0f13a', region: 'צפון', city: 'חיפה' },
  ]);
};


export const GetHospitalEvents = async (hospitalId) => {
  await timeout(DELAY);
  return ([
    '2017-06-15', '2017-06-10', '2017-06-01',
  ]);
};

export const GetHospitalEventsForUser = async (hospitalId,userId) => {
  await timeout(DELAY);
  return ([
    '2017-06-15', '2017-06-08', '2017-06-05',
  ]);
};


export const dummy = () => null;
