import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as api from '../api/mock'


export const useShipmentsStore = defineStore('shipments', () => {
    const list = ref([])
    const loading = ref(false)
    const error = ref(null)


    async function loadAll() {
        loading.value = true
        error.value = null
        try {
            list.value = await api.fetchShipments()
        } catch (err) {
            error.value = err.message || 'Failed to load'
        } finally {
            loading.value = false
        }
    }


    async function getById(id) {
        loading.value = true
        try {
            const s = await api.fetchShipmentById(id)
            const idx = list.value.findIndex(x => x.id === id)
            if (idx !== -1) list.value[idx] = s
            else list.value.push(s)
            return s
        } catch (err) {
            throw err
        } finally {
            loading.value = false
        }
    }


    async function assign(shipmentId, transporter) {
        loading.value = true
        try {
            const res = await api.assignTransporter(shipmentId, transporter)
            if (res.success) {
                const idx = list.value.findIndex(x => x.id === shipmentId)
                if (idx !== -1) list.value[idx] = res.shipment
                return { success: true }
            } else {
                return { success: false, message: res.message }
            }
        } catch (err) {
            return { success: false, message: err.message }
        } finally {
            loading.value = false
        }
    }


    function updateStatus(updatedShipment) {
        const idx = list.value.findIndex(x => x.id === updatedShipment.id)
        if (idx !== -1) list.value[idx].status = updatedShipment.status
        else list.value.push(updatedShipment)
    }


    return { list, loading, error, loadAll, getById, assign, updateStatus }
})