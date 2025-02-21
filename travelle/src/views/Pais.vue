<template>
    <div class="pais-view" v-if="pais">
        <h1>Destinos en {{ nombrePais }}</h1>
        <div class="ciudades-nav">
            <button @click="ciudadSeleccionada = null" :class="{ active: ciudadSeleccionada === null }"
                class="btn-ciudad">
                Todos
            </button>
            <button v-for="(_, ciudad) in pais.ciudades" :key="ciudad" @click="ciudadSeleccionada = ciudad"
                :class="{ active: ciudadSeleccionada === ciudad }" class="btn-ciudad">
                {{ ciudad }}
            </button>
        </div>
        <div class="destinos-grid">
            <template v-if="ciudadSeleccionada">
                <DestinoCard v-for="lugar in lugaresFiltered" :key="lugar.nombre" :destino="lugar"
                    :nombrePais="nombrePais" :nombreCiudad="ciudadSeleccionada" />
            </template>
            <template v-else>
                <div v-for="(lugares, ciudad) in pais.ciudades" :key="ciudad" class="ciudad-section">
                    <h2 class="ciudad-titulo">{{ ciudad }}</h2>
                    <div class="ciudad-lugares">
                        <DestinoCard v-for="lugar in lugares.lugares" :key="lugar.nombre" :destino="lugar"
                            :nombrePais="nombrePais" :nombreCiudad="ciudad" />
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import DestinoCard from "@/components/DestinoCard.vue";
import data from "@/assets/data/data.json";

const route = useRoute();
const nombrePais = computed(() => route.params.nombrePais);
const ciudadSeleccionada = ref(null);

const pais = computed(() =>
    data.paises.find((p) => p.name === nombrePais.value)
);

const lugaresFiltered = computed(() =>
    ciudadSeleccionada.value ?
        pais.value?.ciudades[ciudadSeleccionada.value].lugares :
        []
);

// Resetear la ciudad seleccionada cuando cambia el país
watch(() => route.params.nombrePais, () => {
    ciudadSeleccionada.value = null;
});
</script>

<style scoped>
.pais-view {
    padding: 2rem;
}

h1 {
    color: var(--color-primary);
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
}

.ciudades-nav {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 2rem;
}

.btn-ciudad {
    padding: 0.5rem 1rem;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 1rem;
    color: var(--color-text);
    border-bottom: 2px solid transparent;
    transition: all 0.3s ease;
}

.btn-ciudad.active {
    color: var(--color-primary);
    border-bottom-color: var(--color-primary);
}

.destinos-grid {
    display: grid;
    gap: 2rem;
}

.ciudad-section {
    margin-bottom: 3rem;
}

.ciudad-titulo {
    color: var(--color-text);
    margin-bottom: 1rem;
    font-size: 1.5rem;
}

.ciudad-lugares {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

@media (max-width: 1024px) {
    .ciudad-lugares {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .ciudades-nav {
        gap: 0.5rem;
    }

    .btn-ciudad {
        font-size: 0.9rem;
    }

    .ciudad-lugares {
        grid-template-columns: 1fr;
        max-width: 400px;
        margin: 0 auto;
    }
}
</style>