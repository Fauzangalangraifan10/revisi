// src/scripts/data/api.js

import CONFIG from '../config';

const ENDPOINTS = {
  REGISTER: `${CONFIG.BASE_URL}/register`,
  // PERBAIKAN: Mengubah CONFIG.BASE.URL menjadi CONFIG.BASE_URL
  LOGIN: `${CONFIG.BASE_URL}/login`,
  GET_ALL_STORIES: `${CONFIG.BASE_URL}/stories`,
  ADD_STORY: `${CONFIG.BASE_URL}/stories`,
};

export async function registerUser({ name, email, password }) {
  const res = await fetch(ENDPOINTS.REGISTER, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message);
  return json;
}

export async function loginUser({ email, password }) {
  const res = await fetch(ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message);
  return json;
}

export async function getAllStories(token) {
  const res = await fetch(ENDPOINTS.GET_ALL_STORIES, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message);
  return json.listStory;
}

export async function addNewStory({ formData, token }) {
  const res = await fetch(ENDPOINTS.ADD_STORY, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message);
  return json;
}
