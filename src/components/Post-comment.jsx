import { useState, useEffect } from 'react';
import { postComment } from './api';

export const PostComment = ({
	user,
	review_id,
	setComments,
	setCommentCounter,
	setCommentsVisible,
}) => {
	const [commentText, setCommentText] = useState('');
	const [commentSubmitClicked, setCommentSubmitClicked] = useState(false);
	const [postBody, setPostBody] = useState({});
	const [postCommentError, setPostCommentError] = useState(false);
	const [commentHasPosted, setCommentHasPosted] = useState(false);
	const [apiCommentError, setApiCommentError] = useState(false);

	const handlePostCommentClick = (event) => {
		event.preventDefault();
		if (commentText) {
			setPostCommentError(false);
			setPostBody({ body: commentText, username: user });
			setCommentSubmitClicked(true);
			setCommentText('');
			setCommentHasPosted(true);
		} else {
			setPostCommentError(true);
		}
	};

	useEffect(() => {
		const postItem = async () => {
			try {
				const data = await postComment(review_id, postBody);
				setComments((comments) => [data, ...comments]);
				setCommentCounter((commentCount) => Number(commentCount) + 1);
			} catch (error) {
				console.log('got here');
				setApiCommentError(true);
			}
		};
		if (commentSubmitClicked) {
			postItem();
			setCommentSubmitClicked(false);
		}
		const timeout = setTimeout(() => {
			setCommentsVisible(true);
			setCommentHasPosted(false);
		}, 3000);
		return () => clearTimeout(timeout);
	}, [commentSubmitClicked]);

	return (
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
			) : !apiCommentError ? (
				<p className='success-posting-comment'>Your comment has been posted</p>
			) : (
				<p className='error'>
					Not able to post your comment, check your connection...
				</p>
			)}
		</li>
	);
};
