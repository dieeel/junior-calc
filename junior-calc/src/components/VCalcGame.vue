<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type{ Ref } from 'vue';

const inGame:Ref<boolean> = ref(false);
let currentQuestion:string = ''
let questions:string[] = [
    'apple',
    'banana',
    'donut'
]

const gameStart = ():void => {
    inGame.value = true
}

onMounted(() => {
    currentQuestion = questions[0]
});

</script>

<template>
    <div class="container">
        <div class="title">
            <h1>けいさん</h1>
            <div class="marker"></div>
        </div>
        <button v-if="inGame!=true" class="startButton mb-20" @click="gameStart">スタート</button>
        <div v-if="inGame">
            <div class="quession mb-20">{{ currentQuestion }}</div>
            <div class="clear">がんばったね</div>
            <div class="typeFormWrapper mb-20">
                <input type="text" class="typeForm">
            </div>

            <div class="gaugeWrapper mb-20">
                <div class="gauge"></div>
            </div>

            <div>1/5</div>
        </div>
    </div>
</template>

<style>
.container{
    width: 400px;
    margin: 0 auto;
    text-align: center;
}

.mb-20{
    margin-bottom: 20px;
}

.title{
    position: relative;
    font-size: 48px;
}

.marker{
    width: 100%;
    height: 35%;
    background-color: #a2a2a270;
    position: absolute;
    bottom: 5%;
    z-index: -1;
}

.startButton{
    background-color: #333;
    color: #fff;
    padding: 4px 60px;
    border: none;
    outline: none;
    border-radius: 8px;
    cursor: pointer;
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
}

.gaugeWrapper{
    border: 1px solid;
    height: 12px;
}

</style>
