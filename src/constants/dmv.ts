export const ACQUISITION_FEES = [
    { brand: 'Porsche', fee: 1095 },
    { brand: 'BMW / MINI', fee: 925 },
    { brand: 'Audi', fee: 895 },
    { brand: 'Mercedes-Benz', fee: 1095 },
    { brand: 'Lexus', fee: 795 },
    { brand: 'Genesis', fee: 750 },
    { brand: 'Infiniti', fee: 700 },
    { brand: 'Cadillac', fee: 695 },
    { brand: 'Volvo', fee: 695 },
    { brand: 'Toyota', fee: 650 },
    { brand: 'Hyundai', fee: 650 },
    { brand: 'Kia', fee: 650 },
    { brand: 'Volkswagen', fee: 650 },
    { brand: 'Honda / Acura', fee: 595 },
    { brand: 'Nissan', fee: 595 },
    { brand: 'Subaru', fee: 595 },
    { brand: 'Mazda', fee: 595 },
];

export const CA_DMV_CONSTANTS = {
    BASE_REG: 76,
    CHP_FEE: 34,
    VLF_RATE: 0.0065,
    DOCUMENT_FEE: 80,
    OTHER_FEES: 217.75, // Standard misc fees from cal.html
    ELECTRONIC_FILING: 8.25,
};

export const calcRegFee = (price: number) => {
    const tif =
        price < 5000
            ? 33
            : price < 25000
              ? 66
              : price < 35000
                ? 132
                : price < 60000
                  ? 198
                  : 231;
    return (
        price * CA_DMV_CONSTANTS.VLF_RATE +
        CA_DMV_CONSTANTS.BASE_REG +
        CA_DMV_CONSTANTS.CHP_FEE +
        tif
    );
};
