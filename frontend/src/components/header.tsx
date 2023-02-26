import {Button} from '@mui/material' 
import AddIcon from '@mui/icons-material/Add';

import { HeaderDiv } from '../styles';
import logo from '../assets/logo.svg'

export const Header = () => {

    return(
        <HeaderDiv>
            
            <img src={logo} alt='Habits'/>

            <Button variant='outlined' startIcon={<AddIcon/>} sx={{color:'white', height:48}}>
                Novo hábito
            </Button>

        </HeaderDiv>
    )
}
