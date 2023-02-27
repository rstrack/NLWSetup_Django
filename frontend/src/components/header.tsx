import { useState } from 'react';
import { Button, Modal, Portal, Typography } from '@mui/material' 
import AddIcon from '@mui/icons-material/Add';

import logo from '../assets/logo.svg'
import { HeaderDiv, ModalBox } from '../styles';
import { NewHabitForm } from './newHabitForm';

export const Header = () => {

    const [open, setOpen] = useState<boolean>(false);
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return(
        <HeaderDiv>
            <img src={logo} alt='Habits'/>
            <Button variant='outlined' startIcon={<AddIcon/>} onClick={handleOpen}>
                Novo hábito
            </Button>
            <Portal>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-new-habit"
                    // aria-describedby="modal-modal-description"
                >
                    <ModalBox>
                        <Typography variant='h4' fontWeight='bolder'>
                            Criar hábito
                        </Typography>
                        <NewHabitForm/>
                    </ModalBox>
                </Modal>
            </Portal>
        </HeaderDiv>
    )
}
