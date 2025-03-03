import { useSelector } from 'react-redux';
import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material'
import { SideBarItem } from './SideBarItem';
import { useMemo } from 'react';

export const SideBar = ({ drawerWidth = 240 }) => {

    const { notes } = useSelector(state => state.recetapp);

    const sortedNotes = useMemo(() => {
        return [...notes].sort((a, b) => new Date(a.date) - new Date(b.date));
    }, [notes]);

    return (
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, color: 'secondary.main' }}
        >
            <Drawer
                variant='permanent' // temporary
                open
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >
                <Toolbar>
                    <Typography variant='h6' noWrap component='div' sx={{ color: 'tertiary.main' }}>
                        Recetapp - Mis recetas
                    </Typography>
                </Toolbar>
                <Divider />

                <List>
                    {
                        sortedNotes.map(note => (
                            <SideBarItem key={note.id} note={note} />
                        ))
                    }
                </List>

            </Drawer>

        </Box>
    )
}