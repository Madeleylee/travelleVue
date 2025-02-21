<template>
    <div class="ciudad-view" v-if="ciudad">
        <h1>Destinos en {{ nombreCiudad }}</h1>
        <div class="lugares-grid">
            <DestinoCard v-for="lugar in ciudad.lugares" :key="lugar.nombre" :destino="lugar" :nombrePais="nombrePais"
                :nombreCiudad="nombreCiudad" />
        </div>
    </div>
    <div v-else class="error-view">
        <h1>Ciudad no encontrada</h1>
        <router-link to="/" class="btn-volver">Volver al inicio</router-link>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import DestinoCard from "@/components/DestinoCard.vue";
import data from "@/assets/data/data.json";

const route = useRoute();

const nombrePais = computed(() => route.params.nombrePais);
const nombreCiudad = computed(() => route.params.nombreCiudad);

const ciudad = computed(() => {
    const pais = data.paises.find(p => p.name === nombrePais.value);
    return pais ? pais.ciudades[nombreCiudad.value] : null;
});
</script>

<style scoped>
.ciudad-view {
    padding: 2rem;
    min-height: calc(100vh - 60px);
    /* Ajusta esto según la altura de tu footer */
}

h1 {
    color: var(--color-primary);
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
}

.lugares-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.error-view {
    text-align: center;
    padding: 4rem 2rem;
}

.btn-volver {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: var(--color-primary);
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.btn-volver:hover {
    background-color: var(--color-accent);
}

@media (max-width: 1200px) {
    .lugares-grid {
        padding: 0 2rem;
    }
}

@media (max-width: 1024px) {
    .lugares-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .ciudad-view {
        padding: 1rem;
    }

    h1 {
        font-size: 2rem;
        margin-bottom: 1.5rem;
    }

    .lugares-grid {
        grid-template-columns: 1fr;
        max-width: 400px;
        padding: 0;
    }
}

/* Estilos para cuando hay un solo lugar */
.lugares-grid:has(> *:first-child:nth-last-child(1)) {
    grid-template-columns: repeat(3, 1fr);
}

.lugares-grid>*:first-child:nth-last-child(1) {
    grid-column: 1;
}

@media (max-width: 1024px) {
    .lugares-grid:has(> *:first-child:nth-last-child(1)) {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .lugares-grid:has(> *:first-child:nth-last-child(1)) {
        grid-template-columns: 1fr;
    }
}
</style>