<script setup>
import DestinoCard from "../components/DestinoCard.vue";
import data from "../assets/data/data.json";

const route = useRoute();

const nombrePais = computed(() => route.params.nombrePais);
const nombreCiudad = computed(() => route.params.nombreCiudad);

const ciudad = computed(() => {
    const pais = data.paises.find(p => p.name === nombrePais.value);
    return pais ? pais.ciudades[nombreCiudad.value] : null;
});
</script>

<template>
    <div class="ciudad-view" v-if="ciudad">
        <h1>Destinos en {{ nombreCiudad }}</h1>
        <div class="lugares-container">
            <div class="lugares-grid">
                <DestinoCard v-for="lugar in ciudad.lugares" :key="lugar.nombre" :destino="lugar"
                    :nombrePais="nombrePais" :nombreCiudad="nombreCiudad" />
            </div>
        </div>
    </div>
    <div v-else class="error-view">
        <h1>Ciudad no encontrada</h1>
        <router-link to="/" class="btn-volver">Volver al inicio</router-link>
    </div>
</template>


<style scoped>
.ciudad-view {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

h1 {
    color: var(--color-primary);
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
}

.lugares-container {
    padding: 0 1rem;
}

.lugares-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
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
    }

    .lugares-grid {
        grid-template-columns: 1fr;
        max-width: 400px;
        margin: 0 auto;
    }
}
</style>