<template>
    <nuxt />
</template>

<style>
body {
    font-family: sans-serif;
    background: #e5e5e5;
}

h1,
h2,
h3 {
    margin: 16px 0 4px 0;
}

#app {
    margin: auto;
    background: white;
    border-radius: 3px;
    padding: 8px;
    --deg: 90deg;
    --nbnotes: 6;
}
@media screen and (min-width: 500px) {
    #app {
        max-width: 1000px;
        padding: 16px;
    }
}
</style>
