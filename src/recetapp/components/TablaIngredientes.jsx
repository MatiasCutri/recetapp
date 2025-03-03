import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { AddOutlined, DeleteOutline } from '@mui/icons-material';
import { useTheme } from '@emotion/react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.tertiary.main,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function TablaIngredientes({ ingredientes = [], onInputChange }) {
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const [newIngrediente, setNewIngrediente] = React.useState('');
  const [newCantidad, setNewCantidad] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddRow = () => {
    if (newIngrediente && newCantidad) {
      const updatedIngredientes = [...ingredientes, { ingrediente: newIngrediente, cantidad: newCantidad }];
      onInputChange({ target: { name: 'ingredientes', value: updatedIngredientes } });
      setNewIngrediente('');
      setNewCantidad('');
      handleClose();
    }
  };

  const handleDeleteRow = (index) => {
    const updatedIngredientes = ingredientes.filter((_, i) => i !== index);
    onInputChange({ target: { name: 'ingredientes', value: updatedIngredientes } });
  };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        variant='contained'
        sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.tertiary.main, mb: 2 }}
        startIcon={<AddOutlined />}
      >
        Agregar Ingrediente
      </Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="customized table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align='center'>Ingredientes</StyledTableCell>
              <StyledTableCell align='center'>Cantidad</StyledTableCell>
              <StyledTableCell align='center' width='20%'>Eliminar</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {ingredientes.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align='center'>{row.ingrediente}</StyledTableCell>
                <StyledTableCell align='center'>{row.cantidad}</StyledTableCell>
                <StyledTableCell align='center'>
                  <Button onClick={() => handleDeleteRow(index)} color='secondary'>
                    <DeleteOutline sx={{ fontSize: 20 }} />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>

        <DialogTitle>Agregar Ingrediente</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Ingrediente"
            fullWidth
            value={newIngrediente}
            onChange={(e) => setNewIngrediente(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Cantidad"
            fullWidth
            value={newCantidad}
            onChange={(e) => setNewCantidad(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="tertiary">
            Cancelar
          </Button>
          <Button onClick={handleAddRow} color="tertiary">
            Agregar
          </Button>
        </DialogActions>

      </Dialog>
    </>
  );
}
