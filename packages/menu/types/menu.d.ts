export interface menuDto {
    label: string;
    children?: Array<menuDto>;
    icon?: string | object;
    tier?: number;
    isActive?: boolean
}


export interface menuKeyDto {
    pathKey?: string;
    labelKey?: string;
    childrenKey?: string;
    iconKey?: string;
}