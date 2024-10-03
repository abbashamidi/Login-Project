<template>
    <h1>This is Random Page One</h1>
    <p>welcome client!</p>
</template>

<script>
import { mapGetters } from 'vuex'; // Import mapGetters to access Vuex state

export default {
    name: 'RandomPageOne',

    computed: {
        // Map Vuex getters to computed properties in the component
        ...mapGetters(['isLoggedIn', 'getUsername']),
    },
};
</script>

<style scoped>
h1,
p {
    text-align: center;
}
</style>