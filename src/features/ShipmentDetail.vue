<template>
    <div  class="space-y-4">
        <Card>
            <div class="flex justify-between items-start gap-4">
                <div>
                    <div class="text-sm text-muted">ID: {{ shipment.id }}</div>
                    <h2 class="text-2xl font-semibold">{{ shipment.origin }} → {{ shipment.destination }}</h2>
                    <div class="mt-2">Vehicle: <span class="font-medium">{{ shipment.vehicle_type }}</span></div>
                    <div class="mt-1">Status: <span class="font-medium">{{ shipment.status }}</span></div>
                    <div class="mt-2">Route:</div>
                    <ol class="list-decimal pl-5 text-sm text-muted">
                        <li v-for="(r, i) in shipment.route" :key="i">{{ r }}</li>
                    </ol>
                </div>


                <div class="w-64">
                    <div class="mb-2">Assigned Transporter</div>
                    <div v-if="shipment.assigned_transporter">
                        <div class="p-2 border rounded-md">
                            <div class="font-medium">{{ shipment.assigned_transporter.name }}</div>
                            <div class="text-sm text-muted">ID: {{ shipment.assigned_transporter.id }}</div>
                        </div>
                    </div>
                    <div v-else class="p-2 border rounded-md text-muted">None</div>
                </div>
            </div>
        </Card>

        <Card>
            <h3 class="text-lg font-semibold mb-2">Assign Transporter</h3>
            <div class="space-y-2">
                <label class="block text-sm">Select transporter</label>
                <select v-model="selected" class="w-full px-3 py-2 border rounded-md">
                    <option value="">-- Select --</option>
                    <option v-for="t in transporters" :key="t.id" :value="t.id">{{ t.name }}</option>
                </select>


                <div class="flex gap-2 mt-2">
                    <ui-button variant="primary" @click="onAssign">Assign</ui-button>
                    <ui-button variant="ghost" @click="clear">Clear</ui-button>
                </div>


                <div v-if="message" :class="messageClass">{{ message }}</div>
            </div>
        </Card>

    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Card from '../components/ui/card/Card.vue'
import UiButton from '../components/ui/button/Button.vue'
import { useShipmentsStore } from '../stores/shipments'
import { useRouter } from 'vue-router'

const props = defineProps({ id: { type: String, required: true } })


const store = useShipmentsStore()
const shipment = ref(null)
const selected = ref('')
const message = ref('')
const messageClass = ref('text-sm text-green-600')
const router = useRouter()


const transporters = [
    { id: 'T-01', name: 'PT Transindo' },
    { id: 'T-02', name: 'CV Cargo Jaya' },
    { id: 'T-03', name: 'Logistics Co' }
]

async function load() {
    try {
        shipment.value = await store.getById(props.id)
    } catch (err) {
        alert('Shipment not found')
        router.push({ name: 'List' })
    }
}


watch(() => props.id, load, { immediate: true })


function clear() {
    selected.value = ''
    message.value = ''
}

async function onAssign() {
    message.value = ''
    if (!selected.value) {
        message.value = 'Please select a transporter.'
        messageClass.value = 'text-sm text-red-600'
        return
    }
    const transporter = transporters.find(t => t.id === selected.value)
    const res = await store.assign(props.id, transporter)
    if (res.success) {
        message.value = 'Transporter assigned successfully.'
        messageClass.value = 'text-sm text-green-600'
        shipment.value = await store.getById(props.id)
    } else {
        message.value = 'Failed to assign: ' + (res.message || 'unknown')
        messageClass.value = 'text-sm text-red-600'
    }
}
</script>