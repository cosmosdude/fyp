import notFound1 from '../assets/Illustration/NotFound/NotFound.png'
import notFound2 from '../assets/Illustration/NotFound/NotFound2.png'
import notFound3 from '../assets/Illustration/NotFound/NotFound3.png'

export default function NotFoundPage() {
    let images = [notFound1, notFound2, notFound3]

    return (
        <img
            className=""
            src={images[Math.floor(Math.random() * images.length)]}
        />
    )
}