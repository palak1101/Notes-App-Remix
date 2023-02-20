import {Form, useActionData} from '@remix-run/react';
import NewNoteStyles from '../styles/NewNote.css';

export default NewNote = () => {
    const data = useActionData();

    return(
        <Form method="post" id="note-form">
        
        {data?.message && <p>{data.message}</p>}

            <p>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" required />
            </p>

            <p>
                <label htmlFor="content">Content</label>
                <textarea id="content" name="content" rows="5" required />
            </p>

            <div className="form-actions">
                <button>ADD</button>
            </div>

        </Form>
    )
}

export function links(){
    return [{rel: 'stylesheet', href: NewNoteStyles}]
}