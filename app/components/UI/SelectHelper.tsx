import { Selection } from "@nextui-org/react";

const isSelectionEmpty = (selection: Selection): boolean => {
    return selection instanceof Set && selection.size === 0;
};

const extractFloatFromSelection = (selection: Selection): number | null => {
    if (selection === "all") {
        // Handle the 'all' scenario. You can decide how to handle this case.
        // Return a default value or null, for example.
        return null;
    }
    
    const value = Array.from(selection)[0] as string;  // Extract the first value from the Set.
    
    return parseFloat(value);  // Convert the value to float.
}

export { isSelectionEmpty, extractFloatFromSelection };