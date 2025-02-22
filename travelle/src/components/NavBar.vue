<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import data from '../assets/data/data.json';

const route = useRoute();
const router = useRouter();
const paises = ref(data.paises);
const searchQuery = ref('');
const searchResults = ref([]);
const isHidden = ref(false);
const lastScrollPosition = ref(0);
const navbar = ref(null);

function searchDestinos() {
    if (searchQuery.value.length < 2) {
        searchResults.value = [];
        return;
    }

    const results = [];
    paises.value.forEach(pais => {
        Object.keys(pais.ciudades).forEach(nombreCiudad => {
            if (nombreCiudad.toLowerCase().includes(searchQuery.value.toLowerCase())) {
                results.push({
                    id: `ciudad-${pais.name}-${nombreCiudad}`,
                    nombre: nombreCiudad,
                    tipo: 'ciudad',
                    pais: pais.name
                });
            }

            pais.ciudades[nombreCiudad].lugares.forEach(lugar => {
                if (lugar.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())) {
                    results.push({
                        id: `lugar-${pais.name}-${nombreCiudad}-${lugar.nombre}`,
                        nombre: lugar.nombre,
                        tipo: 'lugar',
                        pais: pais.name,
                        ciudad: nombreCiudad
                    });
                }
            });
        });
    });

    searchResults.value = results.slice(0, 5);
}

function navigateToResult(result) {
    if (result.tipo === 'ciudad') {
        router.push({
            name: 'Pais',
            params: { nombrePais: result.pais },
            query: { ciudad: result.nombre }
        });
    } else {
        router.push({
            name: 'Pais',
            params: { nombrePais: result.pais },
            query: { ciudad: result.ciudad, lugar: result.nombre }
        });
    }
    searchQuery.value = '';
    searchResults.value = [];
}

function handleSearch() {
    if (searchResults.value.length > 0) {
        navigateToResult(searchResults.value[0]);
    }
}

function isActiveCountry(countryName) {
    return route.params.nombrePais === countryName;
}

function onScroll() {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScrollPosition < 0) {
        return;
    }

    if (Math.abs(currentScrollPosition - lastScrollPosition.value) < 60) {
        return;
    }

    isHidden.value = currentScrollPosition > lastScrollPosition.value;
    lastScrollPosition.value = currentScrollPosition;
}

onMounted(() => {
    window.addEventListener('scroll', onScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', onScroll);
});
</script>

<template>
    <header class="navbar" :class="{ 'navbar-hidden': isHidden, 'navbar-visible': !isHidden }" ref="navbar">
        <div class="nav-content">
            <div class="nav-section left">
                <router-link to="/" class="logo-link">
                    <img src="../assets/img/logo.png" alt="Travelle Logo" class="logo">
                </router-link>
            </div>
            <div class="nav-section center">
                <nav class="nav-container">
                    <ul class="nav-list">
                        <li v-for="pais in paises" :key="pais.id" class="nav-item">
                            <router-link :to="{ name: 'Pais', params: { nombrePais: pais.name } }" class="nav-link"
                                :class="{ active: isActiveCountry(pais.name) }">
                                {{ pais.name.toUpperCase() }}
                            </router-link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="nav-section right">
                <div class="search-container">
                    <h2 class="search-icon">🔍</h2>
                    <input v-model="searchQuery" @input="searchDestinos" @keyup.enter="handleSearch" type="text"
                        placeholder="Buscar destino o ciudad..." class="search-input">
                    <ul v-if="searchResults.length > 0" class="search-results">
                        <li v-for="result in searchResults" :key="result.id">
                            <a @click="navigateToResult(result)" class="search-result-link">
                                {{ result.nombre }} ({{ result.tipo === 'ciudad' ? 'Ciudad' : 'Lugar' }}, {{ result.pais
                                }})
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
</template>


<style scoped>
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: var(--color-primary);
    color: white;
    font-family: 'Playfair Display', serif;
    transition: transform 0.3s ease-in-out;
}

.navbar-hidden {
    transform: translateY(-100%);
}

.navbar-visible {
    transform: translateY(0);
}

.nav-content {
    display: flex;
    align-items: center;
    padding: 1rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.nav-section {
    display: flex;
    align-items: center;
}

.nav-section.left {
    flex: 0 0 auto;
}

.nav-section.center {
    flex: 1;
    justify-content: center;
}

.nav-section.right {
    flex: 0 0 auto;
}

.logo-link {
    display: flex;
    align-items: center;
}

.logo {
    height: 80px;
    width: auto;
}

.nav-container {
    flex: 1;
}

.nav-list {
    display: flex;
    justify-content: center;
    gap: 2rem;
    list-style-type: none;
}

.nav-link {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    transition: background-color 0.3s, color 0.3s;
    font-weight: 600;
    font-size: 1.2rem;
    border-radius: 4px;
}

.nav-link:hover,
.nav-link.active {
    background-color: var(--color-accent);
    color: var(--color-primary);
}

.search-container {
    position: relative;
    display: flex;
    align-items: center;

}

.search-icon {
    font-size: 1.5rem;
    margin-bottom: 2px;
    height: auto;
}


.search-input {
    padding: 0.5rem;
    border: none;
    border-radius: 4px;
    width: 200px;
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
}

.search-results {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: white;
    border: 1px solid var(--color-primary);
    border-top: none;
    z-index: 10;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
}

.search-results a {
    display: block;
    padding: 0.5rem;
    color: var(--color-text);
    text-decoration: none;
}

.search-results a:hover {
    background-color: var(--color-background);
}

@media (max-width: 1024px) {
    .nav-content {
        flex-direction: column;
        padding: 1rem;
    }

    .nav-section {
        width: 100%;
        justify-content: center;
        margin-bottom: 1rem;
    }

    .nav-section.left {
        justify-content: center;
    }

    .nav-section.right {
        justify-content: center;
    }

    .nav-list {
        flex-wrap: wrap;
        gap: 1rem;
    }

    .logo {
        height: 60px;
    }
}

@media (max-width: 768px) {
    .nav-list {
        flex-direction: column;
        align-items: center;
    }

    .search-input {
        width: 100%;
    }
}
</style>