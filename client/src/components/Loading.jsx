import React from 'react';
import { LiaSpinnerSolid } from "react-icons/lia";
function Loading(){
  return <div className="flex text-base-but justify-center items-center text-4xl p-4 m-2 grow " > Loading <LiaSpinnerSolid className="animate-spin"/> </div>
}
export default Loading;