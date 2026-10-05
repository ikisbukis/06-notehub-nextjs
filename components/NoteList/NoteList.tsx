'use client'

import type { Note } from "../../types/note"
import css from "./NoteList.module.css"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { deleteNote } from "../../lib/api"
import Link from "next/link"

interface NoteListProps{
  notes: Note[]
}
export const NoteList = ({notes}: NoteListProps) => {

    const queryClient =  useQueryClient();
    
        const mutationDelete = useMutation({
          mutationFn: deleteNote,
          onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["notes"]})

          }
        })

    return (
        <ul className={css.list}>
          {notes.map(value => (
              <li key={value.id} className={css.listItem}>
              <h2 className={css.title}>{value.title}</h2>
                <p className={css.content}>{value.content}</p>
                <div className={css.footer}>
                  <span className={css.tag}>{value.tag}</span>
                  <Link href={`/notes/${value.id}`} className={css.link}>View details</Link>
                  <button onClick={() => mutationDelete.mutate(value.id)} className={css.button}>Delete</button>
                </div>
              </li>    
              )
            )
          }
     </ul>

    )
}