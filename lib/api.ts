import axios from 'axios';
import type { Note, CreateNoteType} from '../types/note';

interface FetchNotesParams{
    page: number
    search?: string
}

interface FetchNotesParamsHttpResponse{
    notes: Note[]
    totalPages: number;
}

const key = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN
const options = {
    headers: {
        Accept: "application/json",  
        Authorization: `Bearer ${key}`
    }
}

axios.defaults.url = 'https://notehub-public.goit.study/api'

export const fetchNotes = async ({page, search}: FetchNotesParams) : Promise<FetchNotesParamsHttpResponse> => {
    const response = await axios.get<FetchNotesParamsHttpResponse>(`/notes`, {...options, params: {page: page, ...(search ? {search} : {}) }}  )
    return response.data
}

export const createNote = async ( {title, content, tag} : CreateNoteType) : Promise<Note> => {
    const response = await axios.post<Note>(`notes`, {title, content, tag}, options)
    return response.data
}

export const deleteNote = async (id: string) : Promise<Note> => {
    const response = await axios.delete<Note>(`https://notehub-public.goit.study/api/notes/${id}`, options)
    return response.data
}

export const fetchNoteById = async (id: string) : Promise<Note> => {
    const response = await axios.get<Note>(`/notes/${id}`)
    return response.data
}