<script setup>
import { computed } from 'vue';
import data from '../assets/data/data.json';

const currentYear = computed(() => new Date().getFullYear());
const paises = computed(() => data.paises);

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
</script>

<template>
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-section brand">
                <h3>Travelle</h3>
                <p>Descubre Europa con nosotros</p>
                <a href="#" @click.prevent="scrollToTop" class="scroll-top">Volver arriba</a>
            </div>
            <div class="footer-section countries">
                <h4>Explora nuevos destinos</h4>
                <ul class="paises-list">
                    <li v-for="pais in paises" :key="pais.id">
                        <router-link :to="{ name: 'Pais', params: { nombrePais: pais.name } }">
                            {{ pais.name }}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; {{ currentYear }} Travelle. Todos los derechos reservados.</p>
        </div>
    </footer>
</template>


<style scoped>
.footer {
    background-color: var(--color-primary);
    color: white;
    padding: 3rem 0 1rem;
    font-family: 'Playfair Display', serif;
}

.footer-content {
    display: flex;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

.footer-section {
    margin-bottom: 1.5rem;
}

.footer-section.brand {
    flex: 1;
}

.footer-section.countries {
    flex: 2;
}

.footer-section h3 {
    font-size: 2rem;
    margin-bottom: 1rem;
    font-weight: 700;
}

.footer-section h4 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-weight: 600;
}

.footer-section p {
    font-size: 1.1rem;
    margin-bottom: 1rem;
}

.scroll-top {
    display: inline-block;
    color: var(--color-accent);
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s;
}

.scroll-top:hover {
    color: white;
}

.paises-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    list-style-type: none;
    padding: 0;
}

.paises-list a {
    color: white;
    text-decoration: none;
    transition: color 0.3s;
    font-size: 1.1rem;
}

.paises-list a:hover {
    color: var(--color-accent);
}

.footer-bottom {
    text-align: center;
    padding-top: 2rem;
    margin-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.9rem;
}

@media (max-width: 768px) {
    .footer-content {
        flex-direction: column;
    }

    .footer-section {
        margin-bottom: 2rem;
    }

    .paises-list {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 480px) {
    .paises-list {
        grid-template-columns: 1fr;
    }
}
</style>