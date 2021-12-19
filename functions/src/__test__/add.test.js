import firebase from '../util/admin';

describe('컬렉션 만들고 데이터 저장하기', () => {
  const db = firebase.firestore();
  it('데이터 추가', async () => {
    const data = {
      id: '1',
      name: 'hongjinhyeok',
      state: 'pangyo',
      country: 'republic of korea',
    };
    const res = await db.collection('users').doc(data.id).set(data);
  });

  it('데이터 덮어쓰기', async () => {
    const usersRef = db.collection('users').doc('1');
    const res = await usersRef.set(
      {
        cool: true,
      },
      { merge: true },
    );
  });

  it('ID 자동 추가', async () => {
    const res = await db.collection('users').add({
      name: 'kate',
      country: 'USA',
    });
    console.log(`Added document with ID: ${res.id}`);
  });

  it('문서를 참조하여 ID 자동 추가', async () => {
    const newUserRef = db.collection('users').doc();

    const res = await newUserRef.set({
      name: 'kakao',
      country: 'south-korea',
    });
  });
});

describe('문서 업데이트', () => {
  const db = firebase.firestore();

  it('일부 필드 업데이트', async () => {
    const newUserRef = db.collection('users').doc('1');

    const res = await newUserRef.update({ cool: false });
  });

  it('서버 타임스탬프', async () => {
    const newUserRef = db.collection('users').doc('1');

    const res = await newUserRef.update({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  });

  it('중첩된 객체의 필드 업데이트', async () => {
    const initialData = {
      name: 'Frank',
      age: 12,
      favorites: {
        food: 'Pizza',
        color: 'Blue',
        subject: 'recess',
      },
    };
    const re = await db.collection('users').doc('Frank').set(initialData);
    const res = await db.collection('users').doc('Frank').update({
      age: 13,
      'favorites.color': 'Red',
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  });

  it('배열 요소 업데이트', async () => {
    const data = {
      name: 'washington',
    };
    const res = await db.collection('cities').doc('DC').set(data);
    const washingtonRef = db.collection('cities').doc('DC');

    const unionRes = await washingtonRef.update({
      regions: firebase.firestore.FieldValue.arrayUnion('greater_virginia'),
    });

    const removeRes = await washingtonRef.update({
      regions: firebase.firestore.FieldValue.arrayRemove('greater_virginia'),
    });
    const multipleUnionRes = await washingtonRef.update({
      regions: firebase.firestore.FieldValue.arrayUnion(
        'south_carolina',
        'texas',
      ),
    });

    // using spread operator in ES6 syntax
    const newRegions = ['south_carolina', 'texas', 'la', 'newyork'];
    const multipleUnionRes2 = await washingtonRef.update({
      regions: firebase.firestore.FieldValue.arrayUnion(...newRegions),
    });
  });

  it('숫자 값 늘리기', async () => {
    const washingtonRef = db.collection('cities').doc('DC');

    const res = await washingtonRef.update({
      population: firebase.firestore.FieldValue.increment(50),
    });
  });
});
