<template>
    <div class="min-h-screen bg-slate-50 text-slate-900">
        <header class="bg-white border-b">
            <div class="max-w-6xl mx-auto p-4 flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <div class="text-lg font-bold">Transport Tracker</div>
                    <nav class="hidden md:flex gap-4 text-sm text-muted">
                        <router-link to="/">Shipments</router-link>
                    </nav>
                </div>
            </div>
        </header>


        <main class="max-w-6xl mx-auto p-4">
            <slot />
        </main>


        <footer class="max-w-6xl mx-auto p-4 text-sm text-muted text-center">
            © 2025 Transport Tracker
        </footer>
    </div>
</template>


<script setup>
</script>