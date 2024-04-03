import React, { useEffect, useState } from 'react';

import { usePlaidLink } from 'react-plaid-link';
import { Route, Routes } from 'react-router-dom';

const App = () => {
    return (
        <Routes>
            <Route path="/plaid" element={<Plaid />} />
            <Route path="/authillo" element={<Authillo />} />
        </Routes>
    );
}

const Plaid = () => {
    const [linkToken, setLinkToken] = useState<string>('');

    useEffect(() => {
        const getLinkToken = async () => {
            // fetch link token from server
            const response = await fetch('http://localhost:3000/plaid/token?user_id=tetraspace');
            const data = await response.json();
            setLinkToken(data.link_token)
        };

        getLinkToken();
    }, []);

    const { open: openPlaidLink, ready } = usePlaidLink({
        token: linkToken,
        onSuccess: async (public_token, metadata) => {
            console.log('public_token', public_token);
            console.log('metadata', metadata);

            // fetch identity verification data from server
            const response = await fetch('http://localhost:3000/plaid/verify?link_session_id=' + metadata.link_session_id);
            const data = await response.json();
            console.log('data', data);
        },
    });

    return (
        <button onClick={() => openPlaidLink()} disabled={!ready}>
            Verify with Plaid
        </button>
    );
}

const Authillo = () => {
    return (
        <button>
            Verify with Authillo
        </button>
    );
}

export default App;