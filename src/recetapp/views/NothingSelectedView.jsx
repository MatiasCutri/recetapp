import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Grid, Typography } from '@mui/material';
import { SoupKitchenOutlined } from '@mui/icons-material';

import Swal from 'sweetalert2';


export const NothingSelectedView = () => {

  const { messageSaved } = useSelector(state => state.recetapp);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('', messageSaved, 'success');
    }
  }, [messageSaved])


  return (
    <Grid
      className='animate__animated animate__fadeIn animate__faster'
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: 'calc(100vh - 110px)', backgroundColor: 'primary.main', borderRadius: 3 }}
    >
      <Grid item xs={12}>
        <SoupKitchenOutlined sx={{ fontSize: 100, color: 'white' }} />
      </Grid>
      <Grid item xs={12}>
        <Typography color="white" variant='h5'>Selecciona o crea una nueva receta</Typography>
      </Grid>
    </Grid>
  )
}