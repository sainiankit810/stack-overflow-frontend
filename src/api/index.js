import axios from 'axios'

const API = axios.create({ baseURL: 'https://stack-overflow-backend-pdiz.onrender.com'})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('Profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`
    }
    return req;
})

export const logIn = (authData) => API.post('/user/login', authData);
export const signUp = (authData) => API.post('/user/signup', authData);

export const postQuestion = (questionData) => API.post('./questions/Ask', questionData)
export const getAllQuestions = () => API.get('/questions/get');
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`)
export const voteQuestion = (id, value, userId) => API.patch(`/questions/vote/${id}`, {value, userId})
export const questionsAsked = (id) => API.get(`/questions/asked/${id}`);

export const postAnswer = (id, noOfAnswers, answerBody, userAnswered, userId) => API.patch(`/answer/post/${id}`, { noOfAnswers, answerBody, userAnswered, userId})
export const deleteAnswer = (id, answerId, noOfAnswers ) => API.patch(`/answer/delete/${id}`, { answerId, noOfAnswers})

export const fetchAllUsers = () => API.get('/user/getAllUsers');
export const updateProfile = (id, updateData) => API.patch(`/user/update/${id}`, updateData)

export const postChat = ( userId, promptValue ) => API.post("/chat/add", { userId, message: promptValue });
export const getChat = ( id ) => API.get(`/chat/get/${id}`);

export const sendOtp = (userId, email) => API.post('/otp/send-otp', { userId, email });
export const verifyOtp = (email, code) => API.post('/otp/verify-otp', { email, code });

export const order = (amount) => API.post('/subscription/order', { amount });
export const verifyOrder = (id, amount, response) => API.post('/subscription/is-order-complete', { id, amount, response });
export const checkSubs = (userId) => API.get(`/subscription/check-subscription/${userId}`);