import { DayComponentDiv } from "../styles"

interface IDayComponent {
    disabled?:boolean
    total?:number
    completed?:number
}

const DayComponent = ({disabled, total, completed, ...rest}:IDayComponent) =>{

    const percent = completed && total ? completed/total : undefined

    return(
        <DayComponentDiv disabled={!!disabled} percent={percent} {...rest} />
    )
}

export default DayComponent