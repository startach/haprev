import * as service from './src/services/services_firebase';

test('can get contact from service', async (t) => {
  const s = await service.getContactsFromService();
  console.log(s);
  t.pass();
});


test('can get hospitals from service', async (t) => {
  const s = await service.getHospitalsFromService();
  console.log(s);
  t.pass();
});

