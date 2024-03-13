import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Roles } from "../model/Roles";


export const useUserRoles = () => {
    const { isAuthenticated, getIdTokenClaims } = useAuth0();
    const [userRoles, setUserRoles] = useState<Roles[]>([]);
    const [areRolesLoaded, setAreRolesLoaded] = useState<boolean>();

    const [isAdminUser, setIsAdminUser] = useState<boolean>(false);

    useEffect(() => {
        setAreRolesLoaded(isAuthenticated);
        setIsAdminUser(isAdmin());
        fetchClaims();
    },[isAuthenticated, getIdTokenClaims]);

    const { REACT_APP_AUTH0_CLAIMS_ROLES_URL } = process.env;
    const claimsRoleUrl = REACT_APP_AUTH0_CLAIMS_ROLES_URL as string;

    const fetchClaims = async () => {
        if (isAuthenticated) {
            const claims = await getIdTokenClaims(); // Get the claims from the token            
            claims && setUserRoles(claims[claimsRoleUrl] || []); // Set the roles from the custom claim
          }
    }

    const isAdmin = (): boolean => {
        return userRoles.includes(Roles.ADMIN);
    }

    /**
    * Verify if the user has all the roles needed.
    * @param neededRoles     
    */
    const containRoles = (neededRoles: Roles[]): boolean => {
        return neededRoles.every(role => userRoles.includes(role));
    }
    
    return { userRoles, areRolesLoaded, isAdminUser, containRoles };
}