<template>
    <h1>This is Dashboard</h1>
    <p>welcom client!</p>
    <button @click="toRandomPageOne">randomPageOne</button>
    <button @click="toRandomPageTwo">randomPageTwo</button>
</template>

<script>
export default {
    name : 'dashboard',
    methods: {
        toRandomPageOne() {
            this.$router.push('/randomPageOne')
        },
        toRandomPageTwo() {
            this.$router.push('/randompagetwo')
        }
    }
}
</script>

<style scoped>
h1, p {
    text-align: center;
}
button {
    display: block;
    margin: 12px auto;
    border-radius: 12px;
    background-color: #1a1a1a;
    border: 1px solid #fff;
}
</style>