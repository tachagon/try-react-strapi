import './App.css'

import RestaurantsIndex from "./components/restaurants/index"

function App() {
  return (
    <>
      <h1 className="text-4xl font-bold underline mb-4">
        Restaurants
      </h1>

      <RestaurantsIndex />

      <div className="divider mt-4 mb-4">
        ==========================
      </div>
    </>
  )
}

export default App
