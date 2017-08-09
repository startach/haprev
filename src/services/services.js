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

export const dummy = () => null;
