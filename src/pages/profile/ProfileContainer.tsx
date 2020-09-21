// Root
import React, {ChangeEvent, FC, memo, useState} from "react"
import {createStyles, makeStyles, Theme, useTheme} from "@material-ui/core/styles"
import clsx from "clsx"
// Materialize Components
import {AppBar, Box, Tab, Tabs, useMediaQuery} from "@material-ui/core"
// Materialize Icon
import {AccountCircle} from "@material-ui/icons"
// Components
import {MyProfile} from "./components/MyProfile"


type PropsType = {}

type TabPanelProps = {
    children?: React.ReactNode;
    dir?: string;
    index: any;
    value: any;
}

const useStyles = makeStyles<Theme>((theme) => createStyles({
    itemRoot: {

    },
    tabsRoot: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
        // height: 'calc(100vh - 115px)',
        [theme.breakpoints.up('xs')]: {
            height: '100%',
        }
    },
    TabMobileMode: {
        position: 'fixed',
        width: '70%',
        marginLeft: '5%',
    }
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
                <Box>
                    {children}
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

export const ProfileContainer: FC<PropsType> = memo(() => {
    const classes = useStyles()
    const theme = useTheme()
    const [value, setValue] = useState(0)
    const isMobile = !useMediaQuery(theme.breakpoints.up('md'))

    const handleChange = (event: ChangeEvent<{}>, newValue: number) => setValue(newValue);

    return (
        <div>
            <div className={classes.tabsRoot}>
                <AppBar position="static" color="default" className={clsx({[classes.TabMobileMode]: isMobile})}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor='secondary'
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="My Profile" icon={<AccountCircle/>} {...a11yProps(0)} />
                        <Tab label="Item Two" icon={<AccountCircle/>} {...a11yProps(1)} />
                    </Tabs>
                </AppBar>

                <TabPanel value={value} index={0} dir={theme.direction}>
                    <MyProfile/>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    Item Two
                </TabPanel>
            </div>
        </div>
    )
})
