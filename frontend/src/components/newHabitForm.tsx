import { FormEvent, useContext, useState } from 'react';
import { Button, Box, Checkbox, TextField, Typography } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';

import { api } from '../lib/axios';
import { CustomForm } from '../styles';
import { SummaryContext } from '../contexts/summaryContext';

const weekDaysNames = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo']

export const NewHabitForm = () => {

    const {getSummary} = useContext(SummaryContext)

    const [title, setTitle] = useState<string>('')
    const [weekDays, setWeekDays] = useState<number[]>([])
    const [titleError, setTitleError] = useState<boolean>(false)
    const [weekDaysError, setWeekDaysError] = useState<boolean>(false)

    const handleTitleOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const value = e.target.value
        value ==='' ? setTitleError(true) : setTitleError(false)
        setTitle(value)
    }

    const handleToggleWeekDay = (weekDay: number) =>{
        var newWeekDaysArray: number[]
        if(weekDays.includes(weekDay)){
            newWeekDaysArray = weekDays.filter(day => day !== weekDay)
        }else{
            newWeekDaysArray = [...weekDays, weekDay]
        }
        setWeekDays(newWeekDaysArray)
        newWeekDaysArray.length === 0 ? setWeekDaysError(true) : setWeekDaysError(false)

    }

    const handleSubmit = (e: FormEvent) =>{
        e.preventDefault()

        if(title === ''){
            setTitleError(true)
        }
        if(weekDays.length === 0){
            setWeekDaysError(true)
        }

        title !== ''
        && weekDays.length !== 0
        && api.post('habits/', {title, weekDays})
        .then(() =>{
            alert('Hábito criado com sucesso!')
            setTitle('')
            setWeekDays([])
            getSummary()
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    return(
        <CustomForm
            onSubmit={handleSubmit} 
        >
            <TextField
                autoFocus={true}
                label='Qual seu comprometimento?'
                value={title}
                onChange={handleTitleOnChange}
                error={titleError}
                helperText={titleError && 'Campo vazio!'}
            />

            <Typography>Qual a recorrência? </Typography>
            <div style={{gap:0}}>
                {weekDaysNames.map((value, index)=>{
                    return(
                        <div style={{display:'flex', alignItems:'center'}} key={index}>
                            <Checkbox onChange={()=>handleToggleWeekDay(index)}  checked={weekDays.includes(index)} sx={{ '& .MuiSvgIcon-root': { fontSize: 32 } }}/>
                            <span>{value}</span>
                        </div>
                    )
                })}
            </div>
            {weekDaysError && <Box component='span' color='error.main'>Selecione pelo menos um dia da semana!</Box>}

            <Button
                type='submit'
                startIcon={<CheckIcon />}
                color='success'
                variant='contained'
                sx={{p:2}}
            >
                Confirmar
            </Button>
        </CustomForm>
    )
}