import { useParams, Link} from "react-router-dom";
import { useState, useEffect } from "react";
import articles from "./Article-content";
import NotFoundPage from "./NotFoundPage";
import axios from "axios"
import CommentsList from "../components/commentsList";
import AddCommentForm from "../components/addCommentForm";
import useUser from "../hooks/useUser";

const ArticlePage = () =>{
    const [articleInfo, setArticleInfo] = useState({upvote: 0, comments: [], canUpvote: false})
    const {articleId} = useParams();
    const {canUpvote} = articleInfo
    
    const {user, isLoading} = useUser();

    useEffect(()=>{
        const loadArticleInfo = async () =>{
            const token = user && await user.getIdToken();
            const headers = token ? {authtoken: token} : {};
            const response = await axios.get(`https://myreactblogapp.uc.r.appspot.com/api/articles/${articleId}`,
                {headers},)
            const newArticleInfo = response.data
            setArticleInfo(newArticleInfo)
        }
        if(!isLoading){
            loadArticleInfo();
        }
        
    }, [isLoading, user])

    const addUpvote = async () =>{
        const token = user && await user.getIdToken();
        const headers = token ? {authtoken: token} : {}
        const response = await axios.put(`https://myreactblogapp.uc.r.appspot.com/api/${articleId}/upvote`, null, {headers})
        setArticleInfo(response.data)
    }

    const article = articles.find(article =>  article.name === articleId )

    if (article == null){
        return <NotFoundPage />
    }
    return(
        <>
        <h1>{article.title}</h1>
        <div className="upvotes-section">
            {user ? <button onClick={addUpvote}>{ canUpvote? 'Upvote' : 'Already upvoted'}</button>
            : <button><Link className="link" to="/login">Login to upvote</Link></button>}
            
           <p>The article has {articleInfo.upvote} upvote(s).</p>
        </div>
        {article.content.map((articlePara, i) =>
            <p key = {i}>{articlePara}</p>  
        )}
        {user ? <AddCommentForm articleName={articleId} onUpdatedArticle={updatedArticle => setArticleInfo(updatedArticle)}/>
        :<button><Link className="link" to="/login">Login to add comment</Link></button>}
       
        <CommentsList comments={articleInfo.comments}/>

        </>
        
    )
}
export default ArticlePage;

