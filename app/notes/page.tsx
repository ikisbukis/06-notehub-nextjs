import { fetchNotes } from "../../lib/api"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import NoteClient from "./Notes.client"

const Notes = async () => {

    const queryClient = new QueryClient();

    const page = 1
    const searchValue = ""

    await queryClient.prefetchQuery({
        queryKey:["notes", page, searchValue],
        queryFn: () => fetchNotes({page, search: searchValue})
    })

    return  <HydrationBoundary state={dehydrate(queryClient)}>
                <NoteClient />
            </HydrationBoundary>  
}

export default Notes