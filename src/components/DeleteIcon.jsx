import { deleteComment } from "./api";

export const DeleteIcon = ({comment, setComments, user}) => {

  const handleDeleteOnClick = async (id) => {
    setComments((comments) => [...comments].filter(comment => comment.comment_id !== id))
    await deleteComment(id);
  }

  return (
		<section className='comment-delete'>
			<p className='comment-votes'>
				<span className='material-symbols-outlined'>favorite</span>
				{comment.votes}
			</p>
			{comment.author === user ? (
				<p className='comment-delete-icon'>
					<span className='material-symbols-outlined' onClick={() => handleDeleteOnClick(comment.comment_id)}>delete</span>
				</p>
			) : null}
		</section>
	);
}