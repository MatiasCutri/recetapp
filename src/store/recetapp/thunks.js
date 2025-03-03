import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, addNewNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./recetappSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";

import zapallitosImage from '../../assets/zapallitos.jpg';

const addTemplateNote = () => {
    return async (dispatch, getState) => {

        dispatch(savingNewNote());

        const { uid } = getState().auth;

        const response = await fetch(zapallitosImage);
        const blob = await response.blob();
        const file = new File([blob], "zapallitos.jpg", { type: "image/jpeg" });
        
        const photoUrl = await fileUpload(file);

        const templateNote = {
            nombreReceta: 'Zapallitos Rellenos',
            salado: true,
            dulce: false,
            porciones: 4,
            horasPreparacion: 0,
            minutosPreparacion: 30,
            dificultad: 2,
            ingredientes: [
                { ingrediente: 'Zapallitos cocidos', cantidad: '2' },
                { ingrediente: 'Cebolla de verdeo', cantidad: '2' },
                { ingrediente: 'Morrón rojo', cantidad: '1 trozo' },
                { ingrediente: 'Cebolla', cantidad: '1/2' },
                { ingrediente: 'Diente de ajo', cantidad: '2' },
                { ingrediente: 'Berenjena', cantidad: '1/2' },
                { ingrediente: 'Quinoa cocida', cantidad: '1/2 taza' },
                { ingrediente: 'Pan rallado', cantidad: 'c/n' },
                { ingrediente: 'Aceite de oliva', cantidad: 'c/n' },
                { ingrediente: 'Sal y pimienta', cantidad: 'A gusto' },

            ],
            preparacion: '* Paso 1 \nDejar que se enfríen los zapallitos, cortarlos por la mitad y ahuecarlos con una cucharita. Si el centro no está cocido, no te preocupes, porque los cocinaremos con las verduras. Picar la pulpa extraída.\n\n* Paso 2 \nSaltear las verduras con la pulpa en una sartén caliente con un poco de aceite a fuego bajo.\n\n* Paso 3 \nDejar enfriar las verduras y triturarlas hasta que quede una pasta suave. Salpimentar.\n\n* Paso 4 \nMezclar las verduras trituradas con la quinoa, quedará una especie de pasta cremosa. Rellenar los zapallitos. Esparcir por encima el pan rallado y un chorrito de aceite, esto hará que queden dorados.\n\n* Paso 5 \nSe pueden congelar así y cocinar directamente en el horno a la hora de consumir.',
            notas: '* Duración congelado: 3 Meses. \n* Descongelar en el horno.',
            imageUrls: [photoUrl],
            date: new Date().getTime()
        };

        
        const newDoc = doc(collection(FirebaseDB, `${uid}/recetapp/recipes`));  
        await setDoc(newDoc, templateNote);
        
        dispatch(addNewNote(templateNote));
    }
}

export const startNewNote = () => {
    return async (dispatch, getState) => {

        dispatch(savingNewNote());

        const { uid } = getState().auth;

        const newNote = {
            nombreReceta: '',
            salado: false,
            dulce: false,
            porciones: 0,
            horasPreparacion: 0,
            minutosPreparacion: 0,
            dificultad: 0,
            ingredientes: [],
            preparacion: '',
            notas: '',
            imageUrls: [],
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/recetapp/recipes`));
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        if (!uid) throw new Error('El UID del usuario no existe');

        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));

        if (notes.length < 1) {
            dispatch(addTemplateNote());
        }
    }
}

export const startSaveNote = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving());

        const { uid } = getState().auth;
        const { active: note } = getState().recetapp;

        const noteToFireStore = { ...note };

        delete noteToFireStore.id;

        const docRef = doc(FirebaseDB, `${uid}/recetapp/recipes/${note.id}`)
        await setDoc(docRef, noteToFireStore, { merge: true });

        dispatch(updateNote(note));
    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {
        dispatch(setSaving());

        const fileUploadPromises = []
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file));
        }

        const photosUrls = await Promise.all(fileUploadPromises);
        dispatch(setPhotosToActiveNote(photosUrls));
    }
}

export const startDeletingNote = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving());

        const { uid } = getState().auth;
        const { active: note } = getState().recetapp;

        const docRef = doc(FirebaseDB, `${uid}/recetapp/recipes/${note.id}`);
        await deleteDoc(docRef);
        dispatch(deleteNoteById(note.id));
    }
}