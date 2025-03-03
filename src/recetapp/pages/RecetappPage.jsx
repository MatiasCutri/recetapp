import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

import { RecetappLayout } from '../layout/RecetappLayout';
import { NoteView, NothingSelectedView } from '../views';
import { startNewNote } from '../../store/recetapp';
import { useDispatch, useSelector } from 'react-redux';


export const RecetappPage = () => {

  const dispatch = useDispatch();
  const { isSaving, active: hayNotaActiva } = useSelector(state => state.recetapp);

  const onClickNewNote = () => {
    dispatch(startNewNote());
  }

  return (
    <RecetappLayout>

      {
        (!!hayNotaActiva)
          ? <NoteView />
          : <NothingSelectedView />
      }

      <IconButton
        disabled={isSaving}
        onClick={onClickNewNote}
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'secondary.main',
          ':hover': { backgroundColor: 'secondary.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>

    </RecetappLayout>
  )
}