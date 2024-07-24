import Image from "next/image";
import Navbar from '../components/layouts/navbar/Navbar'
import Outer from '../../public/OuterRectangle.png'
import Inner from '../../public/InnerRectangle.png'

export default function Home({children}) {
  return (
    <div className="bg-background max-w-[1440px] m-auto min-h-screen">
      <Navbar/>
      <main className="flex-center gap-6 p-6 pt-0">
        <div className="w-[560px] m-auto flex-center">
          <Image src={Outer} className="relative" alt="mobileimage"/>
          <Image src={Inner} className="absolute" alt="mobileImage"/>
        </div>

        <div className="w-[808px]">
          {children}
        </div>
      </main>
    </div>
  );
}
