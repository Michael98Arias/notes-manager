import { ref, computed } from 'vue';
import type { Checklist } from 'src/interfaces/note.interface';
import noteService from 'src/services/note.service';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
type EmitFn = {
  (event: 'save-note'): void;
  (event: 'update:close', value: boolean): void;
};

export function useNoteFormCreate(emit: EmitFn) {
  const newNoteTitle = ref('');
  const checklistInput = ref('');
  const checklist = ref<Checklist[]>([]);
  const selectedColor = ref('#FFD180');

  const $q = useQuasar();
  const { t } = useI18n();

  const progressValue = computed(() => {
    if (checklist.value.length === 0) return 0;
    const doneCount = checklist.value.filter((item) => item.done).length;
    return doneCount / checklist.value.length;
  });

  const addChecklistItem = () => {
    const title = checklistInput.value.trim();
    if (title !== '') {
      checklist.value.push({ title, done: false, editing: false });
      checklistInput.value = '';
    }
  };

  const removeChecklistItem = (index: number) => {
    checklist.value.splice(index, 1);
  };

  const closeDialog = () => {
    emit('update:close', false);
  };

  const saveNote = async () => {
    const formattedTitle = formatTitleWithParagraphs(newNoteTitle.value);
    const note = {
      content: formattedTitle,
      ...(checklist.value.length > 0 && { checklist: checklist.value }),
      color: selectedColor.value,
      height: 1,
      sticky: true,
      index: Date.now(),
      _id: null,
    };
    try {
      await noteService.createNote(note);
      closeDialog();
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
    closeDialog();
  };

  const formatTitleWithParagraphs = (text: string): string => {
    const lines = text
      .split(/\n/)
      .map((line) => line.trim())
      .filter((line) => line !== '');
    return lines.map((line) => `<p>${line}</p>`).join('');
  };

  return {
    newNoteTitle,
    checklistInput,
    checklist,
    selectedColor,
    progressValue,
    addChecklistItem,
    removeChecklistItem,
    closeDialog,
    saveNote,
  };
}
