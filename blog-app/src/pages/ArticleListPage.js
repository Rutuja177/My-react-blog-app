import articles from "./Article-content";
import ArticlesList from "../components/ArticlesList";



const ArticleList = () =>{
    return(
        <>
            <h1>Articles</h1>
            <div>
                <ArticlesList articles = {articles}/>
            </div>
            
        </>
        

    )
}
export default ArticleList;