import axios from "axios";
import { useState } from "react";
import useUser from "../hooks/useUser";


const AddCommentForm = ({ articleName, onUpdatedArticle }) =>{
    const [name, setName] = useState('');
    const [commentText, setCommentText] = useState('')

    const {user} = useUser();

    const addComments = async () =>{
        const token = user && await user.getIdToken();
        const headers = token ? {authtoken: token} : {};
        const response = await axios.post(`https://myreactblogapp.uc.r.appspot.com/api/articles/${articleName}/comments`, {
            postedBy: name, 
            comment: commentText},
            { headers }, );
        const updatedArticle = response.data
        onUpdatedArticle(updatedArticle)
        setName('')
        setCommentText('')
    }
    return (
        <div className="add-comment-form">
            <h3>Add a comment</h3>
            {user && <p>your are posting as {user.email}</p>}
            <textarea 
                value = {commentText}
                onChange={e => setCommentText(e.target.value)}
                rows="4" cols="50"></textarea>
            <button onClick={addComments}>Add Comment</button>
        </div>
    )

}
export default AddCommentForm;