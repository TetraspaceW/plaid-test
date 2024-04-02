import { PlaidApi, Configuration, PlaidEnvironments, CountryCode, Products } from "plaid"
import { config as dotenvxConfig } from "@dotenvx/dotenvx"

dotenvxConfig()

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID
const PLAID_SANDBOX_KEY = process.env.PLAID_SANDBOX_KEY
const ID_VER_TEMPLATE = process.env.ID_VER_TEMPLATE

// throw errors if any are missing
if (!PLAID_CLIENT_ID || !PLAID_SANDBOX_KEY || !ID_VER_TEMPLATE) {
    throw new Error("Missing required environment variables")
}

const createPlaidClient = () => {
    const configuration = new Configuration({
        basePath: PlaidEnvironments.sandbox,
        baseOptions: {
            headers: {
                "PLAID-CLIENT-ID": PLAID_CLIENT_ID,
                "PLAID-SECRET": PLAID_SANDBOX_KEY,
            }
        }
    })

    return new PlaidApi(configuration)
}

const getLoggedInUserID = () => {
    return "tetraspace"
}


const plaidClient = createPlaidClient()

const createLinkTokenForIDVerification = async () => {
    const idvTokenObject = {
        products: [Products.IdentityVerification],
        user: {
            client_user_id: getLoggedInUserID(),
        },
        identity_verification: {
            template_id: ID_VER_TEMPLATE,
        },
        client_name: "Spartacus.app",
        language: "en",
        country_codes: [CountryCode.Us],
        webhook: "https://localhost:3000/webhooks",
    }

    const response = await plaidClient.linkTokenCreate(idvTokenObject)

    return response.data
}

const response = await createLinkTokenForIDVerification()
console.log(response)