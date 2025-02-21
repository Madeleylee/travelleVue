<template>
  <div class="ciudad-view" v-if="ciudad">
    <h1>Destinos en {{ nombreCiudad }}</h1>
    <div class="lugares-grid">
      <DestinoCard 
        v-for="lugar in ciudad.lugares" 
        :key="lugar.nombre" 
        :destino="lugar"
        :nombrePais="nombrePais"
        :nombreCiudad="nombreCiudad"
      />
    </div>
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
}

h1 {
  color: var(--color-primary);
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

.lugares-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  justify-content: center;
}

.lugares-grid:only-child {
  max-width: 400px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .lugares-grid {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin: 0 auto;
  }
}
</style>