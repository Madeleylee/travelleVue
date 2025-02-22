<template>
  <div class="destino-view" v-if="destino">
    <div class="header-container">
      <button @click="volverAtras" class="btn-volver">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="arrow-icon">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Volver
      </button>
      <h1>{{ destino.nombre }}</h1>
    </div>
    <div class="destino-content">
      <div class="galeria-container">
        <div class="galeria">
          <img v-for="(imagen, index) in destino.rutaImagen" :key="index" :src="imagen"
            :alt="`${destino.nombre} - Imagen ${index + 1}`" class="galeria-imagen" @click="abrirImagen(index)" />
        </div>
      </div>
      <div class="destino-info">
        <div class="info-section">
          <h2>Información</h2>
          <p><strong>Ciudad:</strong> {{ nombreCiudad }}</p>
          <p><strong>País:</strong> {{ nombrePais }}</p>
          <p><strong>Tipo:</strong> {{ destino.tipo }}</p>
          <p><strong>Precio:</strong> {{ destino.precio === 0 ? "Gratis" : destino.precio + ' €' }}</p>
          <p><strong>Valoración:</strong> {{ destino.valoracion }} ⭐</p>
        </div>
        <a :href="destino.ubicacion_url" target="_blank" rel="noopener noreferrer" class="btn-ubicacion">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="map-icon">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          Ver ubicación en Google Maps
        </a>
      </div>
    </div>

    <!-- Modal para ver imágenes en grande -->
    <div v-if="imagenSeleccionada !== null" class="modal" @click="cerrarImagen">
      <div class="modal-content">
        <button class="modal-close" @click="cerrarImagen">&times;</button>
        <img :src="destino.rutaImagen[imagenSeleccionada]" :alt="`${destino.nombre} - Imagen ${imagenSeleccionada + 1}`"
          class="modal-imagen" />
        <div class="modal-nav">
          <button @click.stop="imagenAnterior" :disabled="imagenSeleccionada === 0" class="nav-button">
            &#8592;
          </button>
          <span>{{ imagenSeleccionada + 1 }} / {{ destino.rutaImagen.length }}</span>
          <button @click.stop="imagenSiguiente" :disabled="imagenSeleccionada === destino.rutaImagen.length - 1"
            class="nav-button">
            &#8594;
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import data from "@/assets/data/data.json";

const route = useRoute();
const router = useRouter();

const nombrePais = computed(() => route.params.nombrePais);
const nombreCiudad = computed(() => route.params.nombreCiudad);
const nombreDestino = computed(() => route.params.nombreDestino);

const destino = computed(() => {
  const pais = data.paises.find(p => p.name === nombrePais.value);
  if (pais) {
    const ciudad = pais.ciudades[nombreCiudad.value];
    if (ciudad) {
      return ciudad.lugares.find(lugar => lugar.nombre === nombreDestino.value);
    }
  }
  return null;
});

const imagenSeleccionada = ref(null);

function abrirImagen(index) {
  imagenSeleccionada.value = index;
}

function cerrarImagen() {
  imagenSeleccionada.value = null;
}

function imagenAnterior() {
  if (imagenSeleccionada.value > 0) {
    imagenSeleccionada.value--;
  }
}

function imagenSiguiente() {
  if (imagenSeleccionada.value < destino.value.rutaImagen.length - 1) {
    imagenSeleccionada.value++;
  }
}

function volverAtras() {
  router.go(-1);
}

if (!destino.value) {
  router.push({ name: 'Home' });
}
</script>

<style scoped>
.destino-view {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.header-container {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  position: relative;
}

.btn-volver {
  position: absolute;
  left: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--color-primary);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-volver:hover {
  background-color: var(--color-accent);
}

.arrow-icon {
  width: 20px;
  height: 20px;
}

h1 {
  color: var(--color-primary);
  font-size: 2.5rem;
  text-align: center;
  width: 100%;
}

.destino-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.galeria {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.galeria-imagen {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.galeria-imagen:hover {
  transform: scale(1.05);
}

.destino-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-section {
  background-color: var(--color-background);
  padding: 1.5rem;
  border-radius: 8px;
}

.info-section h2 {
  color: var(--color-primary);
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.info-section p {
  margin-bottom: 0.5rem;
}

.btn-ubicacion {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: var(--color-primary);
  color: white;
  padding: 1rem;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.btn-ubicacion:hover {
  background-color: var(--color-accent);
}

.map-icon {
  width: 20px;
  height: 20px;
}

/* Modal styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
}

.modal-close {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
}

.modal-imagen {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
}

.modal-nav {
  position: absolute;
  bottom: -40px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  color: white;
}

.nav-button {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .destino-content {
    grid-template-columns: 1fr;
  }

  .galeria {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  h1 {
    font-size: 2rem;
  }

  .header-container {
    flex-direction: column;
    gap: 1rem;
  }

  .btn-volver {
    position: static;
    margin-bottom: 1rem;
  }
}
</style>