<template>
    <header class="navbar">
        <div class="nav-section left">
            <router-link to="/" class="home-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="feather feather-home">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
            </router-link>
        </div>
        <div class="nav-section center">
            <div class="logo-container">
                <router-link to="/" class="logo-link">
                    <img src="../assets/img/logo.png" alt="Travelle Logo" class="logo">
                </router-link>
            </div>
            <nav class="nav-container">
                <ul class="nav-list">
                    <li v-for="pais in paises" :key="pais.id" class="nav-item">
                        <router-link :to="{ name: 'Pais', params: { nombrePais: pais.name } }" class="nav-link">
                            {{ pais.name.toUpperCase() }}
                        </router-link>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="nav-section right">
            <div class="search-container">
                <input v-model="searchQuery" @input="searchDestinos" type="text" placeholder="Buscar destino..."
                    class="search-input">
                <ul v-if="searchResults.length > 0" class="search-results">
                    <li v-for="result in searchResults" :key="result.nombre">
                        <router-link
                            :to="{ name: 'Destino', params: { nombrePais: result.pais, nombreCiudad: result.ciudad, nombreDestino: result.nombre } }">
                            {{ result.nombre }} ({{ result.ciudad }}, {{ result.pais }})
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import data from '@/assets/data/data.json'

const route = useRoute()
const paises = ref(data.paises)
const searchQuery = ref('')
const searchResults = ref([])

const activePais = computed(() => {
    const nombrePais = route.params.nombrePais
    return paises.value.find(pais => pais.name === nombrePais)?.id
})

function searchDestinos() {
    if (searchQuery.value.length < 2) {
        searchResults.value = []
        return
    }

    searchResults.value = paises.value.flatMap(pais =>
        Object.entries(pais.ciudades).flatMap(([nombreCiudad, ciudad]) =>
            ciudad.lugares.filter(lugar =>
                lugar.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
            ).map(lugar => ({
                ...lugar,
                pais: pais.name,
                ciudad: nombreCiudad
            }))
        )
    ).slice(0, 5)
}
</script>

<style scoped>
.navbar {
    display: flex;
    align-items: center;
    padding: 1rem 2rem;
    background-color: var(--color-primary);
    color: white;
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
    flex-direction: column;
    align-items: center;
}

.nav-section.right {
    flex: 0 0 auto;
}

.home-button {
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--color-accent);
    transition: background-color 0.3s;
}

.home-button:hover {
    background-color: var(--color-primary-dark);
}

.logo-container {
    margin-bottom: 1rem;
}

.logo {
    height: 100px;
    width: auto;
}

.nav-container {
    width: 100%;
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
    transition: background-color 0.3s;
    font-weight: 500;
}

.nav-link:hover {
    background-color: var(--color-accent);
}

.search-container {
    position: relative;
}

.search-input {
    padding: 0.5rem;
    border: none;
    border-radius: 4px;
    width: 200px;
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
    .navbar {
        flex-direction: column;
        padding: 1rem;
    }

    .nav-section {
        width: 100%;
        justify-content: center;
        margin-bottom: 1rem;
    }

    .nav-section.left {
        justify-content: flex-start;
    }

    .nav-section.right {
        justify-content: flex-end;
    }

    .nav-list {
        flex-wrap: wrap;
        gap: 1rem;
    }

    .logo {
        height: 80px;
    }
}

@media (max-width: 768px) {
    .nav-list {
        flex-direction: column;
        align-items: center;
    }

    .search-input {
        width: 150px;
    }
}
</style>