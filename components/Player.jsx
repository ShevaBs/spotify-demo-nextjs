import {ReplyIcon, SwitchHorizontalIcon } from "@heroicons/react/outline";
import {RewindIcon, PauseIcon, PlayIcon, FastForwardIcon, VolumeUpIcon, VolumeOffIcon} from "@heroicons/react/solid"
import { debounce } from "lodash";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify"

export default function Player() {
  const spotifyApi = useSpotify();
  const {data: session, status} = useSession();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if(!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then(data => {
        console.log("Now playing: ", data.body?.item)
        setCurrentTrackId(data.body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then(data => {
          console.log("Now playing: ", data.body);
          setIsPlaying(data.body?.is_playing);
        })
      })
    }
  }

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then(data => {
      if(data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true)
      }
    })
  }

  const debounceAdjustVolume = useCallback( 
    debounce(volume => {
      spotifyApi.setVolume(volume).catch(err => {})
    }, 500), 
    []
  )

  useEffect(() => {
    if(spotifyApi.getAccessToken() && !currentTrackId) {
      //fetch song info
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session]);

  useEffect(() => {
    if(volume > 0 && volume < 100) {
      debounceAdjustVolume(volume)
    }
  }, [volume]);


  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-sm md:text-base px-2 md:px-8">
      {/* left */}
      <div className="flex items-center space-x-4">
        <img 
          className="h-10 w-10"
          src={songInfo?.album.images?.[0]?.url} alt="song album img" 
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>

      {/* center */}
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button"/>
        <RewindIcon className="button"/>
        {
          isPlaying ? (
            <PauseIcon 
              onClick={handlePlayPause}
              className="button w-10 h-10"/>
          ) : (
            <PlayIcon 
              onClick={handlePlayPause}
              className="button w-10 h-10"/>
          )
        }
        <FastForwardIcon className="button"/>
        <ReplyIcon className="button"/>
      </div>

      {/* right */}
      <div className="flex items-center space-x-3 md:space-x-4 justify-end">
        <div 
          onClick={() => volume === 0 ? setVolume(50) : setVolume(0)}>
          {
            volume === 0 ? (
              <VolumeOffIcon className="button"/>
            ) : (
              <VolumeUpIcon className="button"/>
            )
          }
        </div>
        <input 
          className="w-16 md:w-28"
          type="range" 
          value={volume}
          min={0} 
          max={100}
          onChange={e => setVolume(Number(e.target.value))}
        />
      </div>
    </div>
  )
}
