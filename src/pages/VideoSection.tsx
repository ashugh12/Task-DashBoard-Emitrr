export default function VideoSection() {
    return (
        <div className="flex flex-wrap justify-center items-center gap-6 max-w-6xl mx-auto p-4">
            {/* Video 1 */}
            <div className="relative w-full md:w-[45%] aspect-video rounded-xl overflow-hidden shadow-lg">
                <iframe
                    src="https://player.cloudinary.com/embed/?cloud_name=dvpbfztc1&public_id=BoardView_nxawrz&profile=cld-default"
                    width="640"
                    height="360"
                    style={{ height: 'auto', width: '100%', aspectRatio: '640/360' }}
                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                    allowFullScreen
                ></iframe>
                {/* Optional overlay */}
                <div className="absolute bottom-2 right-2 bg-white/70 backdrop-blur-md px-3 py-1 rounded-full shadow">
                    <span className="text-sm font-semibold text-gray-800">Board View</span>
                </div>
            </div>

            {/* Video 2 */}
            <div className="relative w-full md:w-[45%] aspect-video rounded-xl overflow-hidden shadow-lg">
                <video
                    src="src/public/BoardDetail.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-contain"
                />
                {/* Optional overlay */}
                <div className="absolute bottom-2 right-2 bg-white/70 backdrop-blur-md px-3 py-1 rounded-full shadow">
                    <span className="text-sm font-semibold text-gray-800">Board Detail</span>
                </div>
            </div>
        </div>

    );
}
