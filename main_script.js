let index, totalAtempt, totalCorrect, time1, time2, new_index, overallsec, overallmin;
const askQues = [], random = [];
let startButton = document.querySelector('#startButton');
function start(startButton) {
    startButton.addEventListener('click', (event) => {
        if (event.isTrusted) {
            index = 0, totalAtempt = 0, totalCorrect = 0, new_index = 0, askQues.length = 0, overallsec = 0, overallmin = 2;
            randQues();
            addQues();
        }
    });
}
start(startButton);
function addQues() {
    document.querySelectorAll('.box')[0].innerHTML = "";
    index = random[new_index] - 1;
    if (new_index === 0) {
        overallTimeInterval();
    }
    if(new_index === quizQues.length){
        End();
        return;
    }
    askQues.push({
        serial: quizQues[index].serial,
        question: quizQues[index].question,
        options: quizQues[index].options,
        answer: quizQues[index].answer,
        select: 'Not Answered'
    });
    document.querySelectorAll('.box')[0].innerHTML = `
        <div id="timeBox">
            <div class="time">
                <h1 class="time">Total Time</h1>
                <h1 class="time">00 : 00</h1>
            </div>
            <div class="time">
                <h1 class="time">Question Time</h1>
                <h1 class="time">00 : 00</h1>
            </div>
            </div>
            <div id="quesBox">
                <h1 class="ques"><span>Ques ${new_index + 1} :</span>${quizQues[index].question}</h1>
            <div id="ques" class="ques">
                <label for="option1"><h1 class="opt"><input type="radio" id="option1" value="1" name="option"> ${quizQues[index].options[0]}</h1></label>
                <label for="option2"><h1 class="opt"><input type="radio" id="option2" value="2" name="option">${quizQues[index].options[1]}</h1></label>
                <label for="option3"><h1 class="opt"><input type="radio" id="option3" value="3" name="option"> ${quizQues[index].options[2]}</h1></label>
                <label for="option4"><h1 class="opt"><input type="radio" id="option4" value="4" name="option"> ${quizQues[index].options[3]}</h1></label>
            </div>
        </div>
        <div class="buttons">
            <button id="submit">Submit</button>
            <button id="next">Next</button>
        </div>`;
    index++;
    changeColor();
    timeInterval();
    buttons();
    new_index++;
}
function calculate(option, quesNo) {
    if (quizQues[quesNo].answer === quizQues[quesNo].options[option]) {
        totalCorrect++;
    }
    totalAtempt++;
}
function report() {
    // console.log(askQues)
    document.querySelectorAll('.box')[0].innerHTML = ""
    document.querySelectorAll('.box')[0].innerHTML = `
        <h1>Overall Report of your knowledge</h1>
        <ul>
            <li>Total Questions : 20</li>
            <li>Attempted Questions : ${totalAtempt}</li>
            <li>Total Corrected Questions : ${totalCorrect}</li>
            <li>Total Wrong Qestions : ${totalAtempt - totalCorrect}</li>
        </ul>
        <h1>Better Luck Next Time</h1>
        <button id="startButton">Start</button>
        <div style="overflow-x: auto; width: 100%;">
    `;
    let table = document.createElement('table');
    table.setAttribute("style", "width: 100%; border-collapse: collapse; margin-top: 2vmax; margin-bottom:5vmax;");

    let trhead = document.createElement('tr');
    let th1 = document.createElement('th');
    th1.innerText = "Question";
    th1.style.border = "1px solid royalblue";
    th1.style.padding = ".5vmax";
    th1.style.textAlign = "left";
    let th2 = document.createElement('th');
    th2.innerText = "Options";
    th2.style.border = "1px solid royalblue";
    th2.style.padding = ".5vmax";
    th2.style.textAlign = "left";
    let th3 = document.createElement('th');
    th3.innerText = "Correct Answer";
    th3.style.border = "1px solid royalblue";
    th3.style.padding = ".5vmax";
    th3.style.textAlign = "left";
    let th4 = document.createElement('th');
    th4.innerText = "Your Answer";
    th4.style.border = "1px solid royalblue";
    th4.style.padding = ".5vmax";
    th4.style.textAlign = "left";

    trhead.appendChild(th1);
    trhead.appendChild(th2);
    trhead.appendChild(th3);
    trhead.appendChild(th4);
    table.appendChild(trhead);
    askQues.forEach((quiz,index) => {
        let trrow = document.createElement('tr');
        let quescell = document.createElement('td');
        quescell.innerText = index + 1 + ".) " + quiz.question;
        quescell.style.border = "1px solid royalblue";
        quescell.style.padding = ".5vmax";

        let optcell = document.createElement('td');
        optcell.innerText = quiz.options.map((option, index) => `${index + 1}.) ${option}`).join("\n");
        optcell.style.border = "1px solid royalblue";
        optcell.style.padding = ".5vmax";

        let anscell = document.createElement('td');
        anscell.innerText = quiz.answer;
        anscell.style.border = "1px solid royalblue";
        anscell.style.padding = ".5vmax";

        let usercell = document.createElement('td');
        usercell.innerText = quiz.select === 'Not Answered' ? quiz.select : quiz.select + 1 + ".) " + " " + quiz.options[quiz.select];
        usercell.style.border = "1px solid royalblue";
        usercell.style.padding = ".5vmax";

        trrow.appendChild(quescell);
        trrow.appendChild(optcell);
        trrow.appendChild(anscell);
        trrow.appendChild(usercell);
        table.appendChild(trrow);
    });
    document.querySelectorAll('.box')[0].appendChild(table);    
    document.querySelectorAll('.box')[0].innerHTML += "</div>";
    startButton = document.querySelector('#startButton');
    start(startButton);
}
function buttons() {
    const next = document.querySelector('#next');
    next.addEventListener('click', (event) => {
        if (event.isTrusted) {
            clearInterval(time1);
            addQues();
        }
        // console.log(askQues[new_index-1]);
    });
    const submit = document.querySelector('#submit');
    submit.addEventListener('click', (event) => {
        if (event.isTrusted) {
            if (document.querySelector('input[name="option"]:checked')) {
                clearInterval(time1);
                askQues[new_index - 1].select = parseInt(document.querySelector('input[name="option"]:checked').value) - 1;
                calculate(parseInt(document.querySelector('input[name="option"]:checked').value) - 1, index - 1);
                addQues();
            }
            else {
                alert("If you want to submit then please choose anyone answer......")
            }
        }
        // console.log(askQues[new_index-1]);
    });
}
function timeInterval() {
    let sec = 10;
    time1 = setInterval(() => {
        document.querySelectorAll('.time')[5].innerHTML = `${'00'} : ${('0' + sec).slice(-2)}`;
        if (sec <= 0) {
            // console.log(min,sec)
            clearInterval(time1);
            addQues();
        }
        sec--;
    }, 1000);
}
function overallTimeInterval() {
    overallsec = 0, overallmin = 2;
    time2 = setInterval(() => {
        document.querySelectorAll('.time')[2].innerHTML = `${('0' + overallmin).slice(-2)} : ${('0' + overallsec).slice(-2)}`;
        if (overallsec <= 0 && overallmin <= 0) {
            End();
        }
        if (overallsec == 0 && overallmin > 0) {
            overallmin--;
            overallsec = 59;
        }
        else {
            overallsec--;
        }
    }, 1000);
}
function End() {
    if ((new_index >= quizQues.length) || (overallsec <= 0 && overallmin <= 0)) {
        if (overallsec <= 0 && overallmin <= 0) {
            alert("Your time Ended");
        }
        else {
            alert("No more Question");
        }
        clearInterval(time1);
        clearInterval(time2);
        report();
    }
    // console.log(random)
}
function randQues() {
    for (let i = 0; i < quizQues.length; i++) {
        random.push(i + 1);
    }
    for (let i = random.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); 
        [random[i], random[j]] = [random[j], random[i]]; 
    }
    // console.log(random)
    // console.log(random.sort());
}
function changeColor(){
    let opt = document.querySelectorAll('.opt');
    opt.forEach((each)=>{
        each.addEventListener('click',()=>{
            opt.forEach(b => b.classList.remove("selected"));
            each.classList.add("selected");
        });
    });
}
