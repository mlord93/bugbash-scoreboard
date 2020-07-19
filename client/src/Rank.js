import React, { useEffect, useState} from 'react';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';

const boxStyle = {
    display: "inline-block",
    margin: "5px"
}

const listStyle = {
    display: "flex",
    flexDirection: "column"
}

const bodyStyle = {
    display: "flex",
}

const Rank = () => {
    const [userIssueMap, setUserIssueMap] = useState([]);
    const [resolutionValues, setResolutionValues] = useState([]);

    useEffect(() => {
        async function fetchData() {
            console.log('fetch');
            try {
                const userIssueMapResponse = await fetch("/api/board/1");
                const userIssueMap = await userIssueMapResponse.json();

                const resolutionValuesResponse = await fetch("/api/resolutionValues");
                const resolutionValues = await resolutionValuesResponse.json();

                setUserIssueMap(userIssueMap.data);
                setResolutionValues(resolutionValues.data);
            } catch (err) {
                throw err;
            }
        }
        fetchData();
    }, []);

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
            display: 'flex',
            height: 224,
        },
        tabs: {
            borderRight: `1px solid ${theme.palette.divider}`,
        },
    }));

    const renderBox = (user)=> <Box bgcolor="primary.main" key={user.id} p={2} style={boxStyle}>{user.name}</Box>;

    const renderTab = (user) => <Tab key={user.id} label={user.name}/>;

    const renderTabPanel = (user) => <Box key={user.id}>Github Tickets: {user.githubTickets.length}</Box>;

    const classes = useStyles();
    const userList = [];
    // const userIssuesList = []
    for (const i in userIssueMap) {
        userList.push(renderTab(userIssueMap[i]));
    }

    return (
        <div style={bodyStyle}>
            <Tabs orientation="vertical" className={classes.tabs}>
                {userList}
            </Tabs>
            <div style={listStyle}>
            </div>
            <div><Box bgcolor="secondary.main" p={2} style={boxStyle}>Hi</Box></div>
        </div>
    );
};

export default Rank;