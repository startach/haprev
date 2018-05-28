
const DELAY = 200;

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

export const Authorize = async appId => {
      await timeout(DELAY);
      return ({
        userId:'234',
        appId:appId,
        first: 'dan',
        last: 'shamir',
        phone: '054-5283004',
        email:'shamir.dan@gmail.com',
        avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAy-AAAAJDQ2NDI3ZTFlLWE1YzAtNDBjOC1iMzJhLTVkYTQxN2MzNjdmMQ.jpg',
        coordinator:['zzz'],
        messages:[],  
      });
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
