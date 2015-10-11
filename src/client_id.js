import uuid from 'uuid';

const CLIENT_ID_KEY = 'clientId'

function setClientId() {
  const id = uuid.v4();
  localStorage.setItem(CLIENT_ID_KEY, id);
  return id;
}

export default function getClientId() {
  return localStorage.getItem(CLIENT_ID_KEY) || setClientId();
}
