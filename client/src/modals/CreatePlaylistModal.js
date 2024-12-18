import { useState } from "react";
import TextInput from "../components/shared/TextInput";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";

export default function CreatePlaylistModal({ closeModal }) {
  // state to store playlist name and playlist thumbnail data from the input fields
  const [playlistName, setPlaylistName] = useState("");
  const [playlistThumbnail, setPlaylistThumbnail] = useState("");

  // function to call POST API /playlist/create to create playlist and we recieve response
  const createPlaylist = async () => {
    const response = await makeAuthenticatedPOSTRequest("/playlist/create", {
      name: playlistName,
      thumbnail: playlistThumbnail,
      songs: [],
    });
    console.log(response);

    if (response._id) closeModal(); // close the createPlaylistModal form when a playlist is created
  };

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
        <div className="p-3 font-bold text-white">Create Playlist</div>
        <div className="flex flex-col items-center justify-center space-y-5">
          <TextInput
            label={"Name"}
            placeholder={"Playlist Name"}
            labelClassName={"text-white"}
            value={playlistName}
            setValue={setPlaylistName}
          />
          <TextInput
            label={"Thumbnail"}
            placeholder={"Thumbnail Link"}
            labelClassName={"text-white"}
            value={playlistThumbnail}
            setValue={setPlaylistThumbnail}
          />
          <div
            className="flex items-center justify-center w-1/3 py-2 font-semibold bg-white rounded cursor-pointer hover:bg-opacity-80"
            onClick={createPlaylist}
          >
            Create
          </div>
        </div>
      </div>
    </div>
  );
}
