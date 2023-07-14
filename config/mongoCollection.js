import * as dbConnection from './mongoConnection.js';

const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

const sweetsCollection = getCollectionFn('Sweets');
const usersCollection = getCollectionFn('users');

export default {
  sweets: sweetsCollection,
  users: usersCollection
};
