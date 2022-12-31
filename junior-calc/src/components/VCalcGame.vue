<script setup lang="ts">
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import type{ Ref } from 'vue';

const inGame:Ref<boolean> = ref(false);
const endGame:Ref<boolean> = ref(false);

const checkPlusOne = ref(true)
const checkPlusTwo = ref(false)
const checkMinusOne = ref(false)
const checkMinusTwo = ref(false)
const checkEachRandom = ref(false)
const checkAllRandom = ref(false)

let currentQuestion:string = ''
let questions:string[] = []

let plusOne: string[] = []
let plusTwo: string[] = []
let minusOne: string[] = []
let minusTwo: string[] = []

const typeBox:Ref<string> = ref('');
let startTime: number = Date.now()
let endTime: string = ""

const currentQuestionCount = ref(0)
const allQuestionCount = ref(0)

const createQuestions = (): void => {
    for(let i=0; i<20; i++){
        for(let j=1; j<10; j++){
            if(i>=11){
                if((i-j) < 10){
                    minusTwo.push(i + "-" + j)
                }
            } else if(i==10){
                continue
            } else {
                if((i+j) > 10){
                    plusTwo.push(i + "+" + j)
                } else {
                    plusOne.push(i + "+" + j)
                    if(i>=j){
                        minusOne.push(i + "-" + j)
                    }
                }
            }
        }
    }
}

const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const concatQuestions = (tmpQuestions: string[]): void => {
    let tmpQ = [...tmpQuestions]
    if(checkEachRandom.value){
        tmpQ = shuffle(tmpQ)
    }
    questions = questions.concat(tmpQ)
}

const appendQuestions = (): void => {
    questions = []
    if(checkPlusOne.value){ concatQuestions(plusOne) }
    if(checkPlusTwo.value){ concatQuestions(plusTwo) }
    if(checkMinusOne.value){ concatQuestions(minusOne) }
    if(checkMinusTwo.value){ concatQuestions(minusTwo) }
    if(checkAllRandom.value){
        console.log("all random")
        questions = shuffle(questions)
    }
}

const gameStart = ():void => {
    appendQuestions()
    currentQuestion = questions[0]
    allQuestionCount.value = questions.length
    startTime = Date.now()
    inGame.value = true;
    nextTick(() => {
        document.getElementById('typeForm').focus()
    })
}

const resetGame = ():void => {
    inGame.value = false;
    endGame.value = false;
    currentQuestionCount.value = 0;
}


const getDiffTime = (timeFrom: number, timeTo: number): string => {
    let diffTime = Math.floor((timeTo - timeFrom) / 1000)
    let sec = ('00' + (diffTime % 60)).slice(-2)
    let minutes = ('00' + Math.floor(diffTime / 60)).slice(-2)
    return minutes + ":" + sec
}

onMounted(() => {
    createQuestions()
});

var styleObject = computed(() => {
    var width = currentQuestionCount.value / allQuestionCount.value * 100 + "%"
    if(currentQuestionCount.value == allQuestionCount.value){
        var color = "#03a9f4"
    }else{
        var color = "orange"
    }

    return{
        'currentQuestionCount': currentQuestionCount.value,
        'allQuestionCount': allQuestionCount.value,
        'width': width,
        'background-color': color
    }
    })

watch(typeBox, (typeString) => {
    if(typeString == eval(currentQuestion)){
        questions.splice(0, 1)
        currentQuestion = questions[0]
        typeBox.value = ''
        currentQuestionCount.value++
        if(currentQuestionCount.value == allQuestionCount.value){
            endTime = getDiffTime(startTime, Date.now())
            endGame.value = true
        }
    }
})
</script>

<template>
    <div class="container">
        <div class="title">
            <h1>けいさん</h1>
            <div class="marker"></div>
        </div>
        <button v-if="inGame!=true" class="startButton commonButton mb-20" @click="gameStart">スタート</button>
        <button v-if="endGame" class="endButton commonButton mb-20" @click="resetGame">もういっかい</button>
        <div v-if="inGame!=true" class="checkItems">
            <input v-model="checkPlusOne" type="checkbox" />たしざん１<br>
            <input v-model="checkPlusTwo" type="checkbox" />たしざん２<br>
            <input v-model="checkMinusOne" type="checkbox" />ひきざん１<br>
            <input v-model="checkMinusTwo" type="checkbox" />ひきざん２<br>
            <input v-model="checkEachRandom" type="checkbox" />それぞれまぜまぜ<br>
            <input v-model="checkAllRandom" type="checkbox" />ぜんぶまぜまぜ<br>
        </div>
        <div v-if="inGame">
            <button v-if="endGame!=true" class="endButton commonButton mb-20" @click="resetGame">やめる</button>
            <div class="quession mb-20">{{ currentQuestion }}</div>
            <div v-if="currentQuestionCount == allQuestionCount" class="clear">おめでとう！</div>
            <div v-if="currentQuestionCount == allQuestionCount" class="clear">{{ endTime }}</div>
            <div v-if="endGame!=true" class="typeFormWrapper mb-20">
                <input id="typeForm" v-model="typeBox" type="number" pattern="\d*" class="typeForm">
            </div>

            <div class="gaugeWrapper mb-20">
                <div v-bind:style="styleObject" class="gauge"></div>
            </div>

            <div>{{ currentQuestionCount }}/{{ allQuestionCount }}</div>
        </div>
    </div>
</template>

<style>
.container{
    width: 300px;
    margin: 0 auto;
    text-align: center;
}

.mb-20{
    margin-bottom: 10px;
}

.title{
    position: relative;
    font-size: 24px;
}

.marker{
    width: 100%;
    height: 35%;
    background-color: #a2a2a270;
    position: absolute;
    bottom: 5%;
    z-index: -1;
}

.commonButton{
    padding: 4px 60px;
    border: none;
    outline: none;
    border-radius: 8px;
    cursor: pointer;
}

.startButton{
    background-color: #333;
    color: #fff;
}

.endButton{
    background-color: yellowgreen;
    color: #fff;
}

.quession{
    color: gray;
}

.clear{
    color: #03a9f4;
}

.typeForm{
    text-align: center;
    outline: none;
    border: none;
}

.typeFormWrapper{
    border-bottom: 1px solid gray
}

.gauge{
    height: 12px;
    transition: all 0.3s ease;
}

.gaugeWrapper{
    border: 1px solid;
    height: 12px;
}

.checkItems{
    font-size: 14px;
}

.debugStr{
    font-size: 12px;
}
</style>
