import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleReview, getCommentById, postComment } from './api';
import { formatTime } from './utils';
import { SingleReviewCard } from './SingleReview';

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
	const [commentCounter, setCommentCounter] = useState(null);

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
      setCommentCounter((commentCount) => Number(commentCount)+1);
		}
		setCommentHasPosted(false);
	}, [commentSubmitClicked, postBody, review_id, commentHasPosted]);

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
				<SingleReviewCard
					review={review}
					setCommentCounter={setCommentCounter}
					setCommentsVisible={setCommentsVisible}
					setVoteError={setVoteError}
					setReview={setReview}
					voteError={voteError}
          commentCounter={commentCounter}
				/>
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
