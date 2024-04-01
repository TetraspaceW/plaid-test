import { PlaidApi, Configuration, PlaidEnvironments } from "plaid"
import { config as dotenvxConfig } from "@dotenvx/dotenvx"

dotenvxConfig()

console.log("Client ID:", process.env.PLAID_CLIENT_ID)

const createPlaidClient = () => {
    const configuration = new Configuration({
        basePath: PlaidEnvironments.sandbox,
        baseOptions: {
            headers: {
                "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
                "PLAID-SECRET": process.env.PLAID_DEVELOPMENT_KEY,
            }
        }
    })

    return new PlaidApi(configuration)
}

const plaidClient = createPlaidClient()


const createLinkTokenForIDVerification = async () => {
    const idvTokenObject = {
        products: ["identity_verification"],
        identity_verification: {
            template_id: process.env.ID_VER_TEMPLATE,
        },
        client_name: "Spartacus.app",
        language: "en",
        country_codes: ["US"],
        webhook: "https://localhost:3000/webhooks",
    }

    const response = await plaidClient.linkToTokenCreate(idvTokenObject)
}
