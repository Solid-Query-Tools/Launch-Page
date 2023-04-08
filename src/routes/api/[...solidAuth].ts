import { SolidAuth, type SolidAuthConfig } from "@auth/solid-start";
import GitHub from "@auth/core/providers/github";

export const authOpts: SolidAuthConfig = {
    providers: [
        //@ts-ignore
        GitHub({
            clientId: import.meta.env.VITE_ClientID,
            clientSecret: import.meta.env.VITE_ClientSecret,
        })
    ],
    debug: false,
}

export const { GET, POST } = SolidAuth(authOpts);