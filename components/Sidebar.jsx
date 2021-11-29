import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon
} from "@heroicons/react/outline";
import {signOut, useSession} from 'next-auth/react';

export default function Sidebar() {
  const {data: session, status} = useSession();


  return (
    <div className="text-gray-500 p-5 text-sm ring-[1px] ring-gray-900 ring-opacity-90 overflow-y-auto h-screen scrollbar-hide">

      <div className="space-y-4">
        <button 
          onClick={() => signOut()}
          className="flex items-center space-x-2 hover:text-white transition-all">
          <p>Log out</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white transition-all">
          <HomeIcon className="h-5 w-5"/>
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white transition-all">
          <SearchIcon className="h-5 w-5"/>
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white transition-all">
          <LibraryIcon className="h-5 w-5"/>
          <p>Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900"/>

        <button className="flex items-center space-x-2 hover:text-white transition-all">
          <PlusCircleIcon className="h-5 w-5"/>
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white transition-all">
          <HeartIcon className="h-5 w-5"/>
          <p>Liked songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white transition-all">
          <RssIcon className="h-5 w-5"/>
          <p>Your episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900"/>

        {/* Playlists */}
        <p className="cursor-pointer hover:text-white transition-all">
          Playlist Name ...
        </p>
        <p className="cursor-pointer hover:text-white transition-all">
          Playlist Name ...
        </p>
        <p className="cursor-pointer hover:text-white transition-all">
          Playlist Name ...
        </p>
        <p className="cursor-pointer hover:text-white transition-all">
          Playlist Name ...
        </p>
        <p className="cursor-pointer hover:text-white transition-all">
          Playlist Name ...
        </p>
        <p className="cursor-pointer hover:text-white transition-all">
          Playlist Name ...
        </p>
        <p className="cursor-pointer hover:text-white transition-all">
          Playlist Name ...
        </p>
        <p className="cursor-pointer hover:text-white transition-all">
          Playlist Name ...
        </p>
        <p className="cursor-pointer hover:text-white transition-all">
          Playlist Name ...
        </p>
        <p className="cursor-pointer hover:text-white transition-all">
          Playlist Name ...
        </p>
        <p className="cursor-pointer hover:text-white transition-all">
          Playlist Name ...
        </p>
        <p className="cursor-pointer hover:text-white transition-all">
          Playlist Name ...
        </p>
        <p className="cursor-pointer hover:text-white transition-all">
          Playlist Name ...
        </p>
        <p className="cursor-pointer hover:text-white transition-all">
          Playlist Name ...
        </p>
        <p className="cursor-pointer hover:text-white transition-all">
          Playlist Name ...
        </p>
        <p className="cursor-pointer hover:text-white transition-all">
          Playlist Name ...
        </p>
        <p className="cursor-pointer hover:text-white transition-all">
          Playlist Name ...
        </p>
        <p className="cursor-pointer hover:text-white transition-all">
          Playlist Name ...
        </p>
        <p className="cursor-pointer hover:text-white transition-all">
          Playlist Name ...
        </p>
      </div>

    </div>
  )
}
