// Root
import React, {FC, memo, useEffect, useState} from "react"
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles'
// Materialize Components
import {Paper, CircularProgress, Typography, Box} from '@material-ui/core'


type PropsType = {
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        height: '100vh',
        width: '100%',
    },
    loader: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -125,
        marginLeft: -125,
    }
}))

export const InitializeLoader: FC<PropsType> = memo((props) => {
    const classes = useStyles()
    const [progress, setProgress] = useState(10)

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10))
        }, 500);
        return () => {
            clearInterval(timer);
        };
    }, [])

    return (
        <Paper square className={classes.root}>
            <CircularProgress
                className={classes.loader}
                size={250}
                variant={"static"}
                color={'secondary'}
                value={progress}
            />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography  variant="h2" component="div" color="secondary">
                    {
                        `${progress} %`
                    }
                </Typography>
            </Box>
        </Paper>
    )
})
