import { FunctionComponent } from "react";
import { TText } from "../utils/Texts";
import { TextType } from "../../model/utils/TextType";
import { useAuth0 } from "@auth0/auth0-react";

export const Profile: FunctionComponent = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <TText type={TextType.HEADER2}>Loading...</TText>;
    }

    if (isAuthenticated) {
        return (
            <div style={{ textAlign: 'center' }}>
                <img
                    src={user?.picture}
                    alt={user?.name}
                    style={{ borderRadius: '50%', width: '100px', height: '100px' }}
                />
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <TText type={TextType.HEADER2}>Name: {user?.name}</TText>
                    <TText type={TextType.HEADER2}>Email: {user?.email}</TText>
                </div>
            </div>
        );
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <TText type={TextType.HEADER2}>User not authenticated</TText>
        </div>
    );
};