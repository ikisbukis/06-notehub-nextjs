
export interface Note{
    id: string
    title: string
    content: string
    tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping" 
    createdAt: string
    updatedAt: string
}

export interface CreateNoteType {
  title: string
  content: string
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping" ;
}