<script setup>
import { computed } from 'vue';
import DestinoCard from '../components/DestinoCard.vue';
import data from '../assets/data/data.json';

const todosLosDestinos = computed(() =>
    data.paises.flatMap(pais =>
        Object.entries(pais.ciudades).flatMap(([nombreCiudad, ciudad]) =>
            ciudad.lugares.map(lugar => ({
                ...lugar,
                pais: pais.name,
                ciudad: nombreCiudad
            }))
        )
    )
);

const destinosAleatorios = computed(() => {
    const shuffled = [...todosLosDestinos.value].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
});
</script>

<template>
    <div class="home">
        <section class="hero">
            <h1>Descubre Europa con Travelle</h1>
            <p>Comparte tus aventuras y encuentra nuevos destinos</p>
        </section>
        <section class="destinos-destacados">
            <h2>Destinos Destacados</h2>
            <div class="destinos-grid">
                <DestinoCard v-for="destino in destinosAleatorios"
                    :key="`${destino.nombre}-${destino.ciudad}-${destino.pais}`" :destino="destino"
                    :nombrePais="destino.pais" :nombreCiudad="destino.ciudad" />
            </div>
        </section>
    </div>
</template>


<style scoped>
.home {
    padding: 2rem;
}

.hero {
    padding: 2rem;
    text-align: center;
    margin-bottom: 2rem;
}

h1 {
    color: var(--color-primary);
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

h2 {
    color: var(--color-text);
    font-size: 2rem;
    margin-bottom: 1rem;
    text-align: center;
}

.destinos-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    justify-content: center;
}

@media (max-width: 1024px) {
    .destinos-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .destinos-grid {
        grid-template-columns: 1fr;
    }
}
</style>