import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleReview, getCommentById, postComment } from './api';
import { formatTime } from './utils';
import { Vote } from './Vote';

export const SingleReview = ({ user }) => {
	const [review, setReview] = useState([]);
	let { review_id } = useParams();
	const [reviewError, setReviewError] = useState(null);

	const [isLoading, setIsLoading] = useState(true);

	const [comments, setComments] = useState([]);
	const [commentError, setCommentError] = useState(null);
	const [commentsVisible, setCommentsVisible] = useState(false);

	const [voteError, setVoteError] = useState(false);

	const [commentText, setCommentText] = useState('');
	const [commentSubmitClicked, setCommentSubmitClicked] = useState(false);
	const [postBody, setPostBody] = useState({});
	const [postCommentError, setPostCommentError] = useState(false);
	const [commentHasPosted, setCommentHasPosted] = useState(false);

	const handleOnClick = () => {
		setCommentsVisible((commentsVisible) => !commentsVisible);
	};

	const handlePostCommentClick = (event) => {
		event.preventDefault();
		if (commentText) {
			setPostCommentError(false);
			setPostBody({ body: commentText, username: user });
			setCommentSubmitClicked(true);
			setCommentText('');
		} else {
			setPostCommentError(true);
		}
	};

	useEffect(() => {
		const postItem = async () => {
			try {
				const data = await postComment(review_id, postBody);
				setComments((comments) => [data, ...comments]);
				setCommentHasPosted(true);
			} catch (error) {}
		};
		if (commentSubmitClicked) {
			postItem();
			setCommentSubmitClicked(false);
		}
		setCommentHasPosted(false);
	}, [commentSubmitClicked, postBody, review_id]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getSingleReview(review_id);
				setReview(data);
			} catch (error) {
				setReviewError('Error fetching review data from api');
			}
			try {
				const commentData = await getCommentById(review_id);
				setComments(commentData);
			} catch (error) {
				setCommentError('Error fetching comment data from api');
			}
			setIsLoading(false);
		};
		fetchData();
	}, [review_id]);

	return (
		<ul className='single-review'>
			{isLoading ? (
				<p className='loading-text'>Loading content...</p>
			) : reviewError ? (
				<p>{reviewError}</p>
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
							<p>on {formatTime(review.created_at)}</p>
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
							<Vote
								review={review}
								setVoteError={setVoteError}
								setReview={setReview}
								voteError={voteError}
							/>
							{voteError ? (
								<p className='error'>
									Could not process vote, check connection...
								</p>
							) : null}
						</section>
					</li>
				</ul>
			)}

			<li className='post-comment'>
				{!commentHasPosted ? (
					<form
						className='post-comment-form'
						onSubmit={(event) => handlePostCommentClick(event)}
					>
						<textarea
							className='post-comment-text'
							value={commentText}
							name='comment'
							onChange={(event) => setCommentText(event.target.value)}
						></textarea>
						{postCommentError ? (
							<p className='error'>Enter some text before posting...</p>
						) : null}
						<button type='submit' className='post-comment-button'>
							Post comment
						</button>
					</form>
				) : (
					<p>Posting your comment...</p>
				)}
			</li>

			<li className='comments'>
				{commentError ? (
					<p>{commentError}</p>
				) : commentsVisible ? (
					<ul className='comments-list'>
						{comments.map((comment) => {
							return (
								<li key={comment.comment_id} className='comment'>
									<section className='comment-user-box'>
										<span className='material-symbols-outlined'>
											account_circle
										</span>
										<p>{comment.author}</p>
										<p className='comment-created'>
											{' '}
											on {formatTime(comment.created_at)}
										</p>
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
				) : null}
			</li>
		</ul>
	);
};
