import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleReview, getCommentById } from './api';

export const SingleReview = () => {
	const [review, setReview] = useState([]);
	const [comments, setComments] = useState([]);
	let { review_id } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isComments, setIsComments] = useState(false);

	const handleOnClick = () => {
		setIsComments((isComments) => !isComments);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getSingleReview(review_id);
				const commentData = await getCommentById(review_id);
				setReview(data);
				setComments(commentData);
			} catch (error) {
				setError('Error fetching data from api');
			}
			setIsLoading(false);
		};
		fetchData();
	}, [review_id, isComments]);

	return (
		<ul className='single-review'>
			{isLoading ? (
				<p className='loading-text'>Loading content...</p>
			) : error ? (
				<p>{error}</p>
			) : (
				<ul className='cards-list'>
					<li className='review'>
						<section className='review-category-box'>
							<span className='material-symbols-outlined'>category</span>
							<p>/category/{review.category}</p>
						</section>
						<h2 className='review-title'>{review.title}</h2>
						<section className='review-sub-text'>
							<p>by {review.owner}</p>
							<p>on {review.created_at}</p>
						</section>
						<img
							src={review.review_img_url}
							alt={review.title}
							className='review-img'
						></img>
						<p className='review-created-by'>
							Game created by {review.designer}
						</p>
						<p className='review-body'>{review.review_body}</p>
						<section className='review-footer'>
							<p>
								<span
									className='material-symbols-outlined'
									onClick={handleOnClick}
								>
									chat
								</span>
								{review.comment_count}
							</p>
							<p>
								<span className='material-symbols-outlined'>favorite</span>
								{review.votes}
							</p>
						</section>
					</li>
				</ul>
			)}
			<li className='post-comment'></li>
			{isComments ? (
				<li className='comments'>
					<ul className='comments-list'>
						{comments.map((comment) => {
							return (
								<li key={comment.comment_id} className='comment'>
									<section className='comment-user-box'>
										<span className='material-symbols-outlined'>
											account_circle
										</span>
										<p>{comment.author}</p>
										<p className='comment-created'> on {comment.created_at}</p>
									</section>
									<p className='comment-body'>{comment.body}</p>
									<p>
										<span className='material-symbols-outlined'>favorite</span>
										{comment.votes}
									</p>
								</li>
							);
						})}
					</ul>
				</li>
			) : null}
		</ul>
	);
};
