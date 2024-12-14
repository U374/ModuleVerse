const qBox = document.querySelector('#ques')
const optionBox = document.querySelector('.options')
const optionBtn = document.querySelectorAll('#options button')
const display = document.querySelector('.question')
const choice = document.querySelector('#menu')

const quiz = async () => {
  try {
    const res = await fetch(choice.value)
    const data = await res.json()
    const ques = (data.results[0].question)
    let c = "."+(data.results[0].correct_answer)
    let n1 = (data.results[0].incorrect_answers[0])
    let n2 = (data.results[0].incorrect_answers[1])
    let n3 = (data.results[0].incorrect_answers[2])
    let option = [c, n1, n2, n3]
    option.sort(() => Math.random() - 0.5)

    qBox.innerHTML = `<strong id="question20">${ques}</strong>`

    optionBox.innerHTML = (
      `<button class="OP">${option[0]}</button>
      <button class="OP">${option[1]}</button>
      <button class="OP">${option[2]}</button>
      <button class="OP">${option[3]}</button>`
    )
    let OPTBTN = document.querySelectorAll('.OP')
    OPTBTN.forEach(button => {
      button.addEventListener('click', () => {
        const selected = button.innerHTML
        if(selected == c){
          optionBox.innerHTML = `<strong id="strC">Correct Answer! <br> The Answer was: ${c}</strong><br> <br> <button onclick="quiz()" class="submit-btn">Next</button>`
        }
        else{
          optionBox.innerHTML = `<strong id="str">Alas! It was a wrong answer <br> The Correct Answer was: ${c}</strong><br><br><button onclick="quiz()" class="submit-btn">Next</button>`
        }
      })
    })

  } catch (e) {
    console.log(e)
  }
}
