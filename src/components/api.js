import axios from "axios"

const api = axios.create({baseURL: 'https://board-games-api.onrender.com/api/'});

export const getReviews = async (category) => {
  let request = `/reviews`;
  if (category) request = `/reviews?category=${category}`;
  const {data} = await api.get(request);
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

export const patchReviewVotes = async (id, vote) => {
	const { data } = await api.patch(`reviews/${id}`, { inc_votes: vote });
	return data.review;
};

export const postComment = async (id, comment) => {
  const {data} = await api.post(`reviews/${id}/comments`, comment);
  return data.comment[0];
}

export const getCategories = async () => {
  const {data} = await api.get(`categories`);
  return data.categories;
}