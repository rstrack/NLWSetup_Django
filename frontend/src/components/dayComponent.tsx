import { useState } from "react"
import { Checkbox, Typography } from "@mui/material"

import { api } from "../lib/axios"
import { 
    CustomLinearProgress, 
    CustomPopover, 
    DayComponentDiv, 
    PopoverBox 
} from "../styles"

type DayComponentProps = {
    disabled?:boolean
    total?:number
    completed?:number
    date?:Date
    getSummary?:()=>void
}

type DayFields = {
    completedHabits: {
        id: number
        title: string
        created_at: string
    }[]
    possibleHabits: {
        id: number
        title: string
        created_at: string
    }[]
}

const DayComponent = ({disabled, total, completed, date, getSummary, ...rest}:DayComponentProps) =>{

    const percent = completed && total ? completed/total : undefined

    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
    const [day, setDay] = useState<DayFields>({completedHabits: [], possibleHabits: []})
    
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        getDay()
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => setAnchorEl(null);
    
    const open = Boolean(anchorEl);
    const id = open ? 'day-habits-summary-popover' : undefined;

    const toggleDayHabit = (id:number) =>{
        date && api.patch(`habits/${id}/`, {day: date.toISOString().split('T')[0]})
        .then((response)=>{
            getDay()
            getSummary!()
        })
        .catch((error)=>{
            console.log(error.data)
        })
    }

    const getDay = () =>{
        date && api.get(`day/${date.toISOString().split('T')[0]}`)
        .then((response) =>{
            setDay(response.data)
        })
        .catch((error)=>{
            console.log(error.data)
        })
    }

    return(
        <>
            <DayComponentDiv 
                disabled={!!disabled} 
                percent={percent} 
                onClick={handleClick} 
                {...rest} 
            />
            <CustomPopover
                id={id}
                open={!disabled && open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
            >
                <PopoverBox>
                    <Typography variant="body1" color='gray'>{date?.toLocaleDateString('pt-BR', { weekday: 'long' })}</Typography>
                    <Typography variant="h4">{date ? date.toLocaleDateString('pt-BR') : ''}</Typography>
                    <CustomLinearProgress variant="determinate" value={percent ? percent*100 : 0}/>
                    {day.possibleHabits.map(({id, title}) =>{
                        return (
                            <div style={{display:'flex', alignItems:'center'}} key={id}>
                                <Checkbox 
                                    checked={!!day.completedHabits.find(habit => habit.id ===id)} 
                                    onChange={() => toggleDayHabit(id)}
                                    disabled={date && date.toDateString() !== (new Date()).toDateString()}    
                                />
                                <span>{title}</span>
                            </div>
                        )
                    })}
                </PopoverBox>
            </CustomPopover>
        </>


    )
}

export default DayComponent