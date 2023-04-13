import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const {data: session} = useSession()

  return (
    <Layout>
      <div className="text-blue-900 flex justify-between">
        <div className="flex items-center gap-2">
          <div className="font-semibold">Hello, {session?.user?.name}</div>
        </div>

        <div className="flex gap-1 py-1 px-2 rounded-md items-center text-black bg-gray-300">
          <Image src={session?.user?.image} alt="user-image" width={30} height={30} className="rounded-full"/>
          <h1 className="font-semibold">{session?.user?.name}</h1>
        </div>
      </div>
    </Layout>
  )
}
