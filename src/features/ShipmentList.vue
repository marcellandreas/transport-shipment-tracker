<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ShipmentCard v-for="s in shipments" :key="s.id" :shipment="s" @view="onView" @quickAssign="onQuickAssign" />
    </div>
</template>


<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ShipmentCard from './ShipmentCard.vue'
import { useShipmentsStore } from '../stores/shipments'

const props = defineProps({
  shipments: { type: Array, required: true }
})

const store = useShipmentsStore()
const router = useRouter()

onMounted(async () => {
  if (!store.list.length) await store.loadAll()
})

function onView(id) {
  router.push({ name: 'Detail', params: { id } })
}

async function onQuickAssign(id) {
  await store.assign(id, { id: 'T-99', name: 'Quick Trans' })
  alert('Assigned Quick Trans to ' + id)
}
</script>
