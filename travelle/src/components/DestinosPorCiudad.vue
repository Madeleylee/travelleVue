<template>
    <div class="destinos-por-ciudad">
        <div class="lugares-grid">
            <DestinoCard v-for="lugar in lugares" :key="lugar.nombre" :destino="lugar" :nombrePais="nombrePais"
                :nombreCiudad="nombreCiudad" />
        </div>
    </div>
</template>

<script setup>
import DestinoCard from "@/components/DestinoCard.vue";

defineProps({
    nombrePais: {
        type: String,
        required: true
    },
    nombreCiudad: {
        type: String,
        required: true
    },
    lugares: {
        type: Array,
        required: true
    }
});
</script>

<style scoped>
.destinos-por-ciudad {
    margin-bottom: 2rem;
}

.lugares-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
}

@media (max-width: 1024px) {
    .lugares-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .lugares-grid {
        grid-template-columns: 1fr;
    }
}
</style>