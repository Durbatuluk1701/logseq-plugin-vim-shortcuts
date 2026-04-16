<script setup lang="ts">
import { useColorStore } from "@/stores/color";
const colorStore = useColorStore();

const handleColorChange = (e: Event) => {
  const input = e.target as HTMLInputElement;
  colorStore.changeColor(input.value);
};

const handleClose = () => {
  colorStore.hide();
};
</script>

<template>
  <div
    v-if="colorStore.visible"
    class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 z-50"
  >
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold">Select Color</h3>
      <input
        type="color"
        :value="colorStore.color"
        @change="handleColorChange"
        class="w-20 h-20 cursor-pointer"
      />
      <div class="flex gap-2">
        <button
          @click="handleClose"
          class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm font-medium"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Overlay background */
:global(body) {
  position: relative;
}
</style>
