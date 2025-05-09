<template>
  <q-card>
    <q-card-section>
      <div class="q-mb-md text-h6">
        {{ t('layout.mainLayout.notesDashboard.titles.createNote') }}
      </div>
      <q-separator />
      <div class="q-pa-md">
        <q-input v-model="newNoteTitle" type="textarea" autogrow />
      </div>

      <div class="q-pa-md">
        <q-input
          v-model="checklistInput"
          label="Agregar ítem a la lista"
          @keydown.enter="addChecklistItem"
          dense
        >
          <template v-slot:append>
            <q-btn flat icon="add" @click="addChecklistItem" />
          </template>
        </q-input>
      </div>

      <div class="q-pa-md column q-gutter-sm">
        <div
          v-for="(item, index) in checklist"
          :key="index"
          class="row items-center justify-between q-pa-xs q-pl-sm bg-grey-2 rounded-borders"
        >
          <q-checkbox v-model="item.done" :label="item.title" />
          <q-btn flat icon="close" color="negative" @click="removeChecklistItem(index)" />
        </div>
      </div>

      <div class="q-pa-md">
        <q-linear-progress :value="progressValue" color="primary" class="q-mt-sm" />
        <div class="text-caption text-right q-mt-xs">{{ Math.round(progressValue * 100) }}%</div>
      </div>
      <div class="q-gutter-md row items-start">
        <q-input filled v-model="selectedColor" class="my-input">
          <template v-slot:append>
            <q-icon
              name="format_color_fill"
              class="cursor-pointer"
              :style="{
                color: selectedColor,
              }"
            >
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-color v-model="selectedColor" format="hex" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <q-btn label="Cancelar" color="negative" @click="closeDialog" />
      <q-btn
        label="Guardar Nota"
        color="primary"
        :disable="!newNoteTitle.trim()"
        @click="saveNote"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useNoteFormCreate } from '../../../../../composables/useNoteFormCreate';
const emit = defineEmits(['update:close', 'save-note']);

const { t } = useI18n();
const {
  newNoteTitle,
  checklistInput,
  checklist,
  selectedColor,
  progressValue,
  addChecklistItem,
  removeChecklistItem,
  closeDialog,
  saveNote,
} = useNoteFormCreate(emit);
</script>

<style lang="scss" src="./NoteForm.scss" scoped />
