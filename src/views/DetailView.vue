<template>
    <MainLayout>
        <ShipmentDetail :id="id" />
    </MainLayout>
</template>

<script setup>
import { useRoute } from 'vue-router'
import ShipmentDetail from '../features/ShipmentDetail.vue'


const route = useRoute()
const id = route.params.id
</script>