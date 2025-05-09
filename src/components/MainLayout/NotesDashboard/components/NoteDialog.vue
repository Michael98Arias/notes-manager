<template>
  <q-dialog v-model="modelDialogValue" persistent>
    <q-card style="min-width: 300px; max-width: 600px">
      <q-card-section>
        <div class="q-mb-md text-h6">
          {{ t('layout.mainLayout.notesDashboard.titles.editNote') }}
        </div>
        <q-separator />
        <div class="text-caption">{{ note?.createdAt }}</div>
        <div class="q-pa-md">
          <q-input v-model="newNoteTitle" label="Título de la nota" type="textarea" autogrow />
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

      <q-card-actions>
        <q-btn label="Cancelar" color="negative" @click="closeDialog" />
        <q-btn
          label="Guardar Nota"
          color="primary"
          :disable="!newNoteTitle.trim()"
          @click="saveNote"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';
import { useNoteDialog } from 'src/composables/useNoteDialog';
import type { NoteDataByID } from 'src/interfaces/note.interface';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  modelValue: boolean;
  note: NoteDataByID | null;
}>();

const emit = defineEmits(['update:modelValue']);
const { t } = useI18n();
const {
  newNoteTitle,
  checklistInput,
  checklist,
  selectedColor,
  progressValue,
  addChecklistItem,
  removeChecklistItem,
  saveNote,
} = useNoteDialog(props);

const modelDialogValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newVal) => {
    modelDialogValue.value = newVal;
  },
);

const closeDialog = () => {
  emit('update:modelValue', false);
};
</script>

<style lang="scss" src="./NoteDialog.scss" scoped />
