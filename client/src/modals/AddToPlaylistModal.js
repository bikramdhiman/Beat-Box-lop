import { useState, useEffect } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";

export default function AddToPlaylistModal({ closeModal, addSongToPlaylist }) {
  // step1 : using 'useEffect' fetch all the playlists of user from backend
  // step2 : using 'useState' store all the user playlists in state
  // step3 : user playlists will be [] of playlist objects so fetch each of them from useState using map (loop) and show them in the addToPlaylistModal box
  // we did similar thing in Library to show all the user playlists
  const [myPlaylists, setMyPlaylists] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/playlist/get/me"); // fetch all user playlists obj from backend and store in response
      setMyPlaylists(response.data); // response.data will have [] of playlist objects
    };
    getData();
  }, []); // we get the respnse as array of playlist objects thats why we write [] here

  return (
    <div
      className="absolute flex items-center justify-center w-screen h-screen bg-black bg-opacity-70"
      onClick={closeModal}
    >
      <div
        className="w-1/3 p-8 rounded bg-app-black"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {" "}
        {/*since we applied the closeModal function on the parent div so the createplaylist modal keeps on closing when we click anywhere in the parent div, so to stop this we stopPropagation func on the only child of the parent this will prevent the createPlaylistModal form closing when we click on teh child(curr div)  */}
        <div className="p-3 font-bold text-white">Select Playlist</div>
        <div className="flex flex-col items-center justify-center space-y-2">
          {myPlaylists.map((item) => {
            return (
              <PlaylistListComponent
                addSongToPlaylist={addSongToPlaylist}
                info={item}
              />
            ); // from here we are sending this 'addSongToPlaylist' func to 'PlaylistListComponent' because we want that whenever user clicks on a particular 'playlistListComponent'(playlist from playlistModal) then only this func 'addSongToPlaylist' should be called and that current song is added to the user clicked playlist
          })}
        </div>
      </div>
    </div>
  );
}

// this is single playlist componet in the 'AddToPlaylistModal'
const PlaylistListComponent = ({ info, addSongToPlaylist }) => {
  return (
    <div
      className="flex items-center w-full p-2 space-x-3 cursor-pointer hover:bg-gray-400 hover:bg-opacity-20"
      onClick={() => {
        addSongToPlaylist(info._id);
      }} // fetch curr playlist id and send it to this func to add the curr song to this playlist on basis of playlist id
    >
      <div>
        <img
          src={info.thumbnail}
          alt={"playlist cover"}
          className="w-10 h-10 rounded"
        />
      </div>
      <div className="text-sm font-semibold text-white ">{info.name}</div>
    </div>
  );
};
