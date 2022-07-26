import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';



const CREATE_LINK_MUTATION = gql`
    mutation PostMutation(
        $description: String!
        $url: String!
    ) {
        post(description: $description, url: $url) {
            id
            createdAt
            url
            description
        }
    }
`;

const CreateLink = () => {
    const [formState, setFormState] = useState({
        description: '',
        url: ''
    });

    // When using the useMutation hook, we need destructor out a function that can be used to call the mutation. That's
    // what CreateLink() is in the code block above. Now it can be called whenever it is needed.
    const [createLink] = useMutation(CREATE_LINK_MUTATION, {
        variables: {
            description: formState.description,
            url: formState.url
        }
    });

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    // Run createLink() when form is submitted.
                    createLink();
                }}
            >
                <div className="flex flex-column mt3">
                    <input
                        className="mb2"
                        value={formState.description}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                description: e.target.value
                            })
                        }
                        type="text"
                        placeholder="A description for the link"
                    />
                    <input
                        className="mb2"
                        value={formState.url}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                url: e.target.value
                            })
                        }
                        type="text"
                        placeholder="The URL for the link"
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateLink;