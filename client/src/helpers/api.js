import axios from "axios";
import { apiBase } from './urlConfig';

const api = axios.create({
  baseURL: apiBase,
});



api.interceptors.request.use((req) => {
  if (localStorage.getItem('auth')) {
    const authData = JSON.parse(localStorage.getItem('auth'));
    const tokenId = authData?.token;
    req.headers.Authorization = `Bearer ${tokenId}`;
  }
  return req;
});




export const register = (userData) => api.post("/user/register", userData);
export const login = (userData) => api.post("/user/login", userData);
export const auth = () => api.get('/user/auth');
export const logingoogle = (userData) => api.post("/user/logingoogle", userData);
export const loginfacebook = (userData) => api.post("/user/loginfacebook", userData);
export const profileDetails = (id) => api.get(`/user/show/${id}`);
export const profileUpdate = (profileData,id) => api.put(`/user/${id}`, profileData);
export const contactList = (contactData) => api.post(`/user/contact`,contactData);
export const categoryAll = () => api.get('/category');
export const categoryStory = () => api.get('/category/story');
export const postAll = (page) => api.get(`/post?page=${page}`); 
export const postAllSearch = (postData) => api.post('/post/search',postData); 
export const postShow = (slug) => api.get(`/post/${slug}`);
export const ProfilePost = (id) => api.get(`/post/profile/${id}`);
export const postCreate = (postData,id) => api.post(`/post/${id}`, postData);
export const postUpdate = (postData,id,slug) => api.put(`/post/${id}/${slug}`, postData);
export const postDelete = (id,slug) => api.delete(`/post/${id}/${slug}`);
export const postIp = (postId) => api.get(`/post/ip/add/${postId}`);
export const quizAll = (slug) => api.get(`/quiz/${slug}`); 
export const quizShow = (quizId) => api.get(`/quiz/view/${quizId}`);
export const quizRandomShow = (playBy,postBy, postId) => api.get(`/quiz/view/random/${playBy}/${postBy}/${postId}`);
export const quizCreate = (quizData) => api.post(`/quiz/add`, quizData);
export const quizUpdate = (quizData,quizId) => api.put(`/quiz/edit/${quizId}`, quizData);
export const quizDelete = (quizId) => api.delete(`/quiz/delete/${quizId}`);
export const quizStart = (quizPayData) => api.post(`/quiz/pay/add`, quizPayData);
export const quizPayPostwiseAll = (slug) => api.get(`/quizpay/postwise/${slug}`); 
export const rewardShow = (postId) => api.get(`/reward/view/${postId}`);
export const rewardUpdate = (rewardData) => api.put(`/reward/edit`, rewardData);
export const quizAnswerCreate = (id,quizAnswerData) => api.post(`/quiz/answer/${id}`, quizAnswerData);
export const chatSend = (chatData) => api.post(`/chat/send`, chatData);
export const chatRecieve = (chatData) => api.post(`/chat/recieve`, chatData);
export const followUpdate = (followData) => api.post(`/follow/edit`, followData);
export const followAll = (id) => api.get(`/follow/list/${id}`);
export const followShow = (followData) => api.post(`/follow/show`, followData);
export const payment = (paymentData) => api.post(`/wallet/payment`, paymentData);
export const paymentCapture = (paymentData) => api.post(`/wallet/payment/capture`, paymentData);

