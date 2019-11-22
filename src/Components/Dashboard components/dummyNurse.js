import moment from 'moment'
export const dummyNurse=[
    {
        startTime: moment().subtract(1, 'days').subtract(1, 'hours'),
        endTime: moment().subtract(1, 'days'),
        duration: moment().subtract(10, 'days').diff(moment().subtract(10, 'days').subtract(1, 'hours')),
        rightside: 51000,
        leftside: 49000
 
},
{
    startTime: moment().subtract(10, 'days').subtract(1.5, 'hours'),
    endTime: moment().subtract(10, 'days'),
    duration: moment().subtract(10, 'days').diff(moment().subtract(10, 'days').subtract(1.5, 'hours')),
    rightside: 51000,
    leftside: 49000

}]