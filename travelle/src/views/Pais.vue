<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import DestinosPorCiudad from "../components/DestinosPorCiudad.vue";
import data from "../assets/data/data.json";

const route = useRoute();
const router = useRouter();

const nombrePais = computed(() => route.params.nombrePais);
const ciudadSeleccionada = ref(null);
const lugarSeleccionado = ref(null);

const pais = computed(() =>
    data.paises.find((p) => p.name === nombrePais.value)
);

const lugaresFiltered = computed(() => {
    if (!pais.value || !ciudadSeleccionada.value) return [];
    let lugares = pais.value.ciudades[ciudadSeleccionada.value].lugares;
    if (lugarSeleccionado.value) {
        lugares = lugares.filter(lugar => lugar.nombre === lugarSeleccionado.value);
    }
    return lugares;
});

function selectCiudad(ciudad) {
    ciudadSeleccionada.value = ciudad;
    lugarSeleccionado.value = null;
    updateRouteQuery();
}

function updateRouteQuery() {
    router.replace({
        query: {
            ...(ciudadSeleccionada.value && { ciudad: ciudadSeleccionada.value }),
            ...(lugarSeleccionado.value && { lugar: lugarSeleccionado.value })
        }
    });
}

onMounted(() => {
    if (route.query.ciudad) {
        ciudadSeleccionada.value = route.query.ciudad;
    }
    if (route.query.lugar) {
        lugarSeleccionado.value = route.query.lugar;
    }
});

watch(() => route.params.nombrePais, () => {
    ciudadSeleccionada.value = route.query.ciudad || null;
    lugarSeleccionado.value = route.query.lugar || null;
});
</script>

<template>
    <div class="pais-view" v-if="pais">
        <h1>Destinos en {{ nombrePais }}</h1>
        <div class="ciudades-nav">
            <button @click="selectCiudad(null)" :class="{ active: !ciudadSeleccionada }" class="btn-ciudad">
                Todos
            </button>
            <button v-for="(_, ciudad) in pais.ciudades" :key="ciudad" @click="selectCiudad(ciudad)"
                :class="{ active: ciudadSeleccionada === ciudad }" class="btn-ciudad">
                {{ ciudad }}
            </button>
        </div>
        <DestinosPorCiudad v-if="ciudadSeleccionada" :nombrePais="nombrePais" :nombreCiudad="ciudadSeleccionada"
            :lugares="lugaresFiltered" />
        <template v-else>
            <div v-for="(lugares, ciudad) in pais.ciudades" :key="ciudad" class="ciudad-section">
                <h2 class="ciudad-titulo">{{ ciudad }}</h2>
                <DestinosPorCiudad :nombrePais="nombrePais" :nombreCiudad="ciudad" :lugares="lugares.lugares" />
            </div>
        </template>
    </div>
</template>


<style scoped>
.pais-view {
    padding: 2rem;
    padding-top: 3.5rem;
    
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