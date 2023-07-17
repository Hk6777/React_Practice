import { MongoClient } from 'mongodb';

let _connection = undefined;
let _db = undefined;

export const dbConnection = async () => {
  if (!_connection) {
    _connection = await MongoClient.connect('mongodb://localhost:27017/');
    _db = await _connection.db('Kachhadiya-Harshil-CS554-Lab1');
  }

  return _db;
};

export const closeConnection = () => {
  _connection.close();
};
