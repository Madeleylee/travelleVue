<template>
    <footer class="footer">
        <p>&copy; {{ currentYear }} Travelle. Todos los derechos reservados.</p>
    </footer>
</template>

<script setup>
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
.footer {
    background-color: var(--color-primary);
    color: white;
    text-align: center;
    padding: 1rem;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
}
</style>