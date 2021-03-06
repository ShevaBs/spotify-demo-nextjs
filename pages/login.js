import {getProviders, signIn} from "next-auth/react";

export default function login({providers}) {



  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-black gap-4">
      <img className="w-52 " src="https://links.papareact.com/9xl" alt="logo"/>
      {
        Object.values(providers).map(provider => (
          <div key={provider.name}>
            <button 
              onClick={() => signIn(provider.id, {callbackUrl: "/"})}
              className="bg-[#18d860] text-white p-5 rounded-full font-bold">
              Login with {provider.name}
            </button>
          </div>
        ))
      }
    </div>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers
    }
  }
}