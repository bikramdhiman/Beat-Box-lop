import React from "react";
import IconText from "../components/shared/IconText";
import { Icon } from "@iconify/react";
import TextWithHover from "../components/shared/TextWithHover";
import { useNavigate } from "react-router-dom";

// each playlist view stored in array of JSON objs where each object has data of each individual playlist
const focusCardsData = [
  {
    title: "Peaceful Piano",
    description: "Relax and indulge with peacuful piano pieces",
    imgUrl:
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGlhbm98ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "Deep Focus",
    description: "Keep calm and focus with this music",
    imgUrl:
      "https://plus.unsplash.com/premium_photo-1661601849507-78ccb5bbead3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c3R1ZHklMjBmb2N1c3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    title: "Instrumental Study",
    description: "Focus with soft study music",
    imgUrl:
      "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aW5zdHJ1bWVudGFsJTIwc3R1ZHl8ZW58MHx8MHx8fDA%3D",
  },

  {
    title: "Focus Flow",
    description: "Up tempo instrumental beats",
    imgUrl:
      "https://images.unsplash.com/photo-1662330357136-3be4a00ab42d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Zm9jdXMlMjBmbG93fGVufDB8fDB8fHww",
  },
  {
    title: "Beats to think to",
    description: "focus with deep techno and tech house",
    imgUrl:
      "https://images.unsplash.com/photo-1515615200917-f9623be1d8b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJlYXRzJTIwc3R1ZHl8ZW58MHx8MHx8fDA%3D",
  },
];

const spotifyCardsPlaylist = [
  {
    title: "Todays Top Hits",
    description: "All top hits from 24hrs",
    imgUrl:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "Rap Cavier",
    description: "For all the rap lovers",
    imgUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bXVzaWN8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "All Out 2010s",
    description: "lets go back to the 10s time",
    imgUrl:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG11c2ljfGVufDB8fDB8fHww",
  },
  {
    title: "Rock Classics",
    description: "Rock with some rock music",
    imgUrl:
      "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9jayUyMG11c2ljfGVufDB8fDB8fHww",
  },
  {
    title: "Punk",
    description: "Some of the Punk hits of this year",
    imgUrl:
      "https://images.unsplash.com/photo-1575672913784-11a7cd4f25f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHVuayUyMHJvY2t8ZW58MHx8MHx8fDA%3D",
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex w-full h-full">
      {/* this will be the left pannel */}
      <div className="flex flex-col justify-between w-1/5 h-full bg-black pb-7">
        <div>
          <div className="flex justify-start p-5 space-x-4 cursor-pointer logoDiv">
            {/* <img src={spotify_logo} alt="spotify logo" width={125} /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
            >
              <path
                fill="white"
                d="M18.65.226A16 16 0 0 0 16 0C7.16 0 0 7.16 0 16c0 3.394 1.067 6.53 2.86 9.131c1.1-1.616 3.637-2.731 6.578-2.731c2.02 0 3.847.533 5.156 1.39zm8.502 4.315c2.763 6.11.339 9.374.339 9.374c-1.875-5.64-7.305-6.464-7.305-6.464s-3.572 19.248-3.572 19.49c0 2.085-2.214 3.847-5.22 4.38A16.01 16.01 0 0 0 16 32c8.84 0 16-7.16 16-16c0-4.493-1.859-8.55-4.848-11.459"
              />
            </svg>
            <div className="flex items-center justify-center text-xl font-semibold text-white">
              BeatBox
            </div>
          </div>
          <div className="py-5">
            <IconText
              iconName={"material-symbols:home"}
              displayText={"Home"}
              active
            />
            <IconText iconName={"uil:search"} displayText={"Search"} />
            <IconText
              iconName={"clarity:library-solid"}
              displayText={"Library"}
            />
          </div>

          <div className="pt-5">
            <IconText
              iconName={"material-symbols:add-box"}
              displayText={"Create Playlist"}
            />
            <IconText iconName={"mdi:heart"} displayText={"Liked Songs"} />
          </div>
        </div>

        {/* <div className='px-6 '>
                    <div className='flex items-center justify-center w-2/5 py-1 text-white border border-gray-400 rounded-full cursor-pointer hover:border-white'>
                        <Icon icon="humbleicons:globe" fontSize={18} />
                        <div className='ml-1 text-sm font-semibold'>English</div>
                    </div>
                </div> */}
      </div>

      {/* this will be the right pannel */}
      <div className="w-4/5 h-full bg-app-black">
        {/* in the right pannel this will be Navbar  */}
        <div className="flex items-center justify-end w-full bg-black navbar h-1/10 bg-opacity-40">
          <div className="flex items-center w-1/2 h-full">
            <div className="flex items-center justify-around w-3/5 h-full">
              {/* <TextWithHover displayText={"Premium"}/>
                            <TextWithHover displayText={"Support"}/>
                            <TextWithHover displayText={"Download"}/> */}
              {/* <div className='border border-gray-500 h-1/2'></div> */}
            </div>
            <div className="flex items-center justify-around w-2/5 h-full pr-4">
              <TextWithHover displayText={"Sign Up"} targetLink={"/signup"} />
              <div
                className="flex items-center justify-center px-5 py-4 font-semibold bg-white rounded cursor-pointer h-3/4 hover:bg-gray-200"
                onClick={(e) => {
                  navigate("/login");
                }}
              >
                Log in
              </div>
            </div>
          </div>
        </div>

        {/* this will be content below navbar */}
        <div className="p-8 pt-0 overflow-auto text-white content h-9/10">
          <PlaylistView titleText={"Focus"} cardsData={focusCardsData} />
          <PlaylistView
            titleText={"More Playlists"}
            cardsData={spotifyCardsPlaylist}
          />
          {/* <PlaylistView titleText={"Focus"} cardsData={focusCardsData}/> */}
          {/* <PlaylistView titleText={"Spotify Playlists"}/> 
                    <PlaylistView titleText={"Sounds of India"}/>  */}
        </div>
      </div>
    </div>
  );
}

const PlaylistView = ({ titleText, cardsData }) => {
  return (
    <div className="w-full mt-8 text-white">
      <div className="mb-5 text-2xl font-semibold text-left">{titleText}</div>
      <div className="flex justify-between w-full space-x-4">
        {/* cardsData will be an array of JSON objects where each object has data for each card */}
        {cardsData.map((item) => {
          return (
            <Card
              title={item.title}
              description={item.description}
              imgUrl={item.imgUrl}
            />
          );
        })}

        {/* OLD NON GENERIC APPROACH ↘️ */}
        {/* <Card title={"Peaceful Piano"} description={"Relax and indulge with peacuful piano pieces"} imgUrl={"https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGlhbm98ZW58MHx8MHx8fDA%3D"}/>
                <Card title={"Deep Focus"} description={"Keep calm and focus with this music"} imgUrl={"https://plus.unsplash.com/premium_photo-1661601849507-78ccb5bbead3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c3R1ZHklMjBmb2N1c3xlbnwwfHwwfHx8MA%3D%3D"}/>
                <Card title={"Instrumental Study"} description={"Focus with soft study music"} imgUrl={"https://images.unsplash.com/photo-1488998427799-e3362cec87c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aW5zdHJ1bWVudGFsJTIwc3R1ZHl8ZW58MHx8MHx8fDA%3D"}/>
                <Card title={"Focus Flow"} description={"Up tempo instrumental beats"} imgUrl={"https://images.unsplash.com/photo-1662330357136-3be4a00ab42d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Zm9jdXMlMjBmbG93fGVufDB8fDB8fHww"}/>
                <Card title={"Beats to think to"} description={"focus with deep techno and tech house"} imgUrl={"https://images.unsplash.com/photo-1515615200917-f9623be1d8b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJlYXRzJTIwc3R1ZHl8ZW58MHx8MHx8fDA%3D"}/> */}
      </div>
    </div>
  );
};

const Card = ({ title, description, imgUrl }) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-1/5 p-4 bg-black border border-gray-200 rounded-lg cursor-pointer bg-opacity-40 border-opacity-10"
      onClick={() => {
        navigate("/signup");
      }}
    >
      <div className="pb-4 bt-2">
        <img className="w-full rounded-md" src={imgUrl} />
      </div>
      <div className="py-3 font-semibold text-left ">{title}</div>
      <div className="text-sm text-left text-gray-500"> {description} </div>
    </div>
  );
};
