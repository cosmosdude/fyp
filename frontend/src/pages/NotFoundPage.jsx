import notFound1 from '../assets/Illustration/NotFound/NotFound.png'
import notFound2 from '../assets/Illustration/NotFound/NotFound2.png'
import notFound3 from '../assets/Illustration/NotFound/NotFound3.png'

export default function NotFoundPage() {
    let images = [notFound1, notFound2, notFound3]

    return (
        <div className="flex flex-col gap-4 h-screen items-center justify-center bg-background-0">
            <img
                className="w-[300px] h-[300px]"
                src={images[Math.floor(Math.random() * images.length)]}
            />
            <p className="font-poppins text-hs font-hs text-primary-500">Not Found!</p>
        </div>
    )
}