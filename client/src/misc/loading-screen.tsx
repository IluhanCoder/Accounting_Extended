const LoadingScreen = () => {
    return <div className="flex justify-center h-full w-full">
        <div className="flex justify-center flex-col gap-3">
            <div className="font-extrabold text-4xl animate-bounce flex justify-center space-between gap-4">
                <div>.</div>
                <div>.</div>
                <div>.</div>
            </div>
        </div>
    </div>
}

export default LoadingScreen;