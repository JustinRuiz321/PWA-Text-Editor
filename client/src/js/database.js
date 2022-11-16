import { request } from 'express';
import res from 'express/lib/response';
import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await openDB('jate', 1);
  const text = db.transaction('jate', 'readwrite');
  const store = text.objectStore('jate');
  const result = await request;
  const request = store.put({ id: 1 , jate: content });
  console.log(result);
  console.error('putDb not implemented');
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB('jate', 1);
  const text = db.transaction('jate', 'readonly');
  const store = text.objectStore('jate');
  const result = await request;
  const request = store.getAll();
  console.log(result);
  console.error('getDb not implemented');
};
initdb();
