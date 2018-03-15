
const DELAY = 200;

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

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

export const GetVolunteering = async  instId =>{
  await timeout(DELAY)
  return (
    [
      {id:11111 , instId:1, date:'2018-02-05', coordinator:'234'},
      {id:22222 , instId:1, date:'2018-02-15',coordinator:'234'},
      {id:555555 , instId:1, date:'2018-02-25',coordinator:'234'},
      {id:33333 , instId:2, date:'2018-02-05',coordinator:'235'},
      {id:111444 , instId:2, date:'2018-02-05',coordinator:'235'},
    ]
  )
}

export const GetMyVolunteering = async (userId, instId) =>{
  await timeout(DELAY);
  return (
    [
      {id:111771 , instId:1, date:'2018-02-010', coordinator:'234'},
    ]
  )
}
