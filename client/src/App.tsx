import React, { useEffect, useState } from 'react';

import { usePlaidLink } from 'react-plaid-link';

const App = () => {
    const [linkToken, setLinkToken] = useState<string>('');

    useEffect(() => {
        const getLinkToken = async () => {
            // fetch link token from server
            const response = await fetch('http://localhost:3000/token');
            const data = await response.json();
            setLinkToken(data.link_token)
        };

        getLinkToken();
    }, []);

    const { open: openPlaidLink, ready } = usePlaidLink({
        token: linkToken,
        onSuccess: (public_token, metadata) => {
            // send public_token to server
        },
    });

    return (
        <button onClick={() => openPlaidLink()} disabled={!ready}>
            Verify with Plaid
        </button>
    );
}

export default App;