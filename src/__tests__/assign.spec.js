import { describe, it, expect } from 'vitest'
import { assignTransporter } from '../src/api/mock.js'


describe('assignTransporter', () => {
    it('assigns transporter correctly', async () => {
        const res = await assignTransporter('SHP-1001', { id: 'T-99', name: 'Unit Test Trans' })
        expect(res.success).toBe(true)
        expect(res.shipment.assigned_transporter).toBeTruthy()
        expect(res.shipment.assigned_transporter.name).toBe('Unit Test Trans')
        expect(res.shipment.status).toBe('Assigned')
    })


    it('fails for invalid transporter', async () => {
        const res = await assignTransporter('SHP-1001', null)
        expect(res.success).toBe(false)
    })
})