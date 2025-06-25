import React, { useState, useEffect } from "react";
import { IoLocationSharp } from "react-icons/io5";
import Slider from "../Slider/Slider";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import halls from "../../assets/data/halls.json";
import photographer from "../../assets/data/photographer.json";
import caterers from "../../assets/data/caterers.json";
import Loading from "../Loading/Loading";
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ShowDetails = () => {
  const navigate = useNavigate();

  const [item, setItem] = useState({});
  const { tag, id } = useParams();
  // console.log(tag);
  // console.log(id);

  const [mark, setMark] = useState(false);
  const [date, setDate] = useState(new Date());
  console.log(date);

  useEffect(() => {
    if (tag === "halls") {
      setItem(halls.find((hall) => hall.id === Number(id)));
    } else if (tag === "photographer") {
      setItem(photographer.find((photo) => photo.id === Number(id)));
    } else if (tag === "caterers") {
      setItem(caterers.find((caterer) => caterer.id === Number(id)));
    }
  }, [tag, id]);
  // console.log(item);
  return !item || !item.imageSet ? (
    <Loading />
  ) : (
    <div className="mx-36 font-serif mb-4">
      <div className="flex justify-between">
        <div>
          <Slider slides={item.imageSet} />
        </div>
        <div className="m-4 md:w-full relative">
          <div className="flex justify-between">
            <h3 className="text-3xl font-bold">{item.title}</h3>
            <div className="text-lg font-semibold">
              {item.rating}
              <span className="text-yellow-500">★</span>
            </div>
          </div>

          <div className="text-2xl font-medium">{item.location}</div>
          <span className="text-2xl">₹{item.price}</span>

          <div className="p-4">
            <p>All free slots are given below</p>
            <Calendar minDate={new Date()} value={date} onChange={(s) => setDate(s)} selectRange={true}/>
          </div>
          <div className="flex justify-center space-x-6 absolute bottom-0 left-0 w-full">
            <button className="bg-base-but hover:bg-base-butHover transition w-full rounded-xl text-lg h-12 font-semibold" onClick={() => {navigate(`/confirmed?start=${date[0]}&end=${date[1]}`)}}>
              Book
            </button>
            <button className="" onClick={() => setMark((s) => !s)}>
              {mark ? <FaBookmark size={35} /> : <FaRegBookmark size={35} />}
            </button>
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <h4>
          <u className="">Description</u>
        </h4>
        <p className="">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt id
          aspernatur pariatur at nemo perspiciatis, officia laborum porro
          maiores fuga in beatae. Numquam officia dicta laborum, vero mollitia
          architecto hic tenetur sunt culpa molestiae nostrum quia quisquam,
          sequi porro? Temporibus facere nam nisi expedita sunt vel, doloremque
          error esse consequuntur ab deserunt iusto accusantium? Corrupti sequi
          illum molestias asperiores delectus, unde harum atque nesciunt
          adipisci suscipit consectetur tempore nihil at officia commodi illo et
          laboriosam iusto dolores tenetur quis praesentium quae nam voluptas.
          Itaque blanditiis consectetur laboriosam illo cum iure porro
          distinctio, exercitationem velit laudantium sequi provident eligendi
          cumque quam. Exercitationem, voluptatem. Asperiores, possimus nobis
          sunt earum rem amet ab ipsam illo suscipit aperiam quod facere sint
          atque quaerat culpa distinctio reiciendis voluptatem quidem quia
          exercitationem! Ipsa dolorum soluta nemo architecto. Enim, error
          reiciendis itaque delectus praesentium laboriosam quod ut
          exercitationem nobis illo fugit sunt, beatae officia perspiciatis
          atque, nemo aspernatur? Nemo ipsam ducimus laudantium quas atque
          minus, ipsum officiis repudiandae perspiciatis, alias commodi? Ipsum
          impedit quidem ad sunt autem vel aliquam voluptate nulla alias,
          voluptatibus explicabo. Incidunt, dignissimos. Maiores dolor possimus
          molestiae modi corrupti voluptates nobis aut nihil sequi mollitia? Vel
          accusantium quas perferendis doloribus veritatis eveniet voluptas
          minima voluptatem modi nesciunt minus repellat error incidunt eum, non
          facilis aut deleniti, ducimus illo iusto sapiente maxime! Recusandae
          quibusdam iusto autem, porro esse necessitatibus, natus voluptas amet
          doloribus, facilis facere. Perferendis dolor eum fuga, in dignissimos
          non dolorem nemo? Expedita totam porro magnam sapiente voluptate quia
          velit quaerat beatae corrupti eveniet consequuntur, laboriosam debitis
          itaque in facilis error? Repellendus nulla accusantium, in blanditiis,
          eos laborum exercitationem debitis officiis voluptatibus porro minima
          doloremque a quo, voluptate autem itaque harum magnam. Quam illum, aut
          nisi nesciunt magni aliquid sit aperiam odit recusandae, expedita
          minus cupiditate totam quo unde harum culpa nihil nobis consectetur
          quis corporis! Quos ea nulla similique reprehenderit, culpa quas
          dignissimos delectus! Obcaecati nobis placeat odio hic animi. Incidunt
          explicabo nemo sapiente. Dolor, repellendus ipsum. Fugit eaque vitae
          dolorum omnis quos quae expedita corrupti molestiae, fuga porro fugiat
          sunt distinctio sed mollitia, hic temporibus nam et iusto velit. Quae,
          laborum. Explicabo debitis dolores dolore aut illo nulla nesciunt sit,
          ea ad vero! Ea quo nesciunt soluta corporis delectus minus qui quod,
          enim explicabo cupiditate, laudantium natus reprehenderit ipsa fuga
          quis ullam veniam, atque quibusdam voluptatum voluptates. Nam est
          nostrum aspernatur modi! Cupiditate hic sapiente obcaecati
          perspiciatis tenetur distinctio amet facilis, repellat fugiat voluptas
          ab officia. Tenetur totam beatae dolores quas omnis unde
          exercitationem non illo! Quas soluta, perferendis ducimus obcaecati,
          ut necessitatibus blanditiis sapiente, iusto voluptates unde impedit
          nobis officiis minima cupiditate. Ab, maxime minus quos excepturi
          cumque aspernatur molestiae iusto! Odio magnam deleniti at expedita
          eligendi fugiat totam, sed minus, voluptas nobis id corporis. Nesciunt
          quo accusamus quia et deserunt itaque sit obcaecati atque sint ullam
          ex odio perspiciatis nobis animi, possimus repellat vel tenetur
          assumenda sed ratione? Quaerat sequi ad ducimus consequatur sint!
          Voluptatem provident cupiditate excepturi, eum in, debitis harum
          eveniet est animi, consequuntur inventore. Unde, deleniti?
        </p>
      </div>
    </div>
  );
};

export default ShowDetails;
