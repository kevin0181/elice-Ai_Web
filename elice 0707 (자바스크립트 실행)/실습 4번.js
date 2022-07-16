// const TimeMap = (() => { //Immediately Invokable Function Expression (IIFE) 즉시 실행 함수

//   let min = 60;
//   let hour = min * 60;
//   let day = hour * 24;
//   let week = day * 7;
//   let month = week * 4;
//   let year = month * 12;

//   return { min, hour, day, week, month, year };
// })();


const TimeMap = {
    min : 60,
    hour : 3600,
    day : 86400,
    week : 604800,
    month : 2628000,
    year : 31540000
}

const TimeTextMap = {
    [TimeMap.min]: "분",
    [TimeMap.hour]: "시간",
    [TimeMap.day]: "일",
    [TimeMap.week]: "주",
    [TimeMap.month]: "개월",
    [TimeMap.year]: "년",
};

function createTimeText(time, standard, suffix) {
    return `${Math.floor(time / standard)}${suffix} 전`;
}

const RelativeTime = {
    diff: (date) => {
        const getResult = (new Date() - date) / 1000; //지금 시간과 받아온 date의 시간 차이.

        return Object.entries(TimeMap).reduce((text, [time, value]) => {
            if (getResult >= value) return createTimeText(getResult, value, TimeTextMap[value]);
            return text;
        }, `방금 전`); //기본값
    },
};

export default RelativeTime;
