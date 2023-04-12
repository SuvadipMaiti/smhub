export const register = () => `/register`;
export const login = () => `/login`;
export const dashboard = () => `/`;
export const profile = () => `/profile`;
export const profilePageByProfileId = (profileid) => `/profile/page/${profileid}`;
export const profilePageById = (id) => `/profile/page/${id}`;
export const postBySlug = (slug) => `/post/${slug}`;
export const profilePostById = (id) => `/profile/post/${id}`;
export const postQuizListByIdSlug = (id,slug) => `/post/quiz/list/${id}/${slug}`;
export const postSearch = () => `/post/search`;
export const postCreate = () => `/post/create`;
export const theme = () => `/theme`;

