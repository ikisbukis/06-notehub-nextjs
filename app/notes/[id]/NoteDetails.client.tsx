'use client'

import { useQuery } from "@tanstack/react-query"
import css from "./NoteDetails.module.css"
import { fetchNoteById } from "@/lib/api"
import { useParams } from "next/navigation"


export const NoteDetailsClient = () => {

    const {id} = useParams<{id: string}>();

    const {data: note, isError, isLoading} = useQuery({
        queryKey: ['noteDetail', id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false
    })

    return (
		<>
		{isLoading && <p>Loading, please wait...</p>}
		{isError && <p>Something went wrong.</p>}
		<main className={css.main}>	
	<div className={css.container}>
		<div className={css.item}>
		  <div className={css.header}>
		    <h2>Note title</h2>
		  </div>
		  <p className={css.tag}>{note?.tag}</p>
		  <p className={css.content}>Note content</p>
		  <p className={css.date}>Created date</p>
		</div>
	</div>
</main>
		</>
        
    )
}