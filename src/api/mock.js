import shipmentsData from '../data/shipments.json'


let shipments = JSON.parse(JSON.stringify(shipmentsData))


function delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms))
}


export async function fetchShipments() {
    await delay(300)
    return shipments.map(s => ({ ...s }))
}


export async function fetchShipmentById(id) {
    await delay(200)
    const s = shipments.find(x => x.id === id)
    if (!s) throw new Error('Shipment not found')
    return { ...s }
}


export async function assignTransporter(shipmentId, transporter) {
    await delay(250)
    const sIdx = shipments.findIndex(x => x.id === shipmentId)
    if (sIdx === -1) return { success: false, message: 'Shipment not found' }
    if (!transporter || !transporter.id) return { success: false, message: 'Invalid transporter' }
    shipments[sIdx].assigned_transporter = transporter
    shipments[sIdx].status = 'Assigned'
    return { success: true, shipment: { ...shipments[sIdx] } }
}


export function randomStatusUpdate() {
    const idx = Math.floor(Math.random() * shipments.length)
    const s = shipments[idx]
    if (!s) return null
    if (s.status === 'Assigned') s.status = 'In Transit'
    else if (s.status === 'In Transit') s.status = 'Delivered'
    else if (s.status === 'Delivered') s.status = 'Delivered'
    else s.status = 'Assigned'
    return { ...s }
}