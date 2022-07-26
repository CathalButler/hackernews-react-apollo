import React from 'react';
import Link from './Link';
// Import Apollo/client to use a FEED_QUERY & gql
import {useQuery, gql} from '@apollo/client';

const FEED_QUERY = gql`
            {
                feed {
                    id
                    links {
                        id
                        createdAt
                        url
                        description
                        postedBy {
                            id
                            name
                        }
                        votes {
                            id
                            user {
                                id
                            }
                        }
                    }
                }
            }
    `;

const LinkList = () => {

    const {data} = useQuery(FEED_QUERY);

    return (
        <div>
            {data && (
                <>
                    {data.feed.links.map((link, index) => (
                        <Link key={link.id} link={link} index={index}/>
                    ))}
                </>
            )}
        </div>
    );//End return
};//End linkList

export default LinkList;