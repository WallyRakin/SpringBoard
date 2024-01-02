function timeToWords(time) {
    const numbersToWords = [
        'zero', 'one', 'two', 'three', 'four',
        'five', 'six', 'seven', 'eight', 'nine',
        'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
        'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen',
    ];
    const numbersToWordsTens = [undefined, undefined, 'twenty', 'thirty', 'forty', 'fifty']

    const [hour, minute] = time.split(':').map(num => parseInt(num, 10));
    let wordHour = numbersToWords[hour % 12 === 0 ? 12 : hour % 12];
    let wordMinute = minute < 20 ? numbersToWords[minute] : `${numbersToWordsTens[Math.floor(minute / 10)]} ${numbersToWords[minute % 10]}`;
    let suffix = hour < 12 ? 'am' : 'pm';

    if (minute === 0) {
        if (hour === 0) return 'midnight';
        if (hour === 12) return 'noon';
        return `${wordHour} o'clock ${suffix}`;
    }

    if (minute < 10) wordMinute = 'oh ' + wordMinute;
    if (minute == 20) wordMinute = 'twenty';
    if (minute == 30) wordMinute = 'thirty';
    if (minute == 40) wordMinute = 'forty';
    if (minute == 50) wordMinute = 'fifty';

    return `${wordHour} ${wordMinute} ${suffix}`;
}

// Tests
const testTimes = [
    "00:00", "00:12", "01:00", "06:01", "06:10",
    "06:18", "06:30", "10:34", "12:00", "12:09", "23:24"
];
const expectedOutputs = [
    "midnight", "twelve twelve am", "one o'clock am", "six oh one am", "six ten am",
    "six eighteen am", "six thirty am", "ten thirty four am", "noon", "twelve oh nine pm", "eleven twenty three pm"
];

testTimes.forEach((time, index) => {
    console.log(timeToWords(time));
});


module.exports = timeToWords;