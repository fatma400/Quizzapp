let countSpan=document.querySelector('.count span')
let bulletsSpanContainer=document.querySelector('.bullets .spans')
let currentIndex=0
let quizArea=document.querySelector('.quiz-area')
let answerArea=document.querySelector('.answer-area')
let radioInput=document.getElementById('radioInput')
let subnitButton=document.querySelector('.sunbmit-button')
let rightAnswer=0
let bullets=document.querySelector(".bullets")
let results=document.querySelector(".results")
let countdowenInterval;
let countdowenElement=document.querySelector('.count-dowen')
async function getApi() {
    let response=await fetch("question.json")
    let data= await response.json()
    let questionCount=data.length    
    createBullets(questionCount)
    addQuestionData(data[currentIndex],questionCount)
    countDowen(20,questionCount)
    subnitButton.onclick=()=>{
       let theRightAnswer=data[currentIndex].answerRyght;
      currentIndex++;
      checkAnswer(theRightAnswer,questionCount)
           //remove previous question
           quizArea.innerHTML="";
           answerArea.innerHTML=""
           addQuestionData(data[currentIndex],questionCount)
           //handle spane
           handleBullets()
           //start countdowen
           clearInterval(countdowenInterval);
           countDowen(20,questionCount)
           //show results
           showResults(questionCount)
    }
}
getApi()
function createBullets(num){
    countSpan.innerHTML=num
    for(let i=0; i<num;i++){
        let theBullet=document.createElement("span")
        if(i===0){
            theBullet.className="on"
        }
        bulletsSpanContainer.appendChild(theBullet)
    }
}
function addQuestionData(obj,count){
    if(currentIndex < count){
        var carton=''
        carton+=`
        <h2>${obj.title}</h2>
         `
         quizArea.innerHTML=carton
         for(let i=1; i<=4;i++){
              let mainDiv=document.createElement("div")
              mainDiv.className='answer';
              let radioButton=document.createElement("input")
              radioButton.name="questions"
              radioButton.type="radio"
              radioButton.id=`ansewer_${i}`
              radioButton.dataset.answer=obj[`ansewer_${i}`]
              if(i===1){
                radioButton.checked=true
              }
              //label
              let theLabel=document.createElement("label");
              theLabel.htmlFor=`ansewer_${i}`
              let theLabelText=document.createTextNode(obj[`ansewer_${i}`])
              theLabel.appendChild(theLabelText)
              mainDiv.appendChild(radioButton)
              mainDiv.appendChild(theLabel)
              answerArea.appendChild(mainDiv)
             }
    }  
}
function checkAnswer(rAnswer,count){
    let answers=document.getElementsByName("questions")
    let theChossenAnswer;
    for(let i=0;i<answers.length;i++){
        if(answers[i].checked){
            theChossenAnswer=answers[i].dataset.answer
        }        
    }    
    if (rAnswer === theChossenAnswer){
        alert("شطورة عااااااااش");  
        rightAnswer++
    } else{
        alert("يلا يا فاشله")
    } 
}
function handleBullets(){
    let bulletsSpans=document.querySelectorAll(".bullets .spans span")
    let arrayOfSpans=Array.from(bulletsSpans)
    arrayOfSpans.forEach((span,index)=>{
        if(currentIndex===index){
            span.className="on"
        }
    })
}
function showResults(count){
    let theResults
    if(currentIndex===count){
        quizArea.remove()
        answerArea.remove()
        subnitButton.remove()
        bullets.remove()
        if(rightAnswer > (count/2) && rightAnswer < count){
            theResults=`<h2 class="good">نص نص فى الافلام  <i class="fa-solid fa-face-smile-wink" style="color: #fdc708;"></i></h2>
            <h4>${rightAnswer}/${count}</h4>
            `
        } else if(rightAnswer===count){
            theResults=`<h2 class="perfect">عاش عليكى ممتازة  <i class="fa-solid fa-face-laugh-squint" style="color: #fdc708;"></i></h2>
            <h4>${rightAnswer}/${count}</h4>
          `
        }
        else{
            theResults=`<h2 class="bad">يلا يا فاشله <i class="fa-solid fa-face-grin-tongue-squint" style="color: #fdc708;"></i></h2>
            <h4>${rightAnswer}/${count}</h4>
            `
        }
        results.innerHTML=theResults
    }
}
function countDowen(duretion,count){
    if(currentIndex < count){
        let minutes,seconds
        countdowenInterval=setInterval(function(){
            minutes=parseInt(duretion / 60)
            seconds=parseInt(duretion % 60)
            minutes=minutes <10 ? `0${minutes}`: minutes
            seconds=seconds <10 ? `0${seconds}`: seconds
            countdowenElement.innerHTML=`${minutes}:${seconds}`
            if(--duretion < 0){
                clearInterval(countdowenInterval);
                subnitButton.click()
            }

        }, 1000);
    }
}