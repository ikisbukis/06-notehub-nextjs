import css from "./SearchBox.module.css"

interface SearchBoxProps{
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchBox = ({value, onChange}: SearchBoxProps) => {
    return (
         <input 
        className={css.input} 
        id="text"type="text"
        placeholder="Search notes"
        defaultValue={value}
        onChange={onChange} 
        />
    )
}

export default SearchBox