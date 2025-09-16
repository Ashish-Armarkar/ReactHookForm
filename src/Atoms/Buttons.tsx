const Buttons  = ({myOnClick}:{myOnClick: ()=> void}) => {
  return (
      <>
      <button type='button' onClick={myOnClick}>Create</button>
      </>
  )
}

export default Buttons 