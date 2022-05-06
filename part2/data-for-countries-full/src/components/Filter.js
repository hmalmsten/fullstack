const Filter = ({ showSome, handleFilterChange }) => {
    return (
        <form>
        find countries <input value={showSome} onChange={handleFilterChange}/>
        </form>
    )
  }
  
  export default Filter