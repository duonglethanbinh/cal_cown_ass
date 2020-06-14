// 
// get current year
let year = new Date().getFullYear();
// get new year time
let nextyear = new Date(`Jan 1, ${year + 1} 00:00:00`);
// get time left
function updateTime() {
    let current = new Date().getTime();
    let countdown = nextyear - current;
    // 1 second=1000 miniseconds
    let sec = 1000;
    let min = sec * 60;
    let hour = min * 60;
    let day = hour * 24;

    var d = Math.floor(countdown / day);
    var h = Math.floor((countdown % (day)) / (hour));
    var m = Math.floor((countdown % (hour)) / (min));
    var s = Math.floor((countdown % (min)) / (sec));

    document.getElementById('daycountdown').innerText = d + " days";
    document.getElementById('hourcountdown').innerText = h + " hours";
    document.getElementById('mincountdown').innerText = m + " minutes";
    document.getElementById('seccountdown').innerText = s + " seconds";

    if (d === 0)
        document.getElementById('day').innerText = d + " day";
    if (h === 0)
        document.getElementById('hour').innerText = h + " hour";
    if (m === 0)
        document.getElementById('min').innerText = m + " minute";
    if (s === 0)
        document.getElementById('sec').innerText = s + " second";
    else ''

}
setInterval(() => { updateTime() }, 1000)

// analog clock
var inc = 1000;

clock();

function clock() {
    const date = new Date();

    const hours = ((date.getHours() + 11) % 12 + 1);
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const hour = hours * 30;
    const minute = minutes * 6;
    const second = seconds * 6;

    document.querySelector('.hour').style.transform = `rotate(${hour}deg)`
    document.querySelector('.minute').style.transform = `rotate(${minute}deg)`
    document.querySelector('.second').style.transform = `rotate(${second}deg)`
}

setInterval(clock, inc);

// Calculator
function calculator() {
    // result
    var result;
    // current number
    var currNum;
    // prev result
    var prevResult;
    // history
    var history;
    // prev btn pressed
    var prevBtn;
    // math operation
    var mathOp;
    // prev math operation
    var prevMathOp;
    // math operation counter
    var mathOpCount;
    // math op pressed?
    var mathOpPress;
    // init
    var isInit;
    // main screen
    var mainScreen = document.querySelector('#main');
    // history screen
    var historyScreen = document.querySelector('#history');

    // attach click events to buttons
    Array.prototype.forEach.call(document.querySelectorAll('.button'), function (btn) {
        btn.addEventListener('click', function (e) {
            // `e.currentTarget` or `this`
            var btnClicked = e.currentTarget.getAttribute('data-value');
            input(btnClicked);
        });
    });

    // initialize
    function init() {
        result = null;
        currNum = 0;
        prevBtn = null;
        mathOp = null;
        prevMathOp = null;
        mathOpCount = 0;
        history = '';
        mathOpPress = false;
        isInit = true;
        updateMainScreen(0);
        updateHistoryScreen(history);
    }

    //
    function input(btn) {

        // copy prev math op
        if (!isNaN(prevBtn) && btn !== '=' && btn !== 'C' && btn !== 'CE' && btn !== 'CS' && btn !== '.') {
            prevMathOp = mathOp;
        }

        switch (btn) {
            case '+': mathOpPress = true; mathOp = addition; break;
            case '-': mathOpPress = true; mathOp = subtraction; break;
            case '/': mathOpPress = true; mathOp = division; break;
            case '*': mathOpPress = true; mathOp = multiplication; break;
            case 'C': init(); break;
        }

        handler(btn);

        var fontSize = parseFloat(mainScreen.style.fontSize);
        // return to default main screen size
        if (fontSize < 3 && currNum.length < 11) {
            mainScreen.style.fontSize = '3rem';
        }

        console.log('Result: ' + result);
        console.log('Prev result: ' + prevResult);
        console.log('current number: ' + currNum);
        console.log('btn: ' + btn);
        console.log('Prev Math Op: ' + prevMathOp);
        console.log('Math Op Counter: ' + mathOpCount);
        console.log('Prev btn: ' + prevBtn);
        console.log('History: ' + history);
        console.log('Main Screen ' + mainScreen.value);
        console.log('*'.repeat(15));
    }

    //
    function handler(btn) {
        // return if C wasn't pressed when divide by zero was done
        if (btn !== 'C' && result === 'Result is undefined' || result === 'Cannot divide by zero') {
            return;
        }

        // update history
        if (btn !== '=' && btn !== 'C' && btn !== 'CE' && btn !== 'CS') {
            history = (isNaN(prevBtn) && isNaN(btn)) ? history.slice(0, -1) + btn : history + btn;
        }

        // btn clicked is `Number` or `.`
        if (!isNaN(btn) || btn === '.') {
            if (btn === '.' && /^\d+$/.test(currNum)) {
                currNum = currNum + btn;
            } else if (!isNaN(btn)) {
                currNum = (!isNaN(prevBtn) && prevBtn !== null && mainScreen.value !== '0') || prevBtn === '.' ? currNum + btn : btn;
            }           
            if (result !== null && prevResult !== null && result !== prevResult) {
                if (btn === '0') {
                    init()
                    currNum = 0
                }
                if (btn === '1') {
                    init()
                    currNum = 1
                }
                if (btn === '2') {
                    init()
                    currNum = 2
                }
                if (btn === '3') {
                    init()
                    currNum = 3
                }
                if (btn === '4') {
                    init()
                    currNum = 4
                }
                if (btn === '5') {
                    init()
                    currNum = 5
                }
                if (btn === '6') {
                    init()
                    currNum = 6
                }
                if (btn === '7') {
                    init()
                    currNum = 7
                }
                if (btn === '8') {
                    init()
                    currNum = 8
                }
                if (btn === '9') {
                    init()
                    currNum = 9
                }
            }
            prevResult = 0;
            mathOpPress = false;
            updateMainScreen(currNum);
            // btn clicked is `Sign`
        } else {
            // update history
            if (btn === '-' || btn === '+' || btn === '*' || btn === '/') {
                // for example, when `-` is pressed, add `0 -` to history screen
                if ((prevBtn === null || prevBtn === '=') && !isInit) {
                    history = '0' + btn;
                    mathOpCount++;
                }

                if (!historyScreen.value.length && mainScreen.value.length) {
                    history = mainScreen.value + btn;
                }
            }

            // if math op was pressed and result is null
            if (mathOp && result === null) {
                result = Number(currNum);
            }

            // count result
            if (btn === '=') {
                // if math op exists
                if (mathOp) {
                    mathOpCount = 0;
                    // if last button pressed is `mathOperation`
                    // like `+, - etc.` before `=` was pressed
                    if (mathOpPress) {
                        mathOp(prevResult);
                        // if last button pressed is `digit` before `=` was pressed
                    } else {
                        mathOp(Number(currNum));
                    }

                    history = '';
                    prevBtn = btn;

                    updateMainScreen(result);
                    updateHistoryScreen(history);

                    return;
                }
            }

            // count math ops

            if (btn === 'CE' && history.length > 0) {
                history = history.slice(0, -(currNum.length));
                currNum = '0';
                updateMainScreen(0);
            } else if (btn === 'CS') {
                if (result != mainScreen.value) {
                    currNum = currNum.slice(0, -1);
                    history = history.slice(0, -1);
                    if (!currNum.length) {
                        currNum = '0';
                    }
                    updateMainScreen(currNum);
                } else {
                    return;
                }
            }

            if (result !== null && btn !== 'CE' && btn !== 'CS') {
                updateHistoryScreen(history);
            }
        }

        prevBtn = btn;
        prevResult = result;
        isInit = false;
    }

    function updateMainScreen(val) {

        val = String(val);

        if (val.length > 10) {
            mainScreen.style.fontSize = '1.75rem';
            val = Math.round(val * 10000000000000000) / 10000000000000000;
        }

        mainScreen.value = val;
    }

    function updateHistoryScreen(history) {
        historyScreen.value = history;
    }

    function addition(val) {
        result += val;
    }

    function subtraction(val) {
        result -= val;
    }

    function division(val) {
        result /= val;
    }

    function multiplication(val) {
        result *= val;
    }
    init();

};
calculator();
