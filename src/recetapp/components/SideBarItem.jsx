import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { TurnedInNot } from '@mui/icons-material';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { setActiveNote } from '../../store/recetapp';

export const SideBarItem = ( {note} ) => {

    const dispatch = useDispatch();

    const newTitle = useMemo( () => {
        return note.nombreReceta?.length > 20
                ? note.nombreReceta.substring(0,20) + '...'
                : note.nombreReceta;
    }, [note.nombreReceta]);

    const dateString = useMemo(() => {
        const newDate = new Date(note.date);
        return newDate.toLocaleString();
    }, [note.date]);

    const onClickNote = () => {
        dispatch( setActiveNote(note) );
    }

    return (
        <ListItem disablePadding>
            <ListItemButton onClick={ onClickNote }>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container direction="column">
                    <ListItemText primary={ newTitle } />
                    <ListItemText secondary={ dateString } />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}