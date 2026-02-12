function Preloader({ isLoaded }) {
  return (
    <div
      id="preloader"
      style={{
        opacity: isLoaded ? 0 : 1,
        visibility: isLoaded ? 'hidden' : 'visible',
        transition: 'opacity 0.8s ease, visibility 0.8s ease',
      }}
    >
      <div id="loader"></div>
    </div>
  )
}

export default Preloader
