import React from "react";
import IconText from "../components/shared/IconText";
import { Icon } from "@iconify/react";
import TextWithHover from "../components/shared/TextWithHover";
import TextInput from "../components/shared/TextInput";
import CloudinaryUpload from "../components/shared/CloudinaryUpload";
import { useState } from "react";

import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";
import { useNavigate } from "react-router-dom";
import LoggedInContainer from "../containers/LoggedInContainer";

// new formatted and generalized code for 'UploadSong' using loggedInContainer
export default function UploadSong() {
  // states for the track 'name' and 'thumbnail  to store their datas
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [uploadedSongFileName, setUploadedSongFileName] = useState(""); // this will be used when user uploads a song this filename will appear that this particular file is uploaded
  // this 'setUploadedSongFileName' function when passed in a function or component it will be used to store data into 'uploadedSongFileName'
  const navigate = useNavigate(); // to navigate/redirect to pages

  const submitSong = async () => {
    const data = { name, thumbnail, track: playlistUrl }; // fetch data from useStates

    // only user whose token is saved in cookies (or authenticated users) can create a new song thats why we use this AuthPost function from frontend that calls the API at backend
    // this response contains the created song json obj send by backend
    const response = await makeAuthenticatedPOSTRequest("/song/create", data); // this func from frontend will call the API at backend which whill create a song at backend and send the created song JSON obj into this response

    if (response.err) {
      alert("Could'nt create song");
      return;
    }
    alert("Success");
    navigate("/home"); // ones a song is created successfully send him to /home page
  };

  return (
    <LoggedInContainer>
      <div className="mt-8 mb-5 text-2xl font-semibold text-left text-white">
        Upload Your Music
      </div>

      <div className="flex w-2/3 space-x-3">
        <div className="w-1/2">
          <TextInput
            label={"Name"}
            placeholder={"Name"}
            labelClassName={"text-white"}
            value={name}
            setValue={setName}
          />
        </div>
        <div className="w-1/2">
          <TextInput
            label={"Thumbnail"}
            placeholder={"Thumbnail"}
            labelClassName={"text-white"}
            value={thumbnail}
            setValue={setThumbnail}
          />
        </div>
      </div>

      <div className="py-5 text-left">
        {/* if user has uploaded a song then the uploaded songs name should be displayed, if not then 'select Song' button should be displayed */}
        {uploadedSongFileName ? (
          <div className="w-1/3 p-3 text-black bg-white rounded-full">
            {" "}
            {uploadedSongFileName.substring(0, 20)}....{" "}
          </div>
        ) : (
          <CloudinaryUpload
            setUrl={setPlaylistUrl}
            setName={
              setUploadedSongFileName
            } /* set Url will store the playlist url from the cloudinaryUpload page */
          />
        )}
      </div>
      <div
        className="w-40 p-3 font-semibold text-black bg-white rounded-full cursor-pointer hover:bg-gray-200"
        onClick={submitSong}
      >
        Sumbit Track
      </div>
    </LoggedInContainer>
  );
}

// //-------- old code (not generalized)
// export default function UploadSong(){

//     // const [songDuration, setSongDuration] = useState("");   // feature for later

//     // console.log(window);
//     // console.log(window.cloudinary);

//     // states for the track 'name' and 'thumbnail  to store their datas
//     const [name, setName] = useState("");
//     const [thumbnail, setThumbnail] = useState("");
//     const [playlistUrl, setPlaylistUrl] = useState("");
//     const [uploadedSongFileName, setUploadedSongFileName] = useState(""); // this will be used when user uploads a song this filename will appear that this particular file is uploaded
//     // this 'setUploadedSongFileName' function when passed in a function or component it will be used to store data into 'uploadedSongFileName'
//     const navigate = useNavigate(); // to navigate/redirect to pages

//     const submitSong = async() => {
//         const data = {name, thumbnail, track:playlistUrl}; // fetch data from useStates

//         // only user whose token is saved in cookies (or authenticated users) can create a new song thats why we use this AuthPost function from frontend that calls the API at backend
//         // this response contains the created song json obj send by backend
//         const response = await makeAuthenticatedPOSTRequest("/song/create", data); // this func from frontend will call the API at backend which whill create a song at backend and send the created song JSON obj into this response

//         if(response.err){
//             alert("Could'nt create song");
//             return;
//         }
//         alert('Success');
//         navigate("/home"); // ones a song is created successfully send him to /home page

//     }

//     return(
//         <div className='flex w-full h-full'>

//             {/* this will be the left pannel */}
//             <div className='flex flex-col justify-between w-1/5 h-full bg-black pb-7'>
//                 <div>
//                     <div className='p-5 logoDiv' >
//                         <img src={spotify_logo} alt="spotify logo" width={125} />
//                     </div>
//                     <div className='py-5'>
//                         <IconText iconName={"material-symbols:home"} displayText={"Home"} active />
//                         <IconText iconName={"uil:search"} displayText={"Search"} />
//                         <IconText iconName={"clarity:library-solid"} displayText={"Library"} />
//                         <IconText iconName={"bxs:music"} displayText={"My Music"} />

//                     </div>

//                     <div className='pt-5'>
//                         <IconText iconName={"material-symbols:add-box"} displayText={"Create Playlist"} />
//                         <IconText iconName={"mdi:heart"} displayText={"Liked Songs"} />
//                     </div>

//                 </div>

//                 <div className='px-6 '>
//                     <div className='flex items-center justify-center w-2/5 py-1 text-white border border-gray-400 rounded-full cursor-pointer hover:border-white'>
//                         <Icon icon="humbleicons:globe" fontSize={18} />

//                         <div className='ml-1 text-sm font-semibold'>English</div>
//                     </div>
//                 </div>

//             </div>

//             {/* this will be the right pannel */}
//             <div className='w-4/5 h-full bg-app-black'>

//                 {/* in the right pannel this will be Navbar  */}
//                 <div className='flex items-center justify-end w-full bg-black navbar h-1/10 bg-opacity-40'>

//                     <div className='flex items-center w-1/2 h-full'>
//                         <div className='flex items-center justify-around w-3/5 h-full '>
//                             <TextWithHover displayText={"Premium"}/>
//                             <TextWithHover displayText={"Support"}/>
//                             <TextWithHover displayText={"Download"}/>
//                             <div className='border border-gray-500 h-1/2'></div>
//                         </div>
//                         <div className='flex items-center justify-around w-2/5 h-full '>
//                             <TextWithHover
//                                 displayText={"Upload Song"}
//                             />
//                             <div className='flex items-center justify-center w-10 h-10 px-4 py-4 font-semibold bg-white rounded-full cursor-pointer hover:bg-gray-200'>
//                                 YY
//                             </div>
//                         </div>

//                     </div>
//                 </div>

//                 {/* this will be content below navbar */}
//                 <div className='p-8 pt-0 overflow-auto text-white content h-9/10'>

//                     <div className='mt-8 mb-5 text-2xl font-semibold text-left text-white'>
//                         Upload Your Music
//                     </div>

//                     <div className='flex w-2/3 space-x-3'>
//                         <div className='w-1/2'>

//                             <TextInput
//                                 label={"Name"}
//                                 placeholder={"Name"}
//                                 labelClassName={"text-white"}
//                                 value={name}
//                                 setValue={setName}
//                             />

//                         </div>
//                         <div className='w-1/2'>
//                             <TextInput
//                                 label={"Thumbnail"}
//                                 placeholder={"Thumbnail"}
//                                 labelClassName={"text-white"}
//                                 value={thumbnail}
//                                 setValue={setThumbnail}
//                             />
//                         </div>
//                     </div>

//                     <div className='py-5 text-left' >

//                         {/* if user has uploaded a song then the uploaded songs name should be displayed, if not then 'select Song' button should be displayed */}
//                         {
//                             uploadedSongFileName?(
//                                 <div className='w-1/3 p-3 text-black bg-white rounded-full'> {uploadedSongFileName.substring(0,20)}.... </div>
//                             ):(
//                                 <CloudinaryUpload

//                                     setUrl={setPlaylistUrl}
//                                     setName={setUploadedSongFileName}  /* set Url will store the playlist url from the cloudinaryUpload page */
//                                 />
//                             )
//                         }

//                     </div>
//                     <div className='w-40 p-3 font-semibold text-black bg-white rounded-full cursor-pointer hover:bg-gray-200' onClick={submitSong}>Sumbit Track</div>

//                 </div>

//             </div>

//         </div>
//     )
// }
