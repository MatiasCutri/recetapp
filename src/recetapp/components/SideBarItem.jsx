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

    const onClickNote = () => {
        dispatch( setActiveNote(note) );
    }

    return (
        <ListItem disablePadding>
            <ListItemButton onClick={ onClickNote }>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={ newTitle } />
                    <ListItemText secondary={ note.body } />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}