'use client';

import React from "react";
import { Button } from "@nextui-org/react";

interface AddButtonProps {
    text: string;
    icon: React.ElementType;
    onPress: () => void;
    disabled?: boolean;
}

const AddButton: React.FC<AddButtonProps> = ({
    text,
    icon: Icon,
    onPress,
    disabled
}) => {
    return (
        <Button 
            color="success" 
            endContent={<Icon />}
            onPress={onPress}
            isDisabled={disabled ? disabled : false}
        >
            {text}
        </Button>   
    );
}

export default AddButton;
