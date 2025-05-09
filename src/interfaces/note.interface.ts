export interface NoteData {
  timeMs: number;
  pagination: Pagination;
  data: Datum[];
}

export interface Datum {
  _id: string;
  updatedAt: Date;
  createdBy: Assignee;
  updatedBy: Assignee;
  content: string;
  checklist: Checklist[];
  attachments: string[];
  color: string;
  sticky: boolean;
  assignee: Assignee;
  collaborators: Assignee[];
  index: number;
  createdAt: Date;
  noteCode: string;
  contentText: string;
}

export interface Assignee {
  _id: string;
  firstName: string;
  lastName: string;
  favoriteColor?: string;
}

export interface Checklist {
  title: string;
  done: boolean;
}

export interface Pagination {
  count: number;
  page: number;
  limit: number;
  lastPage: number;
  startIndex: number;
}

export interface NoteDataByID {
  _id: string;
  updatedAt: Date;
  createdBy: AssigneeByID;
  updatedBy: AssigneeByID;
  content: string;
  checklist: ChecklistByID[];
  attachments: string[];
  color: string;
  sticky: boolean;
  assignee: AssigneeByID;
  collaborators: AssigneeByID[];
  index: number;
  createdAt: Date;
  noteCode: string;
  contentText: string;
}

export interface AssigneeByID {
  _id: string;
  firstName: string;
  lastName: string;
  favoriteColor: string;
}

export interface ChecklistByID {
  title: string;
  done: boolean;
}

export interface CreateNote {
  content: string;
  checklist?: Checklist[];
  sticky: boolean;
  index: number;
  _id: null;
  color: string;
  height: number;
}
export interface Checklist {
  title: string;
  done: boolean;
  editing?: boolean;
}

export interface ResponseCreateNote {
  _id: string;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
  content: string;
  checklist: Checklist[];
  attachments: string[];
  color: string;
  sticky: boolean;
  collaborators: string[];
  index: number;
  createdAt: Date;
  noteCode: string;
  contentText: string;
}

export interface Checklist {
  title: string;
  done: boolean;
  editing?: boolean;
}
