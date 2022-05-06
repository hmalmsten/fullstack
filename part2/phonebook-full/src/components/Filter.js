const Filter = ({ showSome, handleFilterChange }) => {
    return (
        <form>
        filter <input value={showSome} onChange={handleFilterChange}/>
        </form>
    )
  }
  
  export default Filter