import { createSlice } from '@reduxjs/toolkit';

export const recetappSlice = createSlice({
    name: 'recetapp',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        addNewNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        unsetActiveNote: (state, action) => {
            state.active = null;
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map((note) => {
                if (note.id === action.payload.id)
                    return action.payload;

                return note;
            });

            state.messageSaved = `La receta ha sido guardada exitosamente`;
        },
        setPhotosToActiveNote: (state, action) => {
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload]
            state.isSaving = false;
        },
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        },
        deleteNoteById: (state, action) => {
            state.active = null;
            state.notes = state.notes.filter(note => note.id !== action.payload);
            state.isSaving = false;
            state.messageSaved = `La receta ha sido eliminada exitosamente`;
        },
    }
});


// Action creators are generated for each case reducer function
export const {
    addNewEmptyNote,
    addNewNote,
    clearNotesLogout,
    deleteNoteById,
    savingNewNote,
    setActiveNote,
    unsetActiveNote,
    setNotes,
    setPhotosToActiveNote,
    setSaving,
    updateNote,
} = recetappSlice.actions;