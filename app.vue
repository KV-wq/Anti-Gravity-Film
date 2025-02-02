<script setup>
const { $pageTransition } = useNuxtApp();
</script>

<template>
  <div class="relative overflow-hidden">
    <NuxtPage :transition="$pageTransition" />
    <NuxtRouteAnnouncer />
    <ModalWrapper />
  </div>
</template>
