import { useEffect } from "react";
import { getCommentById } from "./api";
import { formatTime } from "./utils";

export const Comments = ({setCommentError, setComments, review_id, commentError, comments, commentsVisible}) => {

  useEffect(() => {
		const fetchData = async () => {
			try {
				const commentData = await getCommentById(review_id);
				setComments(commentData);
			} catch (error) {
				setCommentError('Error fetching comment data from api');
			}
		};
		fetchData();
	}, [review_id]);

	return (
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
	);
};
