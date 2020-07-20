import React, { useEffect, useState } from 'react';
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

const flexStyle = {
    display: "flex"
}

const selectedTabStyle = {
    fontWeight: "bold",
    borderRight: "3px solid red",
}

const Rank = () => {
    const [userIssueMap, setUserIssueMap] = useState([]);
    const [resolutionValues, setResolutionValues] = useState([]);
    const [selection, setSelection] = useState();

    useEffect(() => {
        async function fetchData() {
            console.log('fetch');
            try 
            {
                const resolutionValuesResponse = await fetch("/api/resolutionValues");
                const resolutionValues = await resolutionValuesResponse.json();

                const userIssueMapResponse = await fetch("/api/board/1");
                const userIssueMap = await userIssueMapResponse.json();

                // tally scoreboard
                userIssueMap.data.forEach((user) => {
                    let points = 0;
                    user.issues.forEach(issue => points += resolutionValues.data.find(rv => rv.id === issue.resolutionValue).pointValue)
                    user.totalPoints = points;
                })

                setResolutionValues(resolutionValues.data);
                setUserIssueMap(userIssueMap.data);
                if (userIssueMap.data && userIssueMap.data.length) setSelection(userIssueMap.data[0].id);
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

    const getResolutionValue = (id) => resolutionValues.find(rv => rv.id === id);

    const renderTab = (user) => <Tab key={user.id} style={selection === user.id ? selectedTabStyle : {}} value={user.id} label={user.name} />;

    const renderUserInfo = (user) => {
        const issues = [];
        user.issues.forEach(issue => issues.push(renderIssue(issue)));
        return (
            <div key={user.id}>
                <div>{user.name}: {user.totalPoints} points</div>
                <ul>{issues}</ul>
            </div>
        )
    };

    const renderIssue = (issue) => {
        const resolution = getResolutionValue(issue.resolutionValue);
        return (
            <li key={issue.id}>
                <div style={flexStyle}>
                    <a href={issue.githubTicket} target="_blank" style={boxStyle}>{issue.githubTicket}</a>
                    <div style={boxStyle}>({resolution.description}) +{resolution.pointValue}</div>
                </div>
            </li>
        )
    };

    const handleChange = function (e, newValue) {
        setSelection(newValue);
    }

    const classes = useStyles();
    const userList = [];
    const selectedUser = userIssueMap.find(user => user.id === selection);

    for (const i in userIssueMap) {
        userList.push(renderTab(userIssueMap[i]));
    }


    return (
        <div style={flexStyle}>
            <Tabs
                orientation="vertical"
                className={classes.tabs}
                onChange={handleChange}
            >
                {userList}
            </Tabs>
            <div style={listStyle}>
            </div>
            <div><Box p={2} style={boxStyle}>{selectedUser ? renderUserInfo(selectedUser) : ""} </Box></div>
        </div>
    );
};

export default Rank;