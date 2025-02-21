<template>
    <div class="destino-card">
        <img :src="destino.rutaImagen[0]" :alt="destino.nombre" class="destino-imagen">
        <div class="destino-info">
            <h3 class="destino-nombre">{{ destino.nombre }}</h3>
            <p class="destino-ubicacion">{{ nombreCiudad }}, {{ nombrePais }}</p>
            <p class="destino-tipo">{{ destino.tipo }}</p>
            <div class="destino-detalles">
                <p class="destino-precio">
                    {{ destino.precio === 0 ? 'Gratis' : `${destino.precio.toFixed(2)}€` }}
                </p>
                <p class="destino-valoracion">
                    <span class="estrella">⭐</span>
                    {{ destino.valoracion.toFixed(1) }}
                </p>
            </div>
            <router-link :to="{ name: 'Destino', params: { nombrePais, nombreCiudad, nombreDestino: destino.nombre } }"
                class="btn-ver-mas">
                Ver más
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
    destino: {
        type: Object,
        required: true
    },
    nombrePais: {
        type: String,
        required: true
    },
    nombreCiudad: {
        type: String,
        required: true
    }
});
</script>

<style scoped>
.destino-card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.destino-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.destino-imagen {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.destino-info {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.destino-nombre {
    color: var(--color-primary);
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
}

.destino-ubicacion {
    color: var(--color-text);
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
}

.destino-tipo {
    color: var(--color-text);
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    font-style: italic;
}

.destino-detalles {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.destino-precio {
    color: var(--color-accent);
    font-weight: bold;
}

.destino-valoracion {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.estrella {
    color: gold;
}

.btn-ver-mas {
    display: inline-block;
    background-color: var(--color-primary);
    color: white;
    padding: 0.5rem 1rem;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s;
    text-align: center;
    margin-top: auto;
}

.btn-ver-mas:hover {
    background-color: var(--color-accent);
}


@media (max-width: 768px) {
    .destino-card {
        max-width: 400px;
        margin: 0 auto;
    }
}
</style>