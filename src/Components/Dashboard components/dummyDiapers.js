import moment from 'moment'
export const dummyDiapers = [
    {
        date: moment().subtract(1, 'days').format('l'),
        time: moment().subtract(1, 'days').format('LT'),
        type: 'Poos',
    },
    {
        date: moment().subtract(1, 'days').format('l'),
        time: moment().subtract(1, 'days').subtract(1, 'hours').format('LT'),
        type: 'Pees',

    }]