import { formatISO9075 } from "date-fns";
import { format } from 'date-fns';
import {useContext, useEffect, useState} from "react"; 
import {useParams, Navigate} from "react-router-dom"; 
import {UserContext} from "../UserContext"; 
import {Link} from 'react-router-dom';

export default function PostPage() {
    const [postInfo, setPostInfo] = useState(null); 
    const {userInfo} = useContext(UserContext); 
    const {id} = useParams(); 
    const [redirect, setRedirect] = useState(false); 
    const [loading, setLoading] = useState(true);
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    //if user is not logged and tries to view a post, redirect them to the loginpage. 
    useEffect(() => {
        if (!userInfo) {
            setRedirectToLogin(true); 
            return;
        }
        fetch(`http://localhost:4000/post/${id}`)
            .then(response => response.json())
            .then(postInfo => {
                setPostInfo(postInfo);
                setLoading(false);
            });
    }, [id, userInfo]);
    if (redirectToLogin) {
        return <Navigate to="/login" />;
    }

    if (loading) return <p>Loading post...</p>;
    if (!postInfo) return 'Nothing';

    function likePost() {
    fetch(`http://localhost:4000/post/${id}/like`, { 
        method: "POST", 
        credentials: "include" 
    })
    .then(response => response.json())
    .then(data => {
        setPostInfo(prev => ({ ...prev, likes: data.likes }));
    });
}


async function deletePost() {
    const confirm_d = window.confirm('Are you sure you want to delete this post? It cannot be recovered'); 
    if (!confirm_d) return; 
    const response = await fetch(`http://localhost:4000/post/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    });
    if (response.ok) {
        setRedirect(true); 
    } else {
        alert('Post was not deleted. Try again'); 
    }
    }
    if (redirect) {
        return <Navigate to="/" />; 
    }

if (loading) return <p>Loading post...</p>;

    if (!postInfo) return 'Nothing'; 
    return (
        <div className="post-page">
            <h1> {postInfo.title} </h1>
            <time> {format(new Date(postInfo.createdAt), 'MMMM dd, yyyy h:mm a')} </time>
            <div className="author"> Post by: {postInfo.author.username} </div>
            <div className="post-actions">
            <p> Views: {postInfo.views || 0}</p>
    <button onClick={likePost} style={{ marginRight: "10px", marginBottom: "15px", cursor: "pointer" }}>
        👍 {postInfo.likes || 0}
    </button>
</div>

            {userInfo.id === postInfo.author._id && (
                <div className="edit-row">
                    <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            Edit your Post 
            </Link>
            <button onClick={deletePost} style={{ marginLeft: '10px', marginTop: '20px', color: 'black', backgroundColor: 'yellow', padding: '5px 26px', border: 'none', cursor: 'pointer' }}>
                        Delete Post
                    </button>
            </div>
            )}
            <div className="image">
     <a href={`http://localhost:4000/${postInfo.cover}`} target="_blank" rel="noopener noreferrer">
     <img src={postInfo.cover ? `http://localhost:4000/${postInfo.cover}` : "/logo192.png"} alt=""/>

    </a>
    </div>
             <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content}} />
             </div>
    ); 

}