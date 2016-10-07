import R from 'ramda';
import moment from 'moment';

const cities = [
    {
        title: 'Berlin, Germany',
        imageUrl: 'https://s3.amazonaws.com/aaron-cdn/react-image-timeline/berlin.jpg',
        text: 'wetwet',
        date: '2015.05.05'
    },
    {
        title: 'Chicago, Illinois',
        imageUrl: 'https://s3.amazonaws.com/aaron-cdn/react-image-timeline/chicago.jpg',
        text: 'wetwet',
        date: '2015.05.05'
    },
    {
        title: 'Cairo, Egypt',
        imageUrl: 'https://s3.amazonaws.com/aaron-cdn/react-image-timeline/egypt.jpg',
        text: 'wetwet',
        date: '2015.05.05'
    },
    {
        title: 'London, England',
        imageUrl: 'https://s3.amazonaws.com/aaron-cdn/react-image-timeline/london.jpg',
        text: 'wetwet',
        date: '2015.05.05'
    },
    {
        title: 'New York, New York',
        imageUrl: 'https://s3.amazonaws.com/aaron-cdn/react-image-timeline/ny.jpg',
        text: 'wetwet',
        date: '2015.05.05'
    },
    {
        title: 'Paris, France',
        imageUrl: 'https://s3.amazonaws.com/aaron-cdn/react-image-timeline/paris.jpg',
        text: 'wetwet',
        date: '2015.05.05'
    },
    {
        title: 'Rome, Italy',
        imageUrl: 'https://s3.amazonaws.com/aaron-cdn/react-image-timeline/rome.jpg',
        text: 'wetwet',
        date: '2015.05.05'
    },
    {
        title: 'Seoul, South Korea',
        imageUrl: 'https://s3.amazonaws.com/aaron-cdn/react-image-timeline/seoul.jpg',
        text: 'wetwet',
        date: '2015.05.05'
    },
    {
        title: 'Madrid, Spain',
        imageUrl: 'https://s3.amazonaws.com/aaron-cdn/react-image-timeline/spain.jpg',
        text: 'wetwet',
        date: '2015.05.05'
    },
    {
        title: 'Tokyo, Japan',
        imageUrl: 'https://s3.amazonaws.com/aaron-cdn/react-image-timeline/tokyo.jpg',
        text: 'wetwet',
        date: '2015.05.05'
    }
];

function shuffled(inputArray) {
    let j, x, i;
    let a = R.clone(inputArray);
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    return a;
    console.log(inputArray)
    console.log(a)
}

export function getSampleData(inOrder = true) {
    let offset = 0;
    const t = inOrder ? array => array : shuffled;
    let orderedCities = R.map(city => {
        offset += Math.random() * 100;
        return R.merge({}, city);
    }, t(cities));
    return t(orderedCities);
}