import axios from "axios"

const api = axios.create({baseURL: 'https://board-games-api.onrender.com/api/'});

export const getReviews = async () => {
  const {data} = await api.get('reviews');
  return data.reviews;
}

export const getSingleReview = async (id) => {
  const {data} = await api.get(`reviews/${id}`);
  return data.review[0];
}

export const getCommentById = async (id) => {
  const {data} = await api.get(`reviews/${id}/comments`)
  return data.comments;
}