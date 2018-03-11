
const DELAY = 200;

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

  /*
  } )  
    await timeout(DELAY);
    return ({
      userId:'234',
      appId:appId,
      first: 'dan',
      last: 'shamir',
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