
export interface CageChosen {
    modelCage?: string;
    dimensionsCage?: string;
    typeCage?: '' | 'rígida' | 'flexible' | 'especial';
}
export const CAGES_CHOSEN: CageChosen[] = [
    { modelCage: 'ML45', dimensionsCage: '43*27*33', typeCage: 'rígida' },
    { modelCage: 'ML50', dimensionsCage: '50*33*33', typeCage: 'rígida' },
    { modelCage: 'ML55', dimensionsCage: '56*33*37', typeCage: 'rígida' },
    { modelCage: 'ML60', dimensionsCage: '60*40*40', typeCage: 'rígida' },
    { modelCage: 'ML70', dimensionsCage: '67*47*51', typeCage: 'rígida' },
    { modelCage: 'ML80', dimensionsCage: '81*56*59', typeCage: 'rígida' },
    { modelCage: 'ML90', dimensionsCage: '90*60*69', typeCage: 'rígida' },
    { modelCage: 'ML100', dimensionsCage: '100*67*75', typeCage: 'rígida' },
    { modelCage: 'ML120', dimensionsCage: '120*79*89', typeCage: 'rígida' },
];
