import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

import { usePlaidLink } from 'react-plaid-link';

const [linkToken, setLinkToken] = useState<string>('');

useEffect(() => {
    const getLinkToken = async () => {
        setLinkToken("test");
    };

    getLinkToken();
}, []);

const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token, metadata) => {
        // send public_token to server
    },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <button onClick={() => open()} disabled={!ready}>
        Verify with Plaid
    </button>
);  