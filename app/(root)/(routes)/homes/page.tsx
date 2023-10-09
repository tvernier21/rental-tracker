
import supabaseClient from "@/app/lib/supabaseClient"
import { useSession } from "@clerk/nextjs";

import PropertyHeader from "../../../components/PropertyHeader"

export default function Homes() {

  return (
    <div>
      <PropertyHeader />
      {/* <PropertyList /> */}
    </div>
  )
}
