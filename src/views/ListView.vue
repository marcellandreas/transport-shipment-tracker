<template>
    <MainLayout>
        <div class="flex items-center justify-between mb-4">
            <h1 class="text-2xl font-semibold">Shipments</h1>
            <div>
                <ui-button @click="refresh">Refresh</ui-button>
            </div>
        </div>


        <div v-if="store.loading" class="text-sm text-muted">Loading...</div>
        <div v-if="store.error" class="text-sm text-red-600">Error: {{ store.error }}</div>


        <ShipmentList :shipments="store.list" />
    </MainLayout>
</template>

<script setup>
import MainLayout from '../components/layout/MainLayout.vue'
import ShipmentList from '../features/ShipmentList.vue'
import UiButton from '../components/ui/button/Button.vue'
import { useShipmentsStore } from '../stores/shipments'
import { onMounted, onUnmounted } from 'vue'
import { randomStatusUpdate } from '../api/mock'


const store = useShipmentsStore()


onMounted(async () => {
    if (!store.list.length) await store.loadAll()
    // realtime simulation
    intervalId = setInterval(() => {
        const updated = randomStatusUpdate()
        if (updated) store.updateStatus(updated)
    }, 5000)
})

let intervalId = null
onUnmounted(() => {
    if (intervalId) clearInterval(intervalId)
})


function refresh() {
    store.loadAll()
}
</script>