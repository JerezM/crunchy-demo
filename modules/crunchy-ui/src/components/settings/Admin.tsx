import { FunctionComponent } from "react";
import { TText } from "../utils/Texts";
import { TextType } from "../../model/utils/TextType";
import Button from "@mui/material/Button";
import { useAdminService } from "../../services/useAdminService";


export const Admin: FunctionComponent = () => {

    const { getAdminCheck } = useAdminService();

    return (
    <>
        <TText type={TextType.HEADER2}>Admin View!</TText>
        <Button onClick={getAdminCheck}>check admin</Button> 
    </>
    );
}