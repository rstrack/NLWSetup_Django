import { styled } from '@mui/system';
import { Grid } from "@mui/material"

type DayComponentDivProps = {
    disabled?: boolean,
    percent: number | undefined
}

export const DayComponentDiv = styled('div')(({disabled, percent}:DayComponentDivProps)=>({
    width:40, 
    height:40, 
    border:( disabled || !percent ? '2px solid #27272a' : '2px solid #a78bfa' ), 
    borderRadius:'8px', 
    opacity: ( disabled ? '40%' : '100%' ),
    cursor: ( disabled ? 'not-allowed' : 'pointer' ),
    backgroundColor: (
        !percent ? '#18181b' :
        percent < 0.2 ? '#4c1d95' :
        percent < 0.4 ? '#5b21b6' :
        percent < 0.6 ? '#6d28d9' :
        percent < 0.8 ? '#7c3aed' :
        '#8b5cf6'
    ), 
}));

export const HabitsExternalGrid = styled(Grid)(({theme}) => ({
    paddingLeft:16,
    paddingRight:16,
    gap:64,
    display:'flex',
    textAlign:'center',
    justifyContent:'center',
    [theme.breakpoints.down('lg')]:{
        maxWidth: '100%'
    },
    [theme.breakpoints.up('lg')]:{
        maxWidth: '1024px'
    }

}))

export const HeaderDiv = styled('div')({
    display:'flex', 
    justifyContent:'space-between', 
    alignItems:'center', 
    paddingLeft:64, 
    paddingRight:64
})

export const SummaryTableExternalDiv = styled('div')({
    display:'flex', 
    justifyContent:'center'
})

export const SummaryTableInternalDiv = styled('div')({
    display: 'grid', 
    gridTemplateRows: 'repeat(7, 1fr)', 
    gridTemplateColumns: 'none', 
    gridAutoFlow: 'column', 
    gap: 12, 
    justifyContent: 'left', 
    alignItems: 'center'
})

export const WeekDaysText = styled('div')({
    color: 'gray', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    fontSize: 18, 
    fontWeight: 'bold'
})