<template>
  <q-page class="q-pa-md">
    <div class="q-mb-md text-h6">{{ t('layout.mainLayout.notesDashboard.titles.notes') }}</div>

    <div :class="$q.screen.gt.sm ? 'grid-md' : 'grid-xs'">
      <q-card
        v-for="note in notes?.data"
        :key="note._id"
        class="my-card"
        :style="{
          background: `radial-gradient(circle at top right, ${note.color} 0%, transparent 20%)`,
        }"
        @dblclick="handleDoubleClick(note._id)"
      >
        <q-card-section>
          <div class="text-h6">{{ note.contentText }}</div>
          <div class="text-caption">{{ formatDate(note.createdAt) }}</div>
        </q-card-section>

        <q-card-section>
          <div class="text-body1">{{ note.contentText }}</div>
        </q-card-section>

        <q-card-actions>
          <q-btn
            flat
            :label="t('layout.mainLayout.notesDashboard.buttons.seeMore')"
            @click="handleDoubleClick(note._id)"
          />
          <q-btn
            flat
            :label="t('layout.mainLayout.notesDashboard.buttons.delete')"
            color="negative"
            @click="deleteNote(note._id)"
          />
        </q-card-actions>
      </q-card>
    </div>

    <q-banner v-if="notes?.data?.length === 0" class="bg-grey-2 q-mt-md">
      {{ t('layout.mainLayout.notesDashboard.messages.noNotes') }}
    </q-banner>

    <NoteDialog v-model="noteDialogOpen" :note="selectedNote" />
    <q-dialog v-model="addNoteDialogOpen" persistent>
      <FormNoteDialog @update:close="addNoteDialogOpen = $event" />
    </q-dialog>
    <q-btn
      v-if="!noteDialogOpen && !addNoteDialogOpen"
      icon="playlist_add"
      round
      color="primary"
      class="floating-icon"
      @click="handleAddNote"
    />
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';
import { useNotes } from 'src/composables/useNotes';
import NoteDialog from '../NotesDashboard/components/NoteDialog.vue';
import FormNoteDialog from 'src/components/MainLayout/NotesDashboard/components/NoteForm/NoteForm.vue';

const { t } = useI18n();
const $q = useQuasar();

const {
  notes,
  selectedNote,
  noteDialogOpen,
  openNoteDialog,
  loadNotes,
  error,
  useDateFormatter,
  confirmationdeleteById,
} = useNotes();

const { formatDate } = useDateFormatter();
const addNoteDialogOpen = ref(false);

onMounted(() => {
  void loadNotes();
});

watch(error, (val) => {
  if (val) {
    $q.notify({
      type: 'negative',
      message: t('layout.mainLayout.notesDashboard.errorLoading'),
    });
  }
});
watch(addNoteDialogOpen, (newVal, oldVal) => {
  if (!newVal && oldVal) {
    void loadNotes();
  }
});
const handleDoubleClick = (noteId: string) => {
  void openNoteDialog(noteId);
};

const deleteNote = (noteId: string) => {
  void confirmationdeleteById(noteId);
};
const handleAddNote = () => {
  addNoteDialogOpen.value = true;
};
</script>
<style lang="scss" src="./NotesDashboardPage.scss" scoped />
