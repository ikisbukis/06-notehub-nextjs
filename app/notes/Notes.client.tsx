'use client'

import { NoteForm } from "../../components/NoteForm/NoteForm"
import css from "./Notes.module.css"
import { fetchNotes } from "../../lib/api"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { Pagination } from "../../components/Pagination/Pagination"
import SearchBox  from "../../components/SearchBox/SearchBox"
import { NoteList } from "../../components/NoteList/NoteList"
import { Modal } from "../../components/Modal/Modal"

const NoteClient = () => {
    const[searchValue, setSearch]=useState<string>("")
    const[page, setPage]= useState<number>(1)
    const[isForm, setForm]= useState<boolean>(false)
    const {data, isLoading, isError} = useQuery({
      queryKey: ["notes", page, searchValue ],
      queryFn: () => fetchNotes( {page, search: searchValue}),
      placeholderData: keepPreviousData,
      refetchOnMount: false,
      retry: false
    })

    const onChange = useDebouncedCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        setPage(1)
      },
      400
    );
    const notes = data?.notes ?? []
    console.log(data)

    const onClose = (value: boolean) => {
        setForm(value)
    }

  return (
    <div className={css.app}>
	    <header className={css.toolbar}>
		    <SearchBox value={searchValue} onChange={onChange} />
		    {(data?.totalPages ?? 0) > 1 && <Pagination totalPages={data?.totalPages ?? 0} currentPage={page} onPageChange={setPage}/>}
		    <button className={css.button} onClick={() => onClose(!isForm)}>Create note +</button>
      </header>
       {notes && <NoteList notes={notes} />}
       {isForm && 
        <Modal onClose={() => setForm(false)}>
          <NoteForm onClose={() => setForm(false)}/>
        </Modal>}
       {isLoading && <h3>Content is loading</h3>}
       {isError && <h3>..Ops</h3>}
    </div>
  )
}

export default NoteClient