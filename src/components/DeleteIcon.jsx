import { deleteComment } from './api';

export const DeleteIcon = ({ comment, user, setDeleteClicked, setDeleteError, deleteError}) => {

	const handleDeleteOnClick = async (id) => {
    try {
      await deleteComment(id);
		} catch (error) {
      console.log(error)
      setDeleteError(true);
		}
    if(!deleteError) setDeleteClicked({ id: id, clicked: true });
	};

	return (
		<section className='comment-delete'>
			<p className='comment-votes'>
				<span className='material-symbols-outlined'>favorite</span>
				{comment.votes}
			</p>
			{comment.author === user ? (
				<p className='comment-delete-icon'>
					<span
						className='material-symbols-outlined'
						onClick={() => handleDeleteOnClick(comment.comment_id)}
					>
						delete
					</span>
				</p>
			) : null}
      {deleteError? (<p className='error'>unable to delete comment from API...</p>) : null}
		</section>
	);
};
