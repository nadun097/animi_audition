function Preloader({ isLoaded }) {
  return (
    <div
      id="preloader"
      style={{
        opacity: isLoaded ? 0 : 1,
        visibility: isLoaded ? 'hidden' : 'visible',
        /* speed doubled (was 0.8s) */
        transition: 'opacity 0.4s ease, visibility 0.4s ease',
      }}
    >
      <div id="loader"></div>
    </div>
  )
}

export default Preloader
