
const DELAY = 200;

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

  /*
export const Authorize = async appId => {  
await timeout(DELAY);
  return ({
    userId:'234',
    appId:appId,
    firstName: 'dan',
    lastName: 'shamir',
    phone: '054-5283004',
    email:'shamir.dan@gmail.com',
    avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAy-AAAAJDQ2NDI3ZTFlLWE1YzAtNDBjOC1iMzJhLTVkYTQxN2MzNjdmMQ.jpg',
    cordinator:[],
    messages:[],  
  });
};
  */
  
export const HelpRequest = async (first,last,email,content) => {
  await timeout(DELAY);
  return ({request:'ok'});
};

export const GetMessages = async userId =>{ 
  await timeout(DELAY);
  return ([
    //  {id: 'qw34', message: 'ההתנדבות ב 3.1 בבית חולים ביילינסון בוטלה' },
    //  {id: 'ee67', message: 'הפעילות ב10.4.18 הועברה ל11.4.18 יום שלישי' },
  ]);
  
};

export const ReadMessage = async msgId => {
  await timeout(DELAY);
  return ({status:'ok'});
};