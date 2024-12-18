import LoggedInContainer from "../containers/LoggedInContainer";
import { useState, useEffect } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import { useNavigate } from "react-router-dom";

export default function Library() {
  //step1: now using useEffect we fetch data from backend API and on any changes i.e whever there is any change in playlists data the useEffect will run and will set new playlists data to 'myPlaylists' state
  //step2: ones we have the data we will use useState to store that data into current page locally then display it using map
  const [myPlaylists, setMyPlaylists] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/playlist/get/me");
      setMyPlaylists(response.data); // response.data will have [] of playlist objects
    };
    getData();
  }, []); // we get the respnse as array of playlist objects thats why we write [] here

  return (
    <LoggedInContainer curActiveScreen={"library"}>
      <div className="py-8 text-xl font-bold text-left">My Library</div>

      <div className="grid grid-cols-5 gap-5">
        {
          // loop the [] of playlist objects, where item is each individual playlist obj
          myPlaylists.map((item) => {
            //
            return (
              <Card
                playlistId={item._id}
                key={JSON.stringify(item)}
                title={item.name}
                description={""}
                imgUrl={item.thumbnail}
              />
            );
          })
        }
      </div>
    </LoggedInContainer>
  );
}

const Card = ({ title, description, imgUrl, playlistId }) => {
  const navigate = useNavigate(); // this hook is used to redirect user to other routes

  return (
    <div
      className="w-full p-4 bg-black rounded-lg cursor-pointer bg-opacity-40 hover:bg-opacity-60"
      onClick={() => {
        navigate("/playlist/" + playlistId);
      }} // when user clicks on a playlist Card in the Library, redirect it to that playlists singlePlaylistView
    >
      <div className="w-full pb-4 bt-2">
        <img className="w-full h-full rounded-md" src={imgUrl} />
      </div>
      <div className="py-3 font-semibold text-left ">{title}</div>
      <div className="text-sm text-left text-gray-500"> {description} </div>
    </div>
  );
};
