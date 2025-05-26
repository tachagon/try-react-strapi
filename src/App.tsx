import { RecoilRoot } from "recoil";
import './App.css'

import RestaurantsIndex from "./components/restaurants/index"
import RestaurantsForm from "./components/restaurants/form";

function App() {
  return (
    <RecoilRoot>
      <h1 className="text-4xl font-bold underline mb-4">
        Restaurants
      </h1>

      <RestaurantsIndex />

      <div className="divider mt-4 mb-4">
        ==========================
      </div>

      <RestaurantsForm />
    </RecoilRoot>
  )
}

export default App
