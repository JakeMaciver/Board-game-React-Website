import { useEffect } from "react";


export const CommentCounter = ({review, setCommentsVisible, setCommentCounter, commentCounter}) => {
  
  const handleOnClick = () => {
    setCommentsVisible((commentsVisible) => !commentsVisible);
	};
  
  useEffect(() => {
setCommentCounter(review.comment_count);
  }, [review.comment_count, setCommentCounter])

	return (
		<p>
			<span className='material-symbols-outlined' onClick={handleOnClick}>
				chat
			</span>
			{commentCounter}
		</p>
	);
};
