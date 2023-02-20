import {redirect} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import NewNote, {links as newNoteLinks} from '../components/NewNote';
import NoteList, {links as noteListLinks} from '../components/NoteList';
import { getStoredNotes, storeNotes } from '../data/notesData';

export default NotesPage = ()  => {

    const notes = useLoaderData();  //gives access to the data returned ny laoder
    
    
    return(
        <main>
            <NewNote />
            <NoteList notes={notes} />
        </main>
    )
}

export async function loader() {
    //Get stored notes from the database-
    const notes = await getStoredNotes();
    return notes;
    // return json(notes)
}

export async function action({request}){
    const formData = await request.formData(); //to extract fotm data from request
    const noteData = Object.fromEntries(formData); //converted into standard plain js object
    // noteData.title

    //Add validations-
    if(noteData.title.trim().length < 5){
        //alert(); //cannot use browser method in code running in backend
        return ({message: 'Invalid title - must be atleast 4 characters long'});
    }


    //Add this incoming note to existing notes-
    const existingNotes = await getStoredNotes();
    //add new property to incoming noteData-
    noteData.id = new Date().toISOString();
    //adding to existing notes-
    const updatedNotes = existingNotes.concat(noteData);
    //Now store it in notes.json-
    await storeNotes(updatedNotes);
    //response-
    return redirect('/notes');

}

export function links(){
    return [...newNoteLinks(), ...noteListLinks()];
}