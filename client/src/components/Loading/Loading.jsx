import { LuLoader } from "react-icons/lu";

function Loading(){
  return <div className="flex items-center justify-center h-screen">
          <LuLoader className="animate-spin" size={45} />
        </div>
}
export default Loading;