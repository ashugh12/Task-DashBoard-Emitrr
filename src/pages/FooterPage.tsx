import { useEffect, useRef, useState } from 'react'
import VideoSection from './VideoSection'

const FooterNote = () => {
    const ref = useRef<HTMLDivElement>(null)
    const [inView, setInView] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting)
            },
            { threshold: 0.2 }
        )

        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={ref}
            className={`mx-auto text-center text-gray-700 p-4 rounded-lg transition-all duration-1000 ease-out overflow-hidden
    ${inView ? 'mt-[10px] h-[374px] opacity-100 scale-y-10 ' : 'max-h-[48px] opacity-0 scale-y-50'}
  `}
            style={{ transformOrigin: 'top' }}
        >
            <div className="transition-opacity duration-1000 delay-300">
                Made By <span className="font-bold text-red-500">Ashutosh ❤️</span>
            </div>
            <div className='h-[100px] p-5'>
                <VideoSection />
            </div>
        </div>
    )
}

export default FooterNote
