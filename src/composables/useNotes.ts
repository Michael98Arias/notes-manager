import { ref } from 'vue';
import noteService from 'src/services/note.service';
import type { NoteData, NoteDataByID } from 'src/interfaces/note.interface';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
export function useNotes() {
  const notes = ref<NoteData | null>(null);
  const selectedNote = ref<NoteDataByID | null>(null);
  const error = ref<string | null>(null);
  const noteDialogOpen = ref(false);
  const $q = useQuasar();
  const { t } = useI18n();

  const loadNotes = async () => {
    $q.loading.show({ message: t('globalMessages.wait') });
    try {
      const response = await noteService.getNotes();
      notes.value = response;
      error.value = null;
    } catch (err) {
      if (err instanceof Error) {
        $q.notify({
          type: 'negative',
          message: t('layout.mainLayout.loginPage.messages.errorNotes'),
          actions: [
            {
              icon: 'close',
              color: 'white',
              round: true,
            },
          ],
        });
      } else {
        $q.notify({
          type: 'negative',
          message: t('layout.mainLayout.loginPage.messages.errorNotes'),
          actions: [
            {
              icon: 'close',
              color: 'white',
              round: true,
            },
          ],
        });
      }
    } finally {
      $q.loading.hide();
    }
  };
  const useDateFormatter = () => {
    const formatDate = (dateInput: string | Date): string => {
      const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
      const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'America/Bogota',
        timeZoneName: 'short',
      };
      return new Intl.DateTimeFormat('es-ES', options).format(date);
    };

    return { formatDate };
  };
  const loadSelectedNote = async (noteId: string) => {
    $q.loading.show({ message: t('globalMessages.wait') });
    try {
      const response = await noteService.getNoteByID(noteId);
      selectedNote.value = response;
    } catch (err) {
      if (err instanceof Error) {
        $q.notify({
          type: 'negative',
          message: t('layout.mainLayout.loginPage.messages.errorNote'),
          actions: [
            {
              icon: 'close',
              color: 'white',
              round: true,
            },
          ],
        });
      } else {
        $q.notify({
          type: 'negative',
          message: t('layout.mainLayout.loginPage.messages.errorNote'),
          actions: [
            {
              icon: 'close',
              color: 'white',
              round: true,
            },
          ],
        });
      }
    } finally {
      $q.loading.hide();
    }
  };

  const openNoteDialog = async (noteId: string) => {
    await loadSelectedNote(noteId);
    noteDialogOpen.value = true;
  };

  const confirmationdeleteById = (noteId: string) => {
    $q.dialog({
      title: t('layout.mainLayout.notesDashboard.titles.deleteNote'),
      message: t('layout.mainLayout.notesDashboard.messages.confirmationDelete'),
      ok: {
        label: t('layout.mainLayout.notesDashboard.buttons.accept'),
        push: true,
      },
      cancel: {
        push: true,
        label: t('layout.mainLayout.notesDashboard.buttons.cancel'),
        color: 'negative',
      },
      persistent: true,
    }).onOk(() => {
      deleteById(noteId).catch((err) => {
        console.error('Error deleting note:', err);
      });
    });
  };

  const deleteById = async (noteId: string) => {
    $q.loading.show({ message: t('globalMessages.wait') });
    try {
      await noteService.deleteNote(noteId);
      $q.notify({
        type: 'positive',
        message: t('layout.mainLayout.notesDashboard.messages.successDelete'),
        actions: [
          {
            icon: 'close',
            color: 'white',
            round: true,
          },
        ],
      });
    } catch (err) {
      if (err instanceof Error) {
        $q.notify({
          type: 'negative',
          message: t('layout.mainLayout.notesDashboard.messages.errorDelete'),
          actions: [
            {
              icon: 'close',
              color: 'white',
              round: true,
            },
          ],
        });
      } else {
        $q.notify({
          type: 'negative',
          message: t('layout.mainLayout.notesDashboard.messages.errorDelete'),
          actions: [
            {
              icon: 'close',
              color: 'white',
              round: true,
            },
          ],
        });
      }
    } finally {
      void loadNotes();
      $q.loading.hide();
    }
  };
  return {
    notes,
    selectedNote,
    error,
    loadNotes,
    loadSelectedNote,
    noteDialogOpen,
    openNoteDialog,
    useDateFormatter,
    confirmationdeleteById,
  };
}
