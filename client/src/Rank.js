import React from 'react';
import Box from '@material-ui/core/Button';

class Rank extends React.Component {
    constructor(props) {
        super(props);
        this.state = { issues: [] };
    }

    async componentDidMount() {
        try {
            const issuesResponse = await fetch("/api/board/1");
            const issues = await issuesResponse.json();

            // todo: change endpoint to accept list of users and only grab users on board
            const usersResponse = await fetch("/api/users");
            const users = await usersResponse.json();

            const resolutionValuesResponse = await fetch("/api/resolutionValues");
            const resolutionValues = await resolutionValuesResponse.json();

            this.setState({ 
                issues: issues.data,
                users: users.data,
                resolutionValues: resolutionValues.data
            });
        } catch (err) {
            throw err;
        }
        
    }

    renderIssue(issue) {
        return <Box key={issue.id}>github ticket: {issue.Github_Ticket}</Box>;
    }

    render() {
        const issueList = [];

        for( const i in this.state.issues) {
            issueList.push(this.renderIssue(this.state.issues[i]));
        }
        return (
            <div>
                <div>Issues:</div>
                {issueList}
            </div>
        );
    }
}

export default Rank;