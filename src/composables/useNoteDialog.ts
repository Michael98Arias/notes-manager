import { ref, computed, watch } from 'vue';
import type { NoteDataByID } from 'src/interfaces/note.interface';

export function useNoteDialog(props: { note: NoteDataByID | null }) {
  const newNoteTitle = ref(props.note?.contentText || '');
  const checklistInput = ref('');
  const checklist = ref(props.note?.checklist || []);
  const selectedColor = ref(props.note?.color || '#FFFFFF');

  const progressValue = computed(() => {
    if (checklist.value.length === 0) return 0;
    const doneCount = checklist.value.filter((item) => item.done).length;
    return doneCount / checklist.value.length;
  });

  watch(
    () => props.note,
    (newNote) => {
      newNoteTitle.value = newNote?.contentText || '';
      checklist.value = newNote?.checklist || [];
      selectedColor.value = newNote?.color || '#FFFFFF';
    },
  );

  const addChecklistItem = () => {
    if (checklistInput.value.trim() !== '') {
      checklist.value.push({ title: checklistInput.value.trim(), done: false });
      checklistInput.value = '';
    }
  };

  const removeChecklistItem = (index: number) => {
    checklist.value.splice(index, 1);
  };

  const saveNote = () => {
    const updatedNote = {
      contentText: newNoteTitle.value,
      checklist: checklist.value,
      color: selectedColor.value,
    };

    return updatedNote;
  };

  return {
    newNoteTitle,
    checklistInput,
    checklist,
    selectedColor,
    progressValue,
    addChecklistItem,
    removeChecklistItem,
    saveNote,
  };
}
