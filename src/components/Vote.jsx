import { useState } from 'react';
import { patchReviewVotes } from './api';

export const Vote = ({ review, reviews, setReviews }) => {
	const [voteClicked, setVoteClicked] = useState(true);

	const handleVoteClick = async (id) => {
		setVoteClicked((voteClicked) => !voteClicked);
		let vote = voteClicked ? 1 : -1;
		try {
			patchReviewVotes(id, vote);
		} catch (error) {
			return null;
		}
		setReviews(
			reviews.map((review) => {
				if (review.review_id === id) {
					return { ...review, votes: review.votes + vote };
				}
				return review;
			})
		);
	};

	return (
		<p>
			<span
				className='material-symbols-outlined'
				onClick={() => handleVoteClick(review.review_id)}
			>
				favorite
			</span>
			{review.votes}
		</p>
	);
};
