import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { HomeOutlined, LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { startLogout } from '../../store';
import { unsetActiveNote } from '../../store/recetapp';


export const NavBar = ({ drawerWidth = 240 }) => {

    const dispatch = useDispatch();
    const { displayName } = useSelector(state => state.auth);

    const handleOnClick = () => {
        dispatch(unsetActiveNote());
    }

    const onLogout = () => {
        dispatch(startLogout());
    }

    return (
        <AppBar
            position='fixed'
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` }
            }}
        >
            <Toolbar>
                <IconButton
                    color='inherit'
                    edge="start"
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuOutlined />
                </IconButton>

                <Grid container direction='row' justifyContent='space-between' alignItems='center'>

                    <Typography variant='h6' noWrap component='div' sx={{ color: 'tertiary.main' }}>
                        <IconButton onClick={handleOnClick}>
                            <HomeOutlined sx={{ color: 'tertiary.main' }}></HomeOutlined>
                        </IconButton> 
                    </Typography>
                    <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant='h6' noWrap component='div' sx={{ pr: 2, color: 'tertiary.main' }}> {displayName} </Typography>
                        <IconButton sx={{ color: 'tertiary.main' }} onClick={onLogout}>
                            <LogoutOutlined />
                        </IconButton>
                    </Grid>
                </Grid>

            </Toolbar>
        </AppBar>
    )
}
