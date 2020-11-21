import React, {useEffect} from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../components/Header/Header';
import SideBar from '../components/Sidebar/Sidebar';
import useStyles from '../assets/appLayoutStyles';
import {Route, Switch} from 'react-router-dom';
import sidebarRoutes from '../routes/sidebarRoutes';
import TaskDetails from '../containers/Dashboard/TaskDetails';
import ExpenseTracker from '../containers/ExpenseTracker/ExpenseTracker';


const PersistentDrawerLeft = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (props.location.user) {
            localStorage.setItem('user', props.location.user);
        }
    }, [props.location.user]);

    useEffect(() => {
        if (props.location.user === undefined || localStorage.getItem('token') === null) {
            props.history.push('/sign-in');
        }
    }, []);

    return (
        <div className={classes.root}>
            <CssBaseline/>

            <Header open={open} handleDrawerOpen={handleDrawerOpen}/>

            <SideBar open={open} handleDrawerClose={handleDrawerClose} routes={sidebarRoutes}/>

            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader}/>
                <Switch>
                    {
                        sidebarRoutes.map((route, key) => {
                            return <Route exact path={route.path} component={route.component} key={route.key}/>
                        })
                    }

                    <Route exact path="/:todo_id" component={TaskDetails}/>
                    <Route exact path="/expense-tracker" component={ExpenseTracker}/>
                </Switch>
            </main>
        </div>
    );
};

export default PersistentDrawerLeft;
