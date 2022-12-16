// set up react, link to go to user pages, and query for a user list
import { useQuery } from '@apollo/client';
import React from 'react';
import { Link } from 'react-router-dom';
import { QUERY_USER } from '../utils/queries';

// set up page contents
const Home = () => {
    // utilize the query to grab user data
    const { loading, data } = useQuery(QUERY_USER, {
        fetchPolicy: 'no-cache'
    });

    // set up list of all users
    const userList = data?.users || [];

    // return the loaded page
    return (
        <div>
            <div>
                <h1>List of Smashers:</h1>
            </div>
            <div>
                {loading ? (
                    <div>Loading list of smashers...</div>
                ) : (
                    <ul>
                        {userList.map((user) => {
                            return (
                                <li key={user._id}>
                                    <Link to={{ pathname: `/profiles/${user.username}` }}>
                                        {user.username}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
}

// export the page layout
export default Home;
