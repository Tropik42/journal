import React from 'react';

const Time = (todo) => {

    const now = new Date()   
    //Текущий день
    const initToday = now.getFullYear() + "-" + 
    (now.getDate().toString().length > 1 ? now.getDate() : '0' + now.getDate()) + "-" + 
    (now.getMonth().toString().length > 1 ? (now.getMonth() + 1) : '0' + (now.getMonth() + 1)) + " "
    //Преобразованный текущий день
    const today = initToday.split("-").join('')
    //Вчерашний день
    const yesterday = +today - 100
    //Вчерашний день для 1-го числа месяца
    const zeroYesterday = +`${yesterday.toString().slice(0,4)}00${yesterday.toString().slice(6)}`
    //Время задания из объекта
    const initTime = todo.time
    //Преобразованное время задания
    const time = initTime.slice(0,10).split("-").join('')

    // console.log(today, yesterday, zeroYesterday, initTime)
    
    
    if (+time === +today) {
        return (`Сегодня в ${initTime.slice(11)}`)
    } else if (+time === (yesterday || zeroYesterday)) {
        return (`Вчера в ${initTime.slice(11)}`)
    }
    return (
        <p>{initTime.slice(0, 16)}</p> 
    )

};

export default Time;