import axios from "axios"

const api = axios.create({baseURL: 'https://board-games-api.onrender.com/api/'});

export const getReviews = async (category, sort = 'created_at', order = 'desc') => {
	let request = '/reviews';

	if (category || sort || order) {
		request += '?';

		if (category) {
			request += `category=${category}`;
			if (sort || order) {
				request += '&';
			}
		}

		if (sort) {
			request += `sort_by=${sort}`;
			if (order) {
				request += '&';
			}
		}

		if (order) {
			request += `order=${order}`;
		}
	}

	const { data } = await api.get(request);
	return data.reviews;
};

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

export const deleteComment = async (comment_id) => {
  await api.delete(`comments/${comment_id}`);
}

export const getUser = async (username) => {
  const {data} = await api.get(`users?username=${username}`);
  return data.users;
}