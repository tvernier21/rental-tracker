import React from "react";
import { Button } from "@nextui-org/react";

interface AddButtonProps {
    text: string;
    icon: React.ElementType;
    onPressModal: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({
    text,
    icon: Icon,
    onPressModal 
}) => {
    return (
        <Button color="success" endContent={<Icon />} >
            {text}
        </Button>   
    );
}

export default AddButton;
