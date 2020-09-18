// Root
import React, {FC, memo} from "react"
import {makeStyles, Theme, createStyles, useTheme} from "@material-ui/core/styles"
// Materialize Components
import {Tab, Tabs, AppBar, Box, Typography} from "@material-ui/core"
// Materialize Icon
import {} from "@material-ui/icons"
import {compose} from "redux"
import SwipeableViews from 'react-swipeable-views'


type PropsType = {}

type StyleType = {}

type TabPanelProps = {
    children?: React.ReactNode;
    dir?: string;
    index: any;
    value: any;
}

const useStyles = makeStyles<Theme & StyleType>((theme) => createStyles({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
    },
}))



const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const a11yProps = (index: any) => {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const ProfileWrapper: FC<PropsType> = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => setValue(newValue);

    console.log(theme)

    const handleChangeIndex = (index: number) => setValue(index)

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Item One" {...a11yProps(0)} />
                    <Tab label="Item Two" {...a11yProps(1)} />
                    <Tab label="Item Three" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    Item One
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    Item Three
                </TabPanel>
            </SwipeableViews>
        </div>
    )
}

export const ProfileContainer = compose(
)(ProfileWrapper)
