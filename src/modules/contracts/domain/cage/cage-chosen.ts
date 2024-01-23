export interface CageChosen {
    model?: string;
    dimensions?: string;
    type?: '' | 'rígida' | 'flexible' | 'especial';
}

export const CAGES_CHOSEN: CageChosen[] = [
    { model: 'ML45', dimensions: '43*27*33', type: 'rígida' },
    { model: 'ML50', dimensions: '50*33*33', type: 'rígida' },
    { model: 'ML55', dimensions: '56*33*37', type: 'rígida' },
    { model: 'ML60', dimensions: '60*40*40', type: 'rígida' },
    { model: 'ML70', dimensions: '67*47*51', type: 'rígida' },
    { model: 'ML80', dimensions: '81*56*59', type: 'rígida' },
    { model: 'ML90', dimensions: '90*60*69', type: 'rígida' },
    { model: 'ML100', dimensions: '100*67*75', type: 'rígida' },
    { model: 'ML120', dimensions: '120*79*89', type: 'rígida' },
];

