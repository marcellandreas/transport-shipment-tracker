<template>
    <Card>
        <div class="flex items-start justify-between">
            <div>
                <div class="text-sm text-muted">ID: {{ shipment.id }}</div>
                <h3 class="text-lg font-semibold">{{ shipment.origin }} → {{ shipment.destination }}</h3>
                <div class="text-sm mt-1">Vehicle: {{ shipment.vehicle_type }}</div>
                <div class="text-sm mt-1">Status: <span class="font-medium">{{ shipment.status }}</span></div>
                <div class="text-sm mt-2">
                    Assigned: <span v-if="shipment.assigned_transporter">{{ shipment.assigned_transporter.name }}</span>
                    <span v-else class="text-muted">None</span>
                </div>
            </div>


            <div class="flex flex-col gap-2">
                <ui-button variant="outline" @click="$emit('view', shipment.id)">View</ui-button>
                <ui-button v-if="!shipment.assigned_transporter" variant="primary"
                    @click="$emit('quickAssign', shipment.id)">Assign</ui-button>
            </div>
        </div>
    </Card>
</template>


<script setup>
import Card from '../components/ui/card/Card.vue'
import UiButton from '../components/ui/button/Button.vue'
const props = defineProps({
    shipment: { type: Object, required: true }
})
</script>