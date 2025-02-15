import ReactQuill from "react-quill-new"; 
import 'react-quill-new/dist/quill.snow.css'; 
import {useState} from "react";
import {Navigate} from "react-router-dom";

const modules = {
    toolbar: [
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }]
    ]
}

const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'link', 'image'
];



export default function CreatePost() {
    const [title,setTitle] = useState(''); 
    const [summary,setSummary] = useState(''); 
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);
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
        <input type="title" placeholder={'Title'}
         onChange={ev => setTitle(ev.target.value)} />
        <input type="summary" placeholder={'Summary'} 
        onChange={ev => setSummary(ev.target.value)} />
        <input type="file" onChange={ev => setFiles(ev.target.files)} />
        <ReactQuill
        value={content}
        onChange={newValue => setContent(newValue)}
        module={modules}
        formats={formats} />
        <button style = {{marginTop: '5px'}}> Create post </button>
       </form>
    ); 
}