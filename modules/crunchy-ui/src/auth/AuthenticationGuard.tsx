import { withAuthenticationRequired } from "@auth0/auth0-react"
import { FunctionComponent } from "react"
import { TText } from "../components/utils/Texts"
import { TextType } from "../model/utils/TextType"

interface AuthenticationGuardProps {
    component: React.ComponentType<object>
}

export const AuthenticationGuard: FunctionComponent<AuthenticationGuardProps> = ({component}) => {
    const WrappedCompWithAuthGuard = withAuthenticationRequired(component, {
        onRedirecting: () => (
            <div>
                <TText type={TextType.HEADER2}>Redirecting to auth...</TText>
            </div>
        ),
    });

    return <WrappedCompWithAuthGuard/>;
}