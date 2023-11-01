import { create } from 'zustand';
import { Dayjs } from 'dayjs';

interface AppliancesState {
    heaterType: string;
    setHeaterType: (heaterType: string) => void;
    heaterFilterWSize: string;
    setHeaterFilterWSize: (heaterFilterWSize: string) => void;
    heaterFilterLSize: string;
    setHeaterFilterLSize: (heaterFilterLSize: string) => void;
    heaterFilterDSize: string;
    setHeaterFilterDSize: (heaterFilterDSize: string) => void;
    heaterDate: Dayjs | null;
    setHeaterDate: (heaterDate: Dayjs | null) => void;
    heaterCondition: string;
    setHeaterCondition: (heaterCondition: string) => void;
    coolingType: string[];
    setCoolingType: (coolingType: string[]) => void;
    coolingHVACCondition: string;
    setCoolingHVACCondition: (coolingHVACCondition: string) => void;
    coolingWindowCondition: string;
    setCoolingWindowCondition: (coolingWindowCondition: string) => void;
    coolingHVACDate: Dayjs | null;
    setCoolingHVACDate: (coolingHVACDate: Dayjs | null) => void;
    coolingWindowDate: Dayjs | null;
    setCoolingWindowDate: (coolingWindowDate: Dayjs | null) => void;
    coolingWindowAmount: string;
    setCoolingWindowAmount: (coolingWindowAmount: string) => void;
    hotWaterTankCondition: string;
    setHotWaterTankCondition: (hotWaterTankCondition: string) => void;
    hotWaterTankDate: Dayjs | null;
    setHotWaterTankDate: (hotWaterTankDate: Dayjs | null) => void;
    combined: boolean;
    setCombined: (combined: boolean) => void;
    washerCondition: string;
    setWasherCondition: (washerCondition: string) => void;
    dryerCondition: string;
    setDryerCondition: (dryerCondition: string) => void;
    washerDate: Dayjs | null;
    setWasherDate: (washerDate: Dayjs | null) => void;
    dryerDate: Dayjs | null;
    setDryerDate: (dryerDate: Dayjs | null) => void;
    washerBrand: string;
    setWasherBrand: (washerBrand: string) => void;
    dryerBrand: string;
    setDryerBrand: (dryerBrand: string) => void;
    fridgeCondition: string;
    setFridgeCondition: (fridgeCondition: string) => void;
    fridgeBrand: string;
    setFridgeBrand: (fridgeBrand: string) => void;
    fridgeDate: Dayjs | null;
    setFridgeDate: (fridgeDate: Dayjs | null) => void;
    stoveCondition: string;
    setStoveCondition: (stoveCondition: string) => void;
    stoveBrand: string;
    setStoveBrand: (stoveBrand: string) => void;
    stoveDate: Dayjs | null;
    setStoveDate: (stoveDate: Dayjs | null) => void;
    stoveType: string;
    setStoveType: (stoveType: string) => void;
    dishwasherCondition: string;
    setDishwasherCondition: (dishwasherCondition: string) => void;
    dishwasherBrand: string;
    setDishwasherBrand: (dishwasherBrand: string) => void;
    dishwasherDate: Dayjs | null;
    setDishwasherDate: (dishwasherDate: Dayjs | null) => void;
    microwaveCondition: string;
    setMicrowaveCondition: (microwaveCondition: string) => void;
    microwaveBrand: string;
    setMicrowaveBrand: (microwaveBrand: string) => void;
    microwaveDate: Dayjs | null;
    setMicrowaveDate: (microwaveDate: Dayjs | null) => void;
    microwaveType: string;
    setMicrowaveType: (microwaveType: string) => void;
    counterCondition: string;
    setCounterCondition: (counterCondition: string) => void;
    counterDate: Dayjs | null;
    setCounterDate: (counterDate: Dayjs | null) => void;
    cabinetCondition: string;
    setCabinetCondition: (cabinetCondition: string) => void;
    cabinetDate: Dayjs | null;
    setCabinetDate: (cabinetDate: Dayjs | null) => void;
    sinkCondition: string;
    setSinkCondition: (sinkCondition: string) => void;
    sinkDate: Dayjs | null;
    setSinkDate: (sinkDate: Dayjs | null) => void;
    garbageCondition: string;
    setGarbageCondition: (garbageCondition: string) => void;
    garbageDate: Dayjs | null;
    setGarbageDate: (garbageDate: Dayjs | null) => void;
}

const useAppliances = create<AppliancesState>((set) => ({
    heaterType: '',
    setHeaterType: (heaterType: string) => set(() => ({ heaterType })),
    heaterFilterWSize: '',
    setHeaterFilterWSize: (heaterFilterWSize: string) => set(() => ({ heaterFilterWSize })),
    heaterFilterLSize: '',
    setHeaterFilterLSize: (heaterFilterLSize: string) => set(() => ({ heaterFilterLSize })),
    heaterFilterDSize: '',
    setHeaterFilterDSize: (heaterFilterDSize: string) => set(() => ({ heaterFilterDSize })),
    heaterDate: null,
    setHeaterDate: (heaterDate: Dayjs | null) => set(() => ({ heaterDate })),
    heaterCondition: '',
    setHeaterCondition: (heaterCondition: string) => set(() => ({ heaterCondition })),
    coolingType: [],
    setCoolingType: (coolingType: string[]) => set(() => ({ coolingType })),
    coolingHVACCondition: '',
    setCoolingHVACCondition: (coolingHVACCondition: string) => set(() => ({ coolingHVACCondition })),
    coolingWindowCondition: '',
    setCoolingWindowCondition: (coolingWindowCondition: string) => set(() => ({ coolingWindowCondition })),
    coolingHVACDate: null,
    setCoolingHVACDate: (coolingHVACDate: Dayjs | null) => set(() => ({ coolingHVACDate })),
    coolingWindowDate: null,
    setCoolingWindowDate: (coolingWindowDate: Dayjs | null) => set(() => ({ coolingWindowDate })),
    coolingWindowAmount: '',
    setCoolingWindowAmount: (coolingWindowAmount: string) => set(() => ({ coolingWindowAmount })),
    hotWaterTankCondition: '',
    setHotWaterTankCondition: (hotWaterTankCondition: string) => set(() => ({ hotWaterTankCondition })),
    hotWaterTankDate: null,
    setHotWaterTankDate: (hotWaterTankDate: Dayjs | null) => set(() => ({ hotWaterTankDate })),
    combined: false,
    setCombined: (combined: boolean) => set(() => ({ combined })),
    washerCondition: '',
    setWasherCondition: (washerCondition: string) => set(() => ({ washerCondition })),
    dryerCondition: '',
    setDryerCondition: (dryerCondition: string) => set(() => ({ dryerCondition })),
    washerDate: null,
    setWasherDate: (washerDate: Dayjs | null) => set(() => ({ washerDate })),
    dryerDate: null,
    setDryerDate: (dryerDate: Dayjs | null) => set(() => ({ dryerDate })),
    washerBrand: '',
    setWasherBrand: (washerBrand: string) => set(() => ({ washerBrand })),
    dryerBrand: '',
    setDryerBrand: (dryerBrand: string) => set(() => ({ dryerBrand })),
    fridgeCondition: '',
    setFridgeCondition: (fridgeCondition: string) => set(() => ({ fridgeCondition })),
    fridgeBrand: '',
    setFridgeBrand: (fridgeBrand: string) => set(() => ({ fridgeBrand })),
    fridgeDate: null,
    setFridgeDate: (fridgeDate: Dayjs | null) => set(() => ({ fridgeDate })),
    stoveCondition: '',
    setStoveCondition: (stoveCondition: string) => set(() => ({ stoveCondition })),
    stoveBrand: '',
    setStoveBrand: (stoveBrand: string) => set(() => ({ stoveBrand })),
    stoveDate: null,
    setStoveDate: (stoveDate: Dayjs | null) => set(() => ({ stoveDate })),
    stoveType: '',
    setStoveType: (stoveType: string) => set(() => ({ stoveType })),
    dishwasherCondition: '',
    setDishwasherCondition: (dishwasherCondition: string) => set(() => ({ dishwasherCondition })),
    dishwasherBrand: '',
    setDishwasherBrand: (dishwasherBrand: string) => set(() => ({ dishwasherBrand })),
    dishwasherDate: null,
    setDishwasherDate: (dishwasherDate: Dayjs | null) => set(() => ({ dishwasherDate })),
    microwaveCondition: '',
    setMicrowaveCondition: (microwaveCondition: string) => set(() => ({ microwaveCondition })),
    microwaveBrand: '',
    setMicrowaveBrand: (microwaveBrand: string) => set(() => ({ microwaveBrand })),
    microwaveDate: null,
    setMicrowaveDate: (microwaveDate: Dayjs | null) => set(() => ({ microwaveDate })),
    microwaveType: '',
    setMicrowaveType: (microwaveType: string) => set(() => ({ microwaveType })),
    counterCondition: '',
    setCounterCondition: (counterCondition: string) => set(() => ({ counterCondition })),
    counterDate: null,
    setCounterDate: (counterDate: Dayjs | null) => set(() => ({ counterDate })),
    cabinetCondition: '',
    setCabinetCondition: (cabinetCondition: string) => set(() => ({ cabinetCondition })),
    cabinetDate: null,
    setCabinetDate: (cabinetDate: Dayjs | null) => set(() => ({ cabinetDate })),
    sinkCondition: '',
    setSinkCondition: (sinkCondition: string) => set(() => ({ sinkCondition })),
    sinkDate: null,
    setSinkDate: (sinkDate: Dayjs | null) => set(() => ({ sinkDate })),
    garbageCondition: '',
    setGarbageCondition: (garbageCondition: string) => set(() => ({ garbageCondition })),
    garbageDate: null,
    setGarbageDate: (garbageDate: Dayjs | null) => set(() => ({ garbageDate })),
}));

export default useAppliances;