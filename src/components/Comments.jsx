import { useEffect, useState } from "react";
import { getCommentById } from "./api";
import { formatTime } from "./utils";
import { DeleteIcon } from "./DeleteIcon";

export const Comments = ({setCommentError, setComments, review_id, commentError, comments, commentsVisible, user}) => {

  const [deleteClicked, setDeleteClicked] = useState({
		id: null,
		clicked: false,
	});

  const [deleteError, setDeleteError] = useState(false);

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
	}, [review_id, setCommentError, setComments, deleteClicked, deleteError]);

	return (
		<li className='comments'>
			{commentError ? (
				<p>{commentError}</p>
			) : commentsVisible ? (
				<ul className='comments-list'>
					{comments.map((comment) => {
            if (
							deleteClicked.clicked &&
							comment.comment_id === deleteClicked.id
						)
							return <li key={'delete-message'}><p className='error'>Comment is being deleted...</p></li>; 
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
								<DeleteIcon
									comment={comment}
									user={user}
									setComments={setComments}
									setDeleteClicked={setDeleteClicked}
									deleteClicked={deleteClicked}
                  setDeleteError={setDeleteError}
                  deleteError={deleteError}
								/>
								<p className='comment-body'>{comment.body}</p>
							</li>
						);
					})}
				</ul>
			) : null}
		</li>
	);
};
