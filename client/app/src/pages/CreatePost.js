import ReactQuill from "react-quill-new"; 
import 'react-quill-new/dist/quill.snow.css'; 
import {useState} from "react";
import {Navigate} from "react-router-dom";
import Editor from "../Editor"; 





export default function CreatePost() {
    const [title,setTitle] = useState(''); 
    const [summary,setSummary] = useState(''); 
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    function FileChange(ev) {
      const file = ev.target.files[0]; 
      if (file && !file.type.startsWith('image/')) {
        alert('Not an image. Try again'); 
        return; 
      }
      setFiles(ev.target.files); 
    }

    async function createNewPost(ev) {
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/post', {
          method: 'POST',
          body: data,
          credentials: 'include',
        });
        if (response.ok) {
          setRedirect(true);
        }
      }

      if (redirect) {
        return <Navigate to={'/'} />
      }
    return (
       <form onSubmit={createNewPost} >
        <input 
                type="text" 
                placeholder="Title"
                value={title}
                onChange={ev => setTitle(ev.target.value.slice(0, 100))}
            />
            <p>{100 - title.length} characters remaining</p>
        <input type="summary" 
        placeholder={'Summary'}
        value={summary} 
        onChange={ev => setSummary(ev.target.value)} />
        <input type="file" onChange={ev => setFiles(ev.target.files)} />
        <Editor value={content} onChange={setContent} />
        <button style = {{marginTop: '5px'}}> Create post </button>
       </form>
    ); 
}