import { useState } from 'react';
import { patchReviewVotes } from './api';

export const Vote = ({
	review,
	reviews,
	setReview,
	setReviews,
	setVoteError,
}) => {
	const [voteClicked, setVoteClicked] = useState(true);

	const handleVoteClick = async (id) => {
		let vote = voteClicked ? 1 : -1;
		try {
			setVoteClicked((voteClicked) => !voteClicked);
			if (!reviews) {
				setReview({ ...review, votes: review.votes + vote });
			} else {
				setReviews(
					reviews.map((review) => {
						if (review.review_id === id) {
							return { ...review, votes: review.votes + vote };
						}
						return review;
					})
				);
			}
			await patchReviewVotes(id, vote);
			setVoteError(false);
		} catch (error) {
			setVoteError(true);
		}
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
