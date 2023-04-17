import axios from "axios"

const api = axios.create({baseURL: 'https://board-games-api.onrender.com/api/'});

export const getReviews = async () => {
  const {data} = await api.get('reviews');
  return data.reviews;
}