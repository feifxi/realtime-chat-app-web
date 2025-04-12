
const NotFoundPage = () => {
  return (
    <section className="px-4 py-5">
      <div className="max-w-screen-lg h-[calc(100vh-8rem)] mx-auto rounded-lg bg-base-100 shadow-xl">
        <div className="h-full flex flex-col items-center p-10">
            <h1 className="text-5xl font-bold text-center p-4">404 NOT FOUND...</h1>
            <img 
              src={'https://media1.tenor.com/m/6dQAtXpftXYAAAAd/frieren-shrek.gif'} 
              alt="" 
              className="flex-1 rounded-xl"
            />
        </div>
      </div>
    </section>
  )
}

export default NotFoundPage
