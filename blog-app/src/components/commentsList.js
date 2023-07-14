const CommentsList = ({ comments }) =>{
    return (
        <>
        <h3>Comments</h3>
        <div>
            {comments.map((comment) =>
                <div className= "comments" key = {comment.postedBy + ':' + comment.comment}>
                    <h4>{comment.postedBy}</h4>
                    <p>{comment.comment}</p>
                </div>
            )}

        </div>

        </>    
    )
}
export default CommentsList