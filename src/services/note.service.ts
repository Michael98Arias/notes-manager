import { AxiosHeaders } from 'axios';
import HttpService from './http.service';
import type {
  CreateNote,
  NoteData,
  NoteDataByID,
  ResponseCreateNote,
} from 'src/interfaces/note.interface';
import ProfileService from 'src/services/profile.service';

class NoteService {
  async getNotes(): Promise<NoteData> {
    const profile = await ProfileService.getProfile();
    const USER_ID = profile._id;

    const params = {
      page: 1,
      limit: 60,
      select:
        'content _id createdAt updatedAt createdBy updatedBy workspace noteCode contentText checklist attachments color sticky assignee collaborators index origin assignee collaborators content workspace',
      sort: '-index',
      xquery: JSON.stringify({
        $and: [
          { sticky: true },
          {
            $or: [
              { createdBy: USER_ID },
              { assignee: USER_ID },
              { collaborators: { $in: [USER_ID] } },
            ],
          },
        ],
      }),
      populatePath: JSON.stringify([
        {
          path: 'createdBy',
          select: 'firstName lastName profilePicture',
          populate: { path: 'profilePicture', select: 'url' },
        },
        {
          path: 'createdBy',
          select: 'profilePicture firstName lastName favoriteColor',
          populate: [{ path: 'profilePicture', select: 'url' }],
        },
        {
          path: 'updatedBy',
          select: 'profilePicture firstName lastName favoriteColor',
          populate: [{ path: 'profilePicture', select: 'url' }],
        },
        { path: 'workspace', select: '' },
        { path: 'attachments', select: 'filePath fileName' },
        {
          path: 'assignee',
          select: 'primaryWorkspace profilePicture firstName lastName favoriteColor',
          populate: [
            { path: 'profilePicture', select: 'url' },
            {
              path: 'primaryWorkspace',
              select: ['color', 'workspaceName', 'workspaceCode'],
            },
          ],
        },
        {
          path: 'collaborators',
          select: 'profilePicture firstName lastName',
          populate: [{ path: 'profilePicture', select: 'url' }],
        },
      ]),
    };

    return await HttpService.get<NoteData>('/v2/note', {
      headers: new AxiosHeaders(),
      params,
    });
  }
  async getNoteByID(noteId: string): Promise<NoteDataByID> {
    const params = {
      page: 1,
      limit: 20,
      select:
        '_id workspace noteCode content contentText checklist attachments color sticky assignee collaborators index origin',
      populatePath: JSON.stringify([
        {
          path: 'createdBy',
          select: 'profilePicture firstName lastName favoriteColor',
          populate: { path: 'profilePicture', select: 'url' },
        },
        {
          path: 'updatedBy',
          select: 'profilePicture firstName lastName favoriteColor',
          populate: { path: 'profilePicture', select: 'url' },
        },
        { path: 'createdAt' },
        { path: 'updatedAt' },
        { path: 'workspace', select: 'workspaceName workspaceCode color workspaceCode' },
        { path: 'workspace', select: '' },
        { path: 'attachments', select: 'filePath fileName' },
        {
          path: 'assignee',
          select: 'profilePicture firstName lastName favoriteColor',
          populate: { path: 'profilePicture', select: 'url' },
        },
        {
          path: 'collaborators',
          select: 'profilePicture firstName lastName favoriteColor',
          populate: { path: 'profilePicture', select: 'url' },
        },
        {
          path: 'workspace',
          select: 'workspaceCode workspaceName color',
        },
        {
          path: 'attachments',
          select:
            'filePath fileName mimeType size thumbnail url createdAt updatedAt createdBy updatedBy isPublic sha256 description',
        },
      ]),
    };

    return await HttpService.get<NoteDataByID>(`/v2/note/${noteId}`, {
      headers: new AxiosHeaders(),
      params,
    });
  }

  async createNote(note: CreateNote): Promise<ResponseCreateNote> {
    return await HttpService.post('/v2/note', note);
  }

  async deleteNote(noteId: string): Promise<void> {
    return await HttpService.delete(`/v2/note/${noteId}`);
  }
}

export default new NoteService();
