// Root
import React, {FC, memo, useState, useEffect} from "react"
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles'
// Materialize Components
import {LinearProgress} from '@material-ui/core'


type PropsType = {}

const useStyles = makeStyles((theme: Theme) => createStyles({
    loader: {
        zIndex: 999999,
        position: 'fixed',
        width: '100%',
    }
}))

export const ItemLoader: FC<PropsType> = memo(() => {
    const classes = useStyles()
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) return 0

                const diff = Math.random() * 10

                return Math.min(oldProgress + diff, 100)
            });
        }, 100);

        return () => clearInterval(timer)
    }, [])

    return <LinearProgress variant='determinate'  value={progress} color={'secondary'} className={classes.loader}/>
})
