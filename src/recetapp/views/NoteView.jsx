import { useDispatch, useSelector } from 'react-redux';

import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Checkbox, CircularProgress, Grid, IconButton, Rating, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import { ImageGallery } from '../components'
import { useForm } from '../../hooks';
import { useEffect, useMemo, useRef, useState } from 'react';
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/recetapp';
import TablaIngredientes from '../components/TablaIngredientes';

export const NoteView = () => {

    const dispatch = useDispatch();
    const { active: note, messageSaved, isSaving } = useSelector(state => state.recetapp);

    const formValidations = {
        nombreReceta: [(value) => value.length >= 1, 'El nombre de la receta es obligatorio'],
    }

    const { nombreReceta, salado, dulce, porciones, horasPreparacion, minutosPreparacion, dificultad,
        ingredientes, preparacion, notas, date, onInputChange, formState, isFormValid, nombreRecetaValid } = useForm(note, formValidations);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toLocaleString();
    }, [date]);

    const fileInputRef = useRef();

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState])

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire('', messageSaved, 'success');
        }
    }, [messageSaved])

    const [formSubmitted, setformSubmitted] = useState(false);

    const onSaveNote = () => {
        setformSubmitted(true);

        if (!isFormValid) return;

        dispatch(startSaveNote());

        setformSubmitted(false);
    }

    const onFileInputChange = ({ target }) => {

        if (target.files.length === 0) return;

        dispatch(startUploadingFiles(target.files));
    }

    const onDelete = () => {
        dispatch(startDeletingNote());
    }

    return (
        <>
            {isSaving && (
                <Grid container justifyContent="center" alignItems="center" sx={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(255, 255, 255, 0.7)', zIndex: 9999 }}>
                    <CircularProgress />
                </Grid>
            )}
            <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}
                className='animate__animated animate__fadeIn animate__faster'>

                <Grid item container justifyContent="flex-end">
                    <input
                        type="file"
                        multiple
                        ref={fileInputRef}
                        onChange={onFileInputChange}
                        style={{ display: 'none' }}
                    />
                    <IconButton
                        disabled={isSaving}
                        onClick={() => fileInputRef.current.click()}
                        sx={{color: 'secondary.main'}}
                    >
                        <UploadOutlined sx={ {fontSize: 30, mr: 1 }} />
                    </IconButton>

                    <Button
                        disabled={isSaving}
                        onClick={onSaveNote}
                        sx={{ color: 'secondary.main'}}
                    >
                        <SaveOutlined sx={ {fontSize: 30 }} />
                    </Button>

                    <Button
                        disabled={isSaving}
                        onClick={onDelete}
                        sx={{ color: 'secondary.main' }}
                    >
                        <DeleteOutline sx={{ fontSize: 30 }} />
                    </Button>
                </Grid>

                <Grid container>
                    <TextField
                        type="text"
                        variant="filled"
                        fullWidth
                        placeholder="Ingrese el nombre de la receta"
                        label="Nombre de la receta"
                        sx={{ border: 'none', mb: 4, mt: 2 }}
                        name="nombreReceta"
                        value={nombreReceta}
                        onChange={onInputChange}
                        required
                        error={formSubmitted && !!nombreRecetaValid}
                        helperText={nombreRecetaValid}
                    />
                </Grid>

                <Grid container direction="row" spacing={2} justifyContent='space-between' sx={{ mb: 2 }}>

                    <Grid item container alignItems="center">
                        <Typography fontWeight='light'>Dulce: </Typography>
                        <Checkbox
                            sx={{ mr: 1 }}
                            checked={!!dulce}
                            name="dulce"
                            value={dulce}
                            onChange={onInputChange}
                        />

                        <Typography fontWeight='light'>Salado:</Typography>
                        <Checkbox
                            checked={!!salado}
                            name="salado"
                            onChange={onInputChange}
                        />

                        <Typography fontWeight='light' sx={{ ml: 2 }}>
                            Cant. de porciones:
                        </Typography>
                        <TextField
                            type="number"
                            variant="standard"
                            sx={{ ml: 1, width: '40px' }}
                            InputProps={{ inputProps: { min: 0 } }}
                            name="porciones"
                            value={porciones}
                            onChange={onInputChange}
                        />

                        <Typography fontWeight='light' sx={{ ml: 2 }}>Tiempo de preparación: </Typography>
                        <TextField
                            type="number"
                            variant="standard"
                            InputProps={{ inputProps: { min: 0, max: 24 } }}
                            sx={{ ml: 1, width: '40px' }}
                            name="horasPreparacion"
                            value={horasPreparacion}
                            onChange={onInputChange}
                        />
                        <Typography fontWeight='light' sx={{ ml: 1 }}>hs</Typography>

                        <TextField
                            type="number"
                            variant="standard"
                            InputProps={{ inputProps: { min: 0, max: 59 } }}
                            sx={{ ml: 1, width: '40px' }}
                            name="minutosPreparacion"
                            value={minutosPreparacion}
                            onChange={onInputChange}
                        />
                        <Typography fontWeight='light' sx={{ ml: 1 }}>min</Typography>
                    </Grid>
                </Grid>

                <Grid container sx={{ mb: 4, mt: 4 }}>
                    <Typography fontWeight='light' sx={{ mr: 1 }}>Nivel de dificultad:</Typography>
                    <Rating
                        name="dificultad"
                        value={dificultad}
                        onChange={(event, newValue) => {
                            onInputChange({ target: { name: 'dificultad', value: newValue } });
                        }}
                        defaultValue={0}
                    />
                </Grid>

                <Grid container sx={{ mb: 4 }}>
                    <TablaIngredientes ingredientes={ingredientes} onInputChange={onInputChange}/>
                </Grid>

                <Grid container>
                    <TextField
                        type="text"
                        variant="filled"
                        fullWidth
                        multiline
                        label="Preparación"
                        placeholder="Ingrese los pasos de la preparación"
                        minRows={10}
                        sx={{ mb: 1 }}
                        name="preparacion"
                        value={preparacion}
                        onChange={onInputChange}
                    />

                    <TextField
                        type="text"
                        variant="filled"
                        fullWidth
                        multiline
                        label="Notas"
                        placeholder="Ingrese las notas que desea: ¿Cuánto tiempo dura congelada?, ¿Cómo descongelar?, etc."
                        minRows={3}
                        name="notas"
                        value={notas}
                        onChange={onInputChange}
                        sx={{ mb: 2 }}
                    />
                </Grid>

                <ImageGallery images={note.imageUrls} />

                <Grid item>
                    <Typography variant='h6' fontWeight='light'>Receta creada el {dateString}</Typography>
                </Grid>

            </Grid >
        </>
    )
}